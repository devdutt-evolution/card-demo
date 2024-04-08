"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FallbackLayout from "@/components/FallbackLayout";

export default function Error() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/posts");
    }, 1500);
  });
  return (
    <FallbackLayout>
      <h1 className='text-5xl'>Some Error Occurred</h1>
    </FallbackLayout>
  );
}
