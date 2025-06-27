import { plans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";

export async function getUserPlan(email: string) {
  const sql = await getDbConnection();

  const query =
    await sql`SELECT price_id FROM users where email=${email} AND status = 'active'`;
  return query?.[0]?.price_id || null;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);

  const priceId = await getUserPlan(userId);
  const isPro = plans.find((plan) => plan.priceId === priceId)?.id === "pro";
  const uploadLimit: number = isPro ? 1000 : 5;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}
