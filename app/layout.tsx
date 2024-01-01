import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import ReactQueryProvider from "@/components/ReactQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page",
  description: "Page created",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full h-[100px] mb-2 bg-card flex justify-center items-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              className="mx-auto"
              alt={"logo"}
              width="200"
              height={"20"}
            />
          </Link>
        </header> 
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
