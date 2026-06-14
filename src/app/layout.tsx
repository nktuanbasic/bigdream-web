import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import GlobalAuthNav from "@/components/GlobalAuthNav";
import Footer from "@/components/Footer";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BigDream Web",
  description: "Hệ sinh thái AI Tối cao dành cho Kiến trúc & Nghệ thuật",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${bodoni.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="bg-obsidian-deep min-h-screen flex flex-col font-body-md text-body-md">
        <GlobalAuthNav />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
