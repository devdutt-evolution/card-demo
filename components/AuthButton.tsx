"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthButton() {
  const { data } = useSession({ required: false });
  const path = usePathname();

  return (
    <div className='flex justify-center items-center w-max px-3 py-2 text-[#fff] bg-green rounded-lg hover:bg-hgreen max-h-[50px]'>
      {path.startsWith("/register") && !data?.user?.token ? (
        <p className='cursor-pointer' onClick={(e) => signIn()}>
          Login
        </p>
      ) : path.startsWith("/login") && !data?.user?.token ? (
        <Link href='/register'>Register</Link>
      ) : (
        <p className='cursor-pointer' onClick={(e) => signOut()}>
          Logout
        </p>
      )}
    </div>
  );
}
