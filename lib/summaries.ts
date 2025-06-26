import { getDbConnection } from "./db";

export async function getSummaries(clerkUserId: string) {
  const sql = await getDbConnection();

  const [user] =
    await sql`SELECT id FROM users WHERE clerk_user_id = ${clerkUserId}`;
  if (!user) {
    return [];
  }
  const dbUserId = user.id;
  const summaries =
    await sql`SELECT * FROM pdf_summaries where user_id = ${dbUserId} ORDER BY created_at DESC`;
  return summaries;
}
