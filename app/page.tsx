import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center h-screen items-center text-3xl">
      <Link href="/posts">Take me to Posts</Link>
    </div>
  );
}
