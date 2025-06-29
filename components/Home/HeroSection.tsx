import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/motionWrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const buttonVariants = {
  scale: 1.05,
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 10,
  },
};

const HeroSection = () => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col z-0 items-center justify-center py-20 sm:py-20 lg:pb-64 transition-all animate-in lg:px-12 max-w-7xl"
    >
      <div className="flex">
        <MotionDiv
          variants={itemVariants}
          className="relative p-[1.15px] overflow-hidden rounded-full bg-linear-to-r from-emerald-200 via-emerald-500 to-emerald-800 animate-gradient-x group"
        >
          <Badge className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200 cursor-pointer hover:bg-emerald-50">
            <div className="w-6 h-6 mr-2 flex-shrink-0">
              <Sparkles className="w-full h-full text-emerald-600 animate-pulse" />
            </div>
            <p className="text-base text-emerald-600">Powered by AI</p>
          </Badge>
        </MotionDiv>
      </div>
      <MotionH1 variants={itemVariants} className="font-bold py-6 text-center">
        Transform PDF's into{" "}
        <span className="relative inline-block">
          <MotionSpan
            whileHover={buttonVariants}
            className="relative z-10 px-2"
          >
            concise
          </MotionSpan>
          <span
            className="absolute inset-0 bg-emerald-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{" "}
        summaries
      </MotionH1>
      <MotionH2
        variants={itemVariants}
        className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600"
      >
        Get a clear summary reel of the document in seconds
      </MotionH2>
      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
        <Button
          variant={"link"}
          className="bg-emerald-500 text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-emerald-500 hover:from-emerald-500 hover:to-slate-900 font-bold hover:no-underline transition-colors duration-200 shadow-lg"
        >
          <Link href="/#pricing" className="flex gap-2 items-center">
            <span>Try Summora</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
};

export default HeroSection;
