import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center text-3xl">
      <div className="h-2/5">
        <Link href="/posts">Take me to Posts</Link>
      </div>
    </div>
  );
}
