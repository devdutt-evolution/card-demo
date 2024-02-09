"use client";

import FallbackLayout from "@/components/FallbackLayout";

export default function Error() {
  return (
    <FallbackLayout>
      <h1 className="text-5xl">Some Error Occured</h1>
    </FallbackLayout>
  );
}
