import { PostComment } from "@/types/type.d";

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

export const fetchUsers = async (query: string, token?: any) => {
  const res = await fetch(`${URL}/users?_q=${query}`, {
    headers: {
      authorization: `Bearer ${token?.token}`,
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
  const matchTag = new RegExp(/\s@\[([^\]]+)\]\(\w+\)/, "g");

  const matched = comment.match(matchTag);

  if (matched && matched?.length > 0) {
    matched.map((str) => {
      const lastNameIndex = str.indexOf("]");
      const username = str.substring(3, lastNameIndex);
      const id = str.substring(lastNameIndex + 2, str.length - 1);
      comment = comment.replace(
        str,
        ` <span class="text-green cursor-pointer hover:underline"><a href='/user/${id}' target="_blank">@${username}</a></span>`
      );
    });
  }

  return comment;
};

export const fetchPostDetail = async (postId: string, token: string) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const post = await data.json();

    return post.post as PostComment;
  } catch (err) {}
};

// dump

// mentioned styling
// const mentionStyling = {
//   backgroundColor: "#00875F",
//   padding: "1px",
//   borderRadius: "0.3rem",
// };

// text area and suggestion styling
// const mentionAreaStyling = {
//   "&multiLine": {
//     control: {
//       minHeight: 90,
//     },
//     highlighter: {
//       padding: "0.5rem",
//     },
//     input: {
//       padding: 9,
//     },
//   },
//   suggestions: {
//     list: {
//       backgroundColor: "#202024",
//     },
//     item: {
//       padding: "5px 15px",
//       "&focused": {
//         backgroundColor: "#00875F",
//       },
//     },
//   },
// };
