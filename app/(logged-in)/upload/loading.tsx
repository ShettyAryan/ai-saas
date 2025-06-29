import BgGradient from "@/components/common/BgGradient";
import React from "react";

const loading = () => {
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-emerald-50/40 to-white">
      <BgGradient />

      <div className=" h-screen w-screen flex items-center justify-center">
        <div className="flex flex-row gap-2">
          <div className="w-6 h-6 max-sm:w-4 max-sm:h-4 rounded-full bg-emerald-500 animate-bounce"></div>
          <div className="w-6 h-6 max-sm:w-4 max-sm:h-4 rounded-full bg-emerald-500 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-6 h-6 max-sm:w-4 max-sm:h-4 rounded-full bg-emerald-500 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    </div>
  );
};

export default loading;
