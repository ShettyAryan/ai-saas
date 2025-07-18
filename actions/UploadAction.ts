"use server";

import { getDbConnection } from "@/lib/db";
import { generatePdfSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/formatUtils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generatePdfText({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  if (!fileUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log({ pdfText });

    if (!pdfText) {
      return {
        success: false,
        message: "Failed to fetch and extract text",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "PDF text fetched successfully",
      data: {
        title: formattedFileName,
        pdfText,
      },
    };
  } catch (error) {
    return { success: false, message: "File upload failed", data: null };
  }
}

export async function generatePdfSummary({
  pdfText,
  fileName,
}: {
  pdfText: string;
  fileName: string;
}) {
  try {
    let summary;

    try {
      summary = await generatePdfSummaryFromGemini(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
    }
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: fileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to generate summary",
      data: null,
    };
  }
}

async function savedPdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId?: string;
  fileUrl: string;
  title: string;
  summary: string;
  fileName: string;
}) {
  try {
    const sql = await getDbConnection();

    await sql`
     INSERT INTO users (clerk_user_id)
     VALUES (${userId})
     ON CONFLICT (clerk_user_id) DO NOTHING
    `;

    const [user] = await sql`
    SELECT id FROM users WHERE clerk_user_id = ${userId}
    `;
    const dbUserId = user.id;

    const [savedSummary] = await sql`INSERT INTO pdf_summaries(
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
    ) VALUES (
     ${dbUserId},
     ${fileUrl},
     ${summary},
     ${title},
     ${fileName}
     ) RETURNING id, summary_text`;
    return savedSummary;
  } catch (error) {
    console.error("Error saving pdf summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId?: string;
  fileUrl: string;
  title: string;
  summary: string;
  fileName: string;
}) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savedPdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save summary, please try again",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving pdf summary",
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
