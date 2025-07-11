import { FileText } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmptySummary = () => {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4 ">
        <FileText className="w-16 h-16 text-gray-400" />

        <h2 className="text-xl font-semibold text-gray-600">
          No summaries yet
        </h2>
        <p className="text-gray-500 max-w-md">
          Upload your first PDF pookie 😉 to get started with AI powered
          summaries
        </p>
        <Button
          variant={"link"}
          className="mt-4 text-white bg-linear-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 hover:no-underline "
        >
          <Link href="/upload">Create your first summary</Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptySummary;
