import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

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
        <header className="flex w-full h-[100px] bg-card justify-center items-center sticky top-0">
          <Link href="/">
            <div className="flex gap-2">
              <Image src="/logo.svg" alt="logo" width="65" height="61" />
              <div className="text-4xl flex justify-center items-center">
                <p>Quotes</p>
              </div>
            </div>
          </Link>
        </header>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
