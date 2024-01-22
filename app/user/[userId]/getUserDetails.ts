import { User } from "@/types/type.d";

export async function getUserDetails(id: string, token: string) {
  let data = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  let user: { user: User } = await data.json();

  return user?.user;
}
