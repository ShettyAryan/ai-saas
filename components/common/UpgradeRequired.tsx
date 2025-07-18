import React from "react";
import BgGradient from "./BgGradient";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UpgradeRequired = () => {
  return (
    <div className="relative min-h-[50vh]">
      <BgGradient />
      <div className="container px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-emerald-500">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Premium Feature
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Subscription Required
          </h1>
          <p className="text-lg leading-8 text-gray-600 border-2 border-emerald-200 bg-white/50 backdrop-blur-xs rounded-lg p-6 border-dashed max-w-xl">
            You need to access the Basic or Pro Plan to access this feature 🥺
          </p>
          <Button
            asChild
            className="bg-linear-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white"
          >
            <Link href={"/#pricing"} className="flex gap-2 items-center">
              View Pricing Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeRequired;
