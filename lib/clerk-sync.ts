import { currentUser } from "@clerk/nextjs/server";
import { getDbConnection } from "./db";

export async function syncClerkUserToDb() {
  const user = await currentUser();

  const clerkUserId = user?.id;
  const email = user?.emailAddresses[0]?.emailAddress;
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  if (!clerkUserId || !email) return;

  const sql = await getDbConnection();

  await sql`
    UPDATE users
    SET clerk_user_id = ${clerkUserId}, full_name = ${fullName}
    WHERE email = ${email}
      AND (clerk_user_id IS NULL OR clerk_user_id != ${clerkUserId})
  `;
}
