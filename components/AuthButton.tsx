"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthButton() {
  const { data } = useSession({ required: false });
  const path = usePathname();
  const tokenWrapper = data?.user as any;

  return (
    <div className="flex justify-center items-center w-min px-3 py-2 text-[#fff] bg-green rounded-lg absolute top-50% translate-x-[-50%] right-0 hover:bg-hgreen">
      {path.startsWith("/register") && !tokenWrapper?.token ? (
        <p className="cursor-pointer" onClick={(e) => signIn()}>
          Login
        </p>
      ) : path.startsWith("/login") && !tokenWrapper?.token ? (
        <Link href="/register">Register</Link>
      ) : (
        <p className="cursor-pointer" onClick={(e) => signOut()}>
          Logout
        </p>
      )}
    </div>
  );
}
