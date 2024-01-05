import InfinitePosts from "@/components/posts/InfintePosts";
import type { Posts } from "../../types/type.d";

const fetchInitialPosts = async () => {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_limit=10&_page=1&_sort=title&_order=asc&_expand=user`
  );
  if (!res.ok) throw new Error("failed to fetch");
  let data: { posts: Posts } = await res.json();

  return data.posts;
};

export default async function Posts() {
  const data: Posts = await fetchInitialPosts();
  if (data?.length == 0)
    return (
      <main className="flex flex-col gap-y-1 w-4/5 text-white mx-auto mt-2 h-max border-2 border-white px-1 py-1">
        No Posts
      </main>
    );
  // else
  return (
    <main className="flex w-full">
      <InfinitePosts posts={data} />
    </main>
  );
}
