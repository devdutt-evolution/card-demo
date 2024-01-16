import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
  let session = await getServerSession(options);

  if (!session) redirect("/login");

  return (
    <div className="flex h-[calc(100vh-120px)] justify-center items-center text-3xl">
      <Link href="/posts">Take me to Posts</Link>
    </div>
  );
}
