import { PostComment, User } from "@/types/type.d";
import { METHODS } from "@/utils/consts";
import { FetchResponse } from "@/utils/requests";

const BASE = process.env.NEXT_PUBLIC_URL_BACKEND;

export async function fetchPostDetail(postId: string, token?: string) {
  const res = await fetch(`${BASE}/posts/${postId}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  const data = new FetchResponse<{ post: PostComment }>(res)
    .checkAuth()
    .checkNotFound()
    .checkInternal();

  return data.getData();
}

export async function createComment(
  postId: string,
  comment: string,
  token?: string
) {
  const res = await fetch(`${BASE}/posts/${postId}/comment`, {
    method: METHODS.post,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });

  const data = new FetchResponse<{ message: string } | void>(res)
    .checkAuth()
    .checkNotFound()
    .checkInternal();

  if (data.isError()) {
    const message = await data.getData();
    if (typeof message === "object" && "message" in message)
      throw new Error(message["message"]);
    else throw new Error("Failed to create");
  }
  return;
}

export async function fetchUsers(q: string, token?: string) {
  const res = await fetch(`${BASE}/users?_q=${q}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = new FetchResponse<{ users: User[] }>(res)
    .checkAuth()
    .checkNotFound()
    .checkInternal();

  return data.getData();
}
