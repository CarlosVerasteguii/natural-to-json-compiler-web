import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CompilerProvider } from "@/context/CompilerContext";
import Navbar from "@/components/Layout/Navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Natural to JSON | Professional Compiler Studio",
  description: "A high-performance natural language to JSON compiler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-slate-200 min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <CompilerProvider>
          <Navbar />
          <main className="flex-grow flex flex-col relative z-0">
            {children}
          </main>
        </CompilerProvider>
      </body>
    </html>
  );
}
