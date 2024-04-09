import type { Post } from "@/types/type.d";

const url = (sortWith: string, isAsc: string, q?: string, userId?: string) => {
  let uri = `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_q=${q}&_limit=10&_page=1&_sort=${sortWith}&_order=${isAsc}`;

  if (userId) uri = `${uri}&_userId=${userId}`;
  return uri;
};

export async function getInitialPosts(
  q: string,
  order: string,
  field: string,
  token?: string,
  userId?: string
) {
  const res = await fetch(url(field, order, q, userId), {
    headers: { authorization: `Bearer ${token}` },
  });

  if (res.status !== 200) throw new Error("Failed to fetch posts");

  const data: { posts: Post[] } = await res.json();
  return data.posts;
}

export async function sendPostRequest(
  postData: {
    title: string;
    body: string;
    tobePublished: boolean;
    publishAt: number;
  },
  token?: string
) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/posts`, {
      method: "post",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (res.status == 201) return ["success", null];
    return [null, "Failed"];
  } catch (err) {
    return [null, err as string];
  }
}

export async function reportPost(
  postId: string,
  reason: string,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}/report`,
      {
        method: "POST",
        body: JSON.stringify({ reason }),
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) return ["success", null];
    return [null, "Failed"];
  } catch (err) {
    return [null, err as string];
  }
}
