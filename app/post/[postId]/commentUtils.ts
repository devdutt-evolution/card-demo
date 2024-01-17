const URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const createComment = async (
  postId: string,
  token: any,
  comment: string
) => {
  const res = await fetch(`${URL}/posts/${postId}/comment`, {
    method: "post",
    headers: {
      authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
  if (res.status === 201) return [true, null];
  let data = await res.json();
  return [null, data?.message || "Failed to create Comment"];
};

export const fetchUsers = async (query: string, token: any) => {
  if (query) {
    const res = await fetch(`${URL}/users?_q=${query}`, {
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    });

    const data = await res.json();

    if (res.status == 200) {
      return [data.users, null];
    } else {
      return [null, data.message || "Failed to fetch users"];
    }
  }
};
