"use server";

import { revalidatePath } from "next/cache";

export async function reactOnComment(
  url: string,
  like: boolean,
  token: string | undefined,
  postId: string
) {
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ reaction: like ? "unlike" : "like" }),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Something went wrong !");

  revalidatePath("/post/" + postId);
}
