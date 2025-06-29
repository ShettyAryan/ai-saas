import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { hasActivePlan } from "@/lib/user";
import UpgradeRequired from "@/components/common/UpgradeRequired";
import LoggedInClientLayout from "./_components/LoggedInClientLayout";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const hasActiveSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  if (hasActiveSubscription) {
    return <UpgradeRequired />;
  }

  return <LoggedInClientLayout>{children}</LoggedInClientLayout>;
}
