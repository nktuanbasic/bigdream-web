import type { Metadata } from "next";
import { Montserrat, Hanken_Grotesk, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import GlobalAuthNav from "@/components/GlobalAuthNav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "vietnamese"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
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
      lang="vi"
      className={`dark ${montserrat.variable} ${hanken.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="bg-obsidian-deep min-h-screen flex flex-col font-body-md text-body-md">
        <LanguageProvider>
          <GlobalAuthNav />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
