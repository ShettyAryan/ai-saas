import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Summuro - AI Powered PDF Summarization",
  description:
    "Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology",

  openGraph: {
    title: "Summuro - AI Powered PDF Summarization",
    description:
      "Transform lengthy PDFs into clear, accurate summaries in seconds ",
    url: "https://summuro-ai.vercel.app",
    siteName: "Summuro AI",
    images: [
      {
        url: "/public/opengraphImageSaas.png", // <-- Preview image
        width: 1200,
        height: 630,
        alt: "Website preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Summuro AI",
    description:
      "Transform lengthy PDFs into clear, accurate summaries in seconds",
    images: ["/public/opengraphImageSaas.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                description: "text-emerald-800",
                error: "bg-rose-100 text-red-800",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
