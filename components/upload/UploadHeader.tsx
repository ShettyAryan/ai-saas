import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[1.15px] overflow-hidden rounded-full bg-linear-to-r from-emerald-200 via-emerald-500 to-emerald-800 animate-gradient-x group">
        <Badge className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200 cursor-pointer hover:bg-emerald-50">
          <div className="w-6 h-6 mr-2 flex-shrink-0">
            <Sparkles className="w-full h-full text-emerald-600 animate-pulse" />
          </div>
          <span className="text-base text-emerald-600">
            AI Powered Content Creation
          </span>
        </Badge>
      </div>
      <div className="capitalize text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Start uploading{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2"> your PDF's</span>
          <span
            className="absolute inset-0 bg-emerald-200/50  rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
      </div>
      <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
        <p>Upload your pdf and let our AI do the magic!✨</p>
      </div>
    </div>
  );
};

export default UploadHeader;
