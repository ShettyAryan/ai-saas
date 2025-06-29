"use client";
import React, { useRef, useState } from "react";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/UploadAction";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a pdf"
    ),
});

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("upload successful!");
    },
    onUploadError: (err) => {
      console.error("Error occurred while uploading", err);
      toast("Error occured while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: (fileName: string) => {
      console.log("upload has begun for", fileName);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //validating the file

      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast.error("❌ Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setIsLoading(false);
        return;
      }

      toast("Uploading PDF...", {
        description: "We are uploading your PDF!",
      });

      const resp = await startUpload([file]);

      if (!resp) {
        toast.error("Something went wrong 🥲", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      toast("Processing PDF", {
        description: "Hang tight! Our AI is reading through your document",
      });

      const result = await generatePdfSummary(resp);

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        toast("Saving PDF", {
          description: "Hang tight! We are saving your summary!",
        });

        formRef.current?.reset();
        if (data.summary) {
          storeResult = await storePdfSummaryAction({
            fileUrl: resp[0].serverData.file.ufsUrl,
            summary: data.summary,
            title: data.title,
            fileName: file.name,
          });

          toast("Summary saved", {
            description: "Your Summary has been summarised and saved!",
          });

          formRef.current?.reset();
          router.push(`/summaries/${storeResult.data.id}`);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error occured", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
};

export default UploadForm;
