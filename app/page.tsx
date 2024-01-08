"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (token) redirect("/posts");
    else redirect("/login");
  }, []);
  return (
    <div className="flex h-[calc(100vh-120px)] justify-center items-center text-3xl">
      {/* <div className="h-2/5"> */}
      <Link href="/posts">Take me to Posts</Link>
      {/* </div> */}
    </div>
  );
}
