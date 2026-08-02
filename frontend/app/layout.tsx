import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BAHO Financial Ltd. | Non-Deposit Financial Institution",
  description: "Empowering growth with tailored financial solutions, SME financing, asset management, and corporate loan products.",
  keywords: ["BAHO Financial", "NDFI", "Financial Services", "SME Loans", "Asset Financing", "Rwanda Finance"],
  authors: [{ name: "BAHO Financial Team" }],
  icons: {
    icon: "/images/BAHO FINANCIAL LTD.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-baho-bg text-slate-900">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
