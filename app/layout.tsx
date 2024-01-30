import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import NextProvider from "./_components/NextProvider";
import Notifications from "./_components/Notifications";
import { getServerSession } from "next-auth";
import { options } from "@/utils/options";
import Avatar from "./_components/Avatar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Main layout",
  description: "create one description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = await getServerSession(options);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProvider>
          <header className="flex w-full h-[100px] bg-card justify-center items-center sticky top-0 z-[1]">
            <Link className="flex gap-2" href="/">
              <Image src="/logo.svg" alt="logo" width="65" height="61" />
              <div className="text-4xl flex justify-center items-center">
                <p>કથાnak</p>
              </div>
            </Link>
            <div className="absolute top-50% mr-4 right-0 w-max flex gap-4">
              {authData?.user && <Notifications />}
              <AuthButton />
              {authData?.user && (
                <Avatar
                  username={authData?.user?.name}
                  profile={authData?.user?.picture}
                />
              )}
            </div>
          </header>
          {children}
          <div id="modal-root"></div>
        </NextProvider>
      </body>
    </html>
  );
}
