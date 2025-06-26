"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummary({ summaryId }: { summaryId: string }) {
  try {
    const user = await currentUser();
    const clerkUserId = user?.id;
    if (!clerkUserId) {
      throw new Error("User not found");
    }
    const sql = await getDbConnection();

    const [dbUser] =
      await sql`SELECT id FROM users WHERE clerk_user_id = ${clerkUserId}`;
    if (!dbUser) {
      throw new Error("Database user not found");
    }

    const dbUserId = dbUser.id;
    const result =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${dbUserId} RETURNING id`;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
      };
    }
  } catch (error) {
    console.log("Error deleting summary", error);
    return {
      success: false,
    };
  }
}
