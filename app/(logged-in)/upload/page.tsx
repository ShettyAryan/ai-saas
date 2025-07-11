import BgGradient from "@/components/common/BgGradient";
import { MotionDiv } from "@/components/common/motionWrapper";
import UploadForm from "@/components/upload/UploadForm";

import UploadHeader from "@/components/upload/UploadHeader";
import { hasReachedUploadLimit } from "@/lib/user";
import { containerVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

export const maxDuration = 60;

const page = async () => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }
  const userId = user.id;
  const { hasReachedLimit } = await hasReachedUploadLimit(userId);

  if (hasReachedLimit) {
    redirect("/dashboard");
  }
  return (
    <section className="min-h-screen">
      <BgGradient />
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
};

export default page;
