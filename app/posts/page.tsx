import InfinitePosts from "@/components/InfintePosts";
import type { Posts } from "../../types/type.d";

const fetchInitialPosts = async () => {
  let res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1&_sort=title&_order=asc");
  if(!res.ok) throw new Error("failed to fetch");
  let data: Posts = await res.json();
  return data;
}

export default async function Posts() {
  const data: Posts = await fetchInitialPosts();

  if (data.length == 0)
    return (
      <div className="flex flex-col gap-y-1 w-4/5 text-white mx-auto mt-2 h-max border-2 border-white px-1 py-1">
        No Posts
      </div>
    );
  // else
  return (
    <main className="flex w-full">
      <InfinitePosts posts={data} />
    </main>
  );
}
