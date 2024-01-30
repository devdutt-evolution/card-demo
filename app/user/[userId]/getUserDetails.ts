import type { User } from "@/types/type.d";

type CustomPost = {
  _id: string;
  title: string;
  body: string;
  likes: number;
  comments: number;
  userLike: { reactionType: string } | undefined;
};

export async function getUserDetails(id: string, token?: string) {
  let data = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  let user: { user: User & { posts: CustomPost[] } } = await data.json();

  return user?.user;
}
