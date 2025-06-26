import Stripe from "stripe";
import { getDbConnection } from "./db";
import { currentUser } from "@clerk/nextjs/server";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  console.log("Subscription Deleted", subscriptionId);
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDbConnection();
    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
    console.log("Subscription cancelled successfully");
  } catch (err) {
    console.error("Error handling subscription deleted", err);
    throw err;
  }
}

export async function handleSessionCheckoutCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  console.log("Checkout session completed", session);
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;
  const sql = await getDbConnection();
  if ("email" in customer && priceId) {
    const { email, name } = customer;
    await createOrUpdateUser({
      sql,
      email: email as string,
      fullName: name as string,
      customerId,
      priceId: priceId as string,
      status: "active",
    });

    await createPayment({
      sql,
      session,
      priceId: priceId as string,
      userEmail: email as string,
    });
  }
}

async function createOrUpdateUser({
  sql,
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  sql: any;
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    const userNow = await currentUser();
    const clerkUserId = userNow?.id;
    if (user.length === 0) {
      await sql`INSERT INTO users (clerk_user_id, email, full_name, customer_id, price_id, status) 
      VALUES (
      ${clerkUserId},
      ${email}, 
      ${fullName}, 
      ${customerId}, 
      ${priceId}, 
      ${status}
      )`;
    }
  } catch (err) {
    console.error("Error creating or updating user", err);
  }
}

async function createPayment({
  sql,
  session,
  priceId,
  userEmail,
}: {
  sql: any;
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const { amount_total, id, customer_email, status } = session;
    await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) 
    VALUES (
    ${amount_total}, 
    ${status}, 
    ${id}, 
    ${priceId}, 
    ${userEmail}
    )`;
  } catch (err) {
    console.error("Error creating payment", err);
  }
}
