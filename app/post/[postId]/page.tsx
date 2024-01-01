"use client";
import { Post } from "@/types/post.d";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Post({ params }: { params: { postId: string } }) {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Post>({});

  useEffect(() => {
    const fetchPostDetail = async (postId: string) => {
      try {
        let data = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        let post: Post = await data.json();
        setLoading(false);
        setData(post);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    fetchPostDetail(params.postId);
  }, [params.postId]);

  if (isError) return <div>Error Occured</div>;

  if (isLoading)
    return (
      <main className="flex min-h-screen justify-center items-center font-bold text-white">
        Loading
      </main>
    );

  return (
    <main className="flex flex-col w-full h-screen">
      <div className="flex flex-col gap-y-2 w-4/5 text-white mx-auto mt-2 border-2 border-white px-10 py-10 h-min">
        <h2 className="text-2xl mb-2">{data.title}</h2>
        <p>{data.body}</p>
      </div>
      <button className="flex w-4/5 text-white mx-auto mt-4">
        <Link href="/posts" className="border-2 border-white">
          &nbsp;Back&nbsp;
        </Link>
      </button>
    </main>
  );
}
