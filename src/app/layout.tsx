import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI SkillFit | Multilingual Video Assessment",
  description: "AI-powered, mobile-first video assessment platform for workforce fitment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
