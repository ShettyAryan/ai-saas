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

export async function getUserUploadCount(userId: string) {
  const sql = await getDbConnection();
  try {
    const [user] = await sql`
    SELECT id FROM users WHERE clerk_user_id = ${userId}
  `;

    if (!user) return 0;

    const [result] =
      await sql`SELECT COUNT (*) as count FROM pdf_summaries WHERE user_id = ${user.id}`;
    return result?.count || 0;
  } catch (error) {
    console.error("Error fetching user upload count", error);
    return 0;
  }
}
