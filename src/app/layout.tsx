import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider  from "@/lib/providers";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export const metadata: Metadata = {
  title: "Drum Application",
  description: "Drumbeat your workshops",
};

const interFont = Inter({ weight: "400", style: "normal", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(interFont.className, "antialiased min-h-screen")} >
        <QueryProvider>
          <Toaster/>
          {children}
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryProvider>
      </body>
    </html>
  );
}
