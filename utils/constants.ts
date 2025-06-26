type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  paymentLink: string;
  priceId: string;
  items: string[];
};

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    paymentLink: "https://buy.stripe.com/test_aFa8wR1Ub3Nf65jg80djO00",
    priceId: "price_1ReDdLRYTbpUzccEpeDUroaL",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email Support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    paymentLink: "https://buy.stripe.com/test_aFa28t0Q7cjLfFT9JCdjO01",
    priceId: "price_1ReDdLRYTbpUzccERNntvBVE",
    items: [
      "Unlimited PDF summaries",
      "Priority Processing",
      "24/7 priority support",
      "Markdown Export",
    ],
  },
];
