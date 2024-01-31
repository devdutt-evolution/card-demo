"use client";

import FallbackLayout from "@/components/FallbackLayout";

export default function Error() {
  return (
    <FallbackLayout>
      <h2 className="text-5xl">Some Error Occured</h2>
    </FallbackLayout>
  );
}
