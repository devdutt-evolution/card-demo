import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import SessionProvider from "./provider";

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
        <SessionProvider>
          <header className="flex w-full h-[100px] bg-card justify-center items-center sticky top-0 z-[3]">
            <Link className="flex gap-2" href="/">
              <Image src="/logo.svg" alt="logo" width="65" height="61" />
              <div className="text-4xl flex justify-center items-center">
                <p>Quotes</p>
              </div>
            </Link>
            <AuthButton />
          </header>
          {children}
          <div id="modal-root"></div>
        </SessionProvider>
      </body>
    </html>
  );
}
