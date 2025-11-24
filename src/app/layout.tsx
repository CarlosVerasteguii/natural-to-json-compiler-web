import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompilerProvider } from "@/context/CompilerContext";
import Navbar from "@/components/Layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Natural to JSON Compiler",
  description: "Compilers 2 Final Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-200 min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <CompilerProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </CompilerProvider>
      </body>
    </html>
  );
}
