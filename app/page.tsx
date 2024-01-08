import Link from "next/link";
import CheckAuth from "@/components/CheckAuth";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-120px)] justify-center items-center text-3xl">
      <CheckAuth>
        <Link href="/posts">Take me to Posts</Link>
      </CheckAuth>
    </div>
  );
}
