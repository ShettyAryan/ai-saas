import BgGradient from "@/components/common/BgGradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motionWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { itemVariants } from "@/utils/constants";
import React from "react";

const Header = () => {
  return (
    <div className="flex gap-4 mb-8 justify-between">
      <div className="flex flex-col gap-2">
        <MotionH1
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"
        >
          <Skeleton className="h-10 w-48 " />
        </MotionH1>
        <MotionDiv
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-gray-600"
        >
          <Skeleton className="h-6 w-96" />
        </MotionDiv>
      </div>
      <MotionDiv
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="self-start"
      >
        <Skeleton className="h-10 w-32" />
      </MotionDiv>
    </div>
  );
};

const SummaryCardSkeleton = () => {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="rounded-lg border bg-emerald-100 text-card-foreground shadow-sm"
    >
      <Skeleton className="h-48 w-full rounded-lg" />
    </MotionDiv>
  );
};

const loading = () => {
  return (
    <div className="min-h-screen relative">
      <BgGradient />
      <section className="container px-10 py-24 mx-auto flex flex-col gap-3 ">
        <Header />
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {Array.from({ length: 3 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default loading;
