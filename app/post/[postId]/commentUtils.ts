import { PostComment } from "@/types/type.d";

const URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const createComment = async (
  postId: string,
  token: string | undefined,
  comment: string
) => {
  const res = await fetch(`${URL}/posts/${postId}/comment`, {
    method: "post",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
  if (res.status === 201) return [true, null];
  let data = await res.json();
  return [null, data?.message || "Failed to create Comment"];
};

export const fetchUsers = async (query: string, token?: string) => {
  const res = await fetch(`${URL}/users?_q=${query}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (res.status == 200) {
    return [data.users, null];
  } else {
    return [null, data.message || "Failed to fetch users"];
  }
};

export const transformText = (comment: string): string => {
  const matchTag = new RegExp(/@\[([^\]]+)\]\(\w+\)/, "g");

  const matched = comment.match(matchTag);

  if (matched && matched?.length > 0) {
    matched.map((str) => {
      const lastNameIndex = str.indexOf("]");
      const username = str.substring(2, lastNameIndex);
      const id = str.substring(lastNameIndex + 2, str.length - 1);
      comment = comment.replace(
        str,
        ` <span class="text-green cursor-pointer hover:underline"><a href='/user/${id}' target="_blank">@${username}</a></span>`
      );
    });
  }

  return comment;
};

export const fetchPostDetail = async (postId: string, token?: string) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const post = await data.json();

    return post.post as PostComment;
  } catch (err) {}
};
