import type { Metadata } from "next";
import Posts from "./_components/Posts";
import { getServerSession } from "next-auth";
import { options } from "@/utils/options";
import { getInitialPosts } from "./pageUtils";
import { SORTFIELD, SORTORDER } from "@/utils/consts";

export const metadata: Metadata = {
  title: "Posts",
  description: "Post lists",
};

export const revalidate = 0;

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const {
    q = "",
    order = SORTORDER.asc,
    field = SORTFIELD.title,
    userId,
  } = searchParams;

  const authData = await getServerSession(options);

  const posts = await getInitialPosts(
    q,
    order,
    field,
    authData?.user?.token,
    userId
  );

  return <Posts posts={posts} />;
}
