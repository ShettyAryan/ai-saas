import BgGradient from "@/components/common/BgGradient";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen">
      <BgGradient />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-liner-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDF's into concise, actionable insights
              </p>
            </div>

            <Button
              variant={"link"}
              className="bg-linear-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 hover:scale-105 transition-all duration-300 group hover:no-underline"
            >
              <Link href="/upload" className="flex text-white items-center">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800">
              <p className="text-sm">
                You have reached the limit of 5 uploads on the Basic Plan{" "}
                <Link
                  href="/#pricing"
                  className="text-emerald-800 font-medium underline underline-offset-4 inline-flex items-center"
                >
                  Click here to upgrade to PRO{" "}
                  <ArrowRight className="w-4 h-4 inline-block" />
                </Link>{" "}
                for unlimited uploads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
