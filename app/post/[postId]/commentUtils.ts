export const transformText = (comment: string): string => {
  const matchTag = new RegExp(/@\[([^\]]+)\]\(\w+\)/, "g");

  const matched = comment.match(matchTag);

  if (Array.isArray(matched)) {
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

export async function sendPutRequest(
  postId: string,
  postData: {
    title: string;
    body: string;
  },
  token?: string
) {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}`,
      {
        method: "put",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    if (res.status == 200) return ["success", null];
    return [null, "Failed"];
  } catch (err) {
    return [null, err as string];
  }
}
