import Link from "next/link";
import type { ReactNode } from "react";

export default function UserDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-4/5 sm:w-3/5 min-h-[50vh] rounded-lg mx-auto p-5 mt-2 bg-card max-w-[650px]">
      <Link
        href="/posts"
        className="w-max block bg-green hover:bg-opacity-20 px-6 py-2 rounded-lg mb-4"
      >
        &lt;-
      </Link>
      {children}
    </div>
  );
}
