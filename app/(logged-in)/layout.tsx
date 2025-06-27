"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/sync-user").catch(console.error);
    }
  }, [isSignedIn]);

  return <>{children}</>;
}
