"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post, Posts } from "../../types/post.d";
export default function Posts() {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Posts | []>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let data = await fetch("https://jsonplaceholder.typicode.com/posts");
        let posts: Posts = await data.json();

        setLoading(false);
        setData(posts);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    fetchPosts();
  }, []);

  if (isError) return <div>Error Occured</div>;

  if (isLoading)
    return (
      <main className="flex min-h-screen justify-center items-center font-bold text-white">
        Loading
      </main>
    );

  return (
    <main className="flex w-full h-screen">
      <div className="flex flex-col gap-y-1 w-4/5 text-white mx-auto mt-2 h-full border-2 border-white overflow-y-scroll px-1 py-1">
        {data.map((post) => {
          return (
            <p
              key={post.id}
              className="text-ellipsis cursor-pointer hover:text-black hover:bg-white p-2"
            >
              <Link href={`/post/${post.id}`}>
                {post.id}. {post.title}
              </Link>
            </p>
          );
        })}
      </div>
    </main>
  );
}
