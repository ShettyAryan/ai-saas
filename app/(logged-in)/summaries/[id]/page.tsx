import BgGradient from "@/components/common/BgGradient";
import SourceInfo from "@/components/summaries/SourceInfo";
import { getSummaryById } from "@/components/summaries/Summary";
import SummaryHeader from "@/components/summaries/SummaryHeader";
import SummaryViewer from "@/components/summaries/SummaryViewer";
import { FileText } from "lucide-react";

import { notFound } from "next/navigation";
import React from "react";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }
  const {
    title,
    summary_text,
    file_name,
    created_at,
    word_count,
    originalFileUrl,
  } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-emerald-50/40 to-white">
      <BgGradient />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader
              title={title}
              createdAt={created_at}
              readingTime={readingTime}
            />
          </div>
          {file_name && (
            <SourceInfo
              file_name={file_name}
              title={title}
              summaryText={summary_text}
              createdAt={created_at}
              originalFileUrl={originalFileUrl}
            />
          )}

          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-emerald-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
              <div className=" z-0 absolute inset-0 bg-linear-to-br from-emerald-50/50 via-blue-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
                {summary.word_count?.toLocaleString()} words
              </div>
              <div className="z-10 relative">
                <div className="mt-8 sm:mt-6 flex justify-center">
                  <SummaryViewer summary={summary.summary_text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
