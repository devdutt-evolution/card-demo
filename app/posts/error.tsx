"use client";

import FallbackLayout from "@/components/FallbackLayout";

export default function PostError() {
  return (
    <FallbackLayout>
      <h1 className="font-bold text-red text-center">Error Loading Posts</h1>
    </FallbackLayout>
  );
}
