import { Metadata } from "next";
import Posts from "./_components/Posts";
import { getServerSession } from "next-auth";
import { options } from "@/utils/options";
import { getInitialPosts } from "./pageUtils";

export const metadata: Metadata = {
  title: "Posts",
  description: "Post lists",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { q = "", order = "asc", field = "title" } = searchParams;

  const authData = await getServerSession(options);
  const tokener: any = authData?.user;

  const posts = await getInitialPosts(q, order, field, tokener?.token);
  
  return <Posts posts={posts} />;
}
