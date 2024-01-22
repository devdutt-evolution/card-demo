import Link from "next/link";
import { ReactNode } from "react";

export default function PostDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-4/5 sm:w-3/5 min-h-[50vh] min-w-80 rounded-lg mx-auto p-5 mt-2 bg-card">
      {children}
      <Link
        href="/posts"
        className="w-max bg-green hover:bg-hgreen px-4 py-2 rounded-lg mt-2"
      >
        &nbsp;Back&nbsp;
      </Link>
    </div>
  );
}
