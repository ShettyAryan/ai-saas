import { syncClerkUserToDb } from "@/lib/clerk-sync";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await syncClerkUserToDb();

  return NextResponse.json({ status: "Synced" });
}
