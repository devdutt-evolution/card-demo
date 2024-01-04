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
        <header className="w-full h-[100px] mb-2 bg-card flex justify-center items-center sticky top-0">
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
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
