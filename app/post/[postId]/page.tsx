"use client";
import { PostComment } from "@/types/type.d";
import Link from "next/link";
import Comment from "./Comment";
import CheckAuth from "@/components/CheckAuth";
import { useEffect, useState } from "react";

export const revalidate = 0;

export default function Post({ params }: { params: { postId: string } }) {
  const [data, setData] = useState<PostComment>();

  useEffect(() => {
    let token = window.localStorage.getItem("token") as string;
    fetchPostDetail(params.postId, token).then((data) => setData(data));
  }, [params.postId]);

  const fetchPostDetail = async (postId: string, token: string) => {
    if (token) {
      let data = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      let post: { post: PostComment } = await data.json();

      return post.post;
    }
  };

  return (
    <CheckAuth>
      <div className="flex flex-col w-3/5 text-white mx-auto h-max">
        {data && Object.keys(data).length > 0 ? (
          <div className="bg-card rounded-lg py-6 px-8 m-2">
            <h2 className="text-2xl pb-5 font-bold">{data?.title}</h2>
            <p>{data?.body}</p>
            <div className="border-2 border-divider my-8"></div>
            <Comment comments={data?.comments} />
            <Link href="/posts">
              <button className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg">
                &nbsp;Back&nbsp;
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-card rounded-lg py-6 px-8 m-2 text-2xl h-[calc(100vh-130px)] flex gap-2 justify-center items-center">
            <Link href="/posts">
              <p className="py-1 px-3 rounded-lg bg-green">&larr;</p>
            </Link>
            <p>No Such Post</p>
          </div>
        )}
      </div>
    </CheckAuth>
  );
}
