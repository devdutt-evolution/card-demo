"use client";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function CheckAuth({ children }: { children: ReactNode }) {
  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (!token) redirect("/login");
  }, []);
  return <>{children}</>;
}
