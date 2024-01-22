"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FallbackLayout from "./_component/FallbackLayout";

export default function Error() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/posts");
    }, 1500);
  });
  return (
    <FallbackLayout>
      <h2 className="text-5xl">Some Error Occured</h2>
    </FallbackLayout>
  );
}
