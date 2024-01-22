import { Posts } from "@/types/type.d";

const PAGE_SIZE = 10;
const url = (sortWith: string, isAsc: string, q?: string) =>
  `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_q=${q}&_limit=${PAGE_SIZE}&_page=1&_sort=${sortWith}&_order=${isAsc}&_expand=user`;

export async function getInitialPosts(
  q: string,
  order: string,
  field: string,
  token: any
) {
  const res = await fetch(url(field, order, q), {
    headers: { authorization: `Bearer ${token}` },
    next: {
      revalidate: 0,
    },
  });

  if (res.status !== 200) throw new Error("Failed to fetch posts");

  const data: { posts: Posts } = await res.json();
  return data.posts;
}

export async function fetchNextPosts(
  pageNumber: number,
  sortWith: string,
  isAsc: string,
  token: any,
  search: string = ""
) {
  if (token) {
    let url;
    if (!search)
      url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_limit=${PAGE_SIZE}&_page=${pageNumber}&_sort=${sortWith}&_order=${isAsc}&_expand=user`;
    else
      url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_q=${search}&_limit=${PAGE_SIZE}&_expand=user`;

    const res = await fetch(url, {
      headers: { authorization: `Bearer ${token}` },
      next: {
        revalidate: 0,
      },
    });

    if (res.status != 200) throw new Error("failed to fetch");

    const data: { posts: Posts } = await res.json();
    return data.posts;
  }
}

export async function sendPostRequest(
  postData: {
    title: string;
    body: string;
    tobePublished: boolean;
    publishAt: number;
  },
  token: any
) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/posts`, {
      method: "post",
      headers: {
        authorization: `Bearer ${token.token}`,
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
