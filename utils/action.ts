"use server";

import type { Posts } from "@/types/type.d";
import { options } from "@/utils/options";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
const PAGE_SIZE = 10;

export async function likeAction(
  postId: string,
  reaction: string,
  varient: string,
  commentId?: string
) {
  const url =
    varient == "post"
      ? `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}/react`
      : `${process.env.NEXT_PUBLIC_URL_BACKEND}/comments/${commentId}`;

  const session = await getServerSession(options);
  console.log(
    "reaction " +
      reaction +
      " " +
      varient +
      " Id " +
      (commentId || postId) +
      " " +
      commentId
  );
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ reaction }),
    headers: {
      authorization: `Bearer ${session?.user?.token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Something went wrong !");

  if (varient === "post") revalidatePath("/posts");
  else revalidatePath("/post/" + postId);
}

export async function getMorePosts(
  page: number,
  sortWith: string,
  isAsc: string,
  search?: string
) {
  const session = await getServerSession(options);

  let url;

  if (!search)
    url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_limit=${PAGE_SIZE}&_page=${page}&_sort=${sortWith}&_order=${isAsc}&_expand=user`;
  else
    url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_q=${search}&_limit=${PAGE_SIZE}&_expand=user`;

  const res = await fetch(url, {
    headers: { authorization: `Bearer ${session?.user?.token}` },
  });
  if (res.status != 200) throw new Error("failed to fetch");

  const data: { posts: Posts } = await res.json();
  return data.posts;
}
