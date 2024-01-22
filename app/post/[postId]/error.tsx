"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/posts");
    }, 1500);
  });
  return (
    <div className="w-full flex h-[50vh] justify-center items-center">
      <h2 className="text-5xl">Some Error Occured</h2>
    </div>
  );
}
