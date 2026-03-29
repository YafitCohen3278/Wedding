import type { Metadata } from "next";
import { Amatic_SC, Assistant } from "next/font/google";
import "./globals.css";

const amaticSC = Amatic_SC({
  variable: "--font-handwriting",
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
});

const assistant = Assistant({
  variable: "--font-sans",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "המסע שלנו לחופה 💕",
  description: "סופרים לאחור את הימים עד לרגע המיוחד שלנו",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${amaticSC.variable} ${assistant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-handwriting text-[#1A1A1A] bg-[#f5e6e8]">{children}</body>
    </html>
  );
}
