import React from "react";
import { Card } from "@/components/ui/card";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { MotionDiv } from "../common/motionWrapper";
import { itemVariants } from "@/utils/constants";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mt-1 " />
      <div className="flex-1 min-w-0 ">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium capitalize rounded-full",
        status === "completed"
          ? "bg-blue-100 text-blue-800"
          : "bg-red-100 text-red-800"
      )}
    >
      {status}
    </span>
  );
};

const SummaryCard = ({ summary }: { summary: any }) => {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <Card className="h-full relative">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />
            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary.summary_text}
            </p>

            <div className="flex justify-between items-center mt-2 sm:mt-4">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </MotionDiv>
  );
};

export default SummaryCard;
