"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Posts } from "@/types/type.d";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import CustomLike from "@/components/Like";
import CommentIcon from "@/components/icons/Comment";
import { getMorePosts } from "@/utils/action";
import Loader from "@/components/Loader";

export default function InfinitePosts({ posts }: { posts: Posts }) {
  const params = useSearchParams();
  const [data, setData] = useState<Posts>(posts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const sortWith = params.get("field") || "title";
  const isAsc = params.get("order") || "asc";
  const search = params.get("q") || "";

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      if (!hasMore) {
        return;
      }
      const target = e.target as Document;
      const doc = target.documentElement;
      const scrollHeight = doc.scrollHeight;
      const currentHeight = doc.scrollTop + window.innerHeight;

      if (currentHeight + 1 > scrollHeight) {
        setLoading(true);
        loadMore();
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  });

  async function loadMore() {
    if (hasMore) {
      let data: Posts = await getMorePosts(page, sortWith, isAsc, search);

      if (data?.length == 0 || data?.length < 9) setHasMore(false);
      setPage((page) => page + 1);
      setData((prevPosts) => [...prevPosts, ...data]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col w-full mx-auto gap-2">
      {data?.length > 0 &&
        data?.map((post) => {
          let diff = post.publishAt;
          let luxonDate;
          if (diff && diff > 0) luxonDate = DateTime.fromMillis(diff);

          return (
            <div
              key={post._id}
              className="bg-card hover:border-2 hover:border-green hover:shadow-sm hover:shadow-green px-8 py-6 border-2 border-card rounded-lg"
            >
              <Link className="w-fit" href={`/user/${post.userId}`}>
                <div className="flex justify-between">
                  <h2 className="text-green text-2xl">{post.user?.username}</h2>
                  {luxonDate && <h3>{luxonDate?.toRelative()}</h3>}
                </div>
                <h3 className="mb-4 text-sm">{post.user?.name}</h3>
              </Link>
              <div>
                <Link href={`/post/${post._id}`}>
                  <h3 className="pb-4 text-xl hover:text-green">
                    {post.title}
                  </h3>
                </Link>
                <div
                  className="ProseMirror nono pb-4"
                  dangerouslySetInnerHTML={{ __html: post.body }}
                />
              </div>
              <div className="w-min flex gap-4 p-1 bg-black rounded-full">
                <CustomLike
                  liked={post.likedByUser}
                  likeCount={post.numberOfLikes}
                  postId={post._id}
                  varient="post"
                  commentId=""
                />
                <Link
                  className="w-min hover:bg-card flex gap-3 p-1 px-2 rounded-full"
                  href={`/post/${post._id}`}
                >
                  <CommentIcon />
                  <p className="text-md">{post.commentCount}</p>
                </Link>
              </div>
            </div>
          );
        })}
      {loading && (
        <div className="h-[200px] flex justify-center items-center w-full">
          <Loader />
        </div>
      )}
      {data.length == 0 && (
        <div className="bg-card px-3 py-4 border-2 border-black rounded-lg">
          No Posts
        </div>
      )}
    </div>
  );
}
