"use client";
import { PostComment } from "@/types/type.d";
import Link from "next/link";
import Comment from "./Comment";
import CheckAuth from "@/components/CheckAuth";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Post({ params }: { params: { postId: string } }) {
  const [data, setData] = useState<PostComment>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = window.localStorage.getItem("token") as string;
    setLoading(true);
    fetchPostDetail(params.postId, token).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [params.postId]);

  const fetchPostDetail = async (postId: string, token: string) => {
    if (token) {
      setLoading(true);
      let data = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      let post: { post: PostComment } = await data.json();

      return post.post;
    }
  };

  return (
    <CheckAuth>
      <div className="flex flex-col w-3/5 text-white mx-auto h-max">
        {loading ? (
          <div className="h-[70vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {data && Object.keys(data).length > 0 ? (
              <div className="bg-card rounded-lg py-6 px-8 m-2">
                <h2 className="text-2xl pb-5 font-bold">{data?.title}</h2>
                <div
                  className="ProseMirror nono"
                  dangerouslySetInnerHTML={{ __html: data.body }}
                ></div>
                <div className="border-2 border-divider my-4"></div>
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
          </>
        )}
      </div>
    </CheckAuth>
  );
}
