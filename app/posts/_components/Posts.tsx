"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Posts } from "@/types/type.d";
import { DateTime } from "luxon";
import Like from "@/components/Like";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchNextPosts } from "../pageUtils";

export default function InfinitePosts({ posts }: { posts: Posts }) {
  const params = useSearchParams();
  const [data, setData] = useState<Posts>(posts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const sortWith = params.get("field") || "title";
  const isAsc = params.get("order") || "asc";
  const search = params.get("q") || "";

  const { data: authData } = useSession({ required: true });
  const tokener: any = authData?.user;

  // infinite scroll
  useEffect(() => {
    async function loadMore() {
      if (hasMore) {
        let data: Posts | undefined = await fetchNextPosts(
          page,
          sortWith,
          isAsc,
          tokener?.token,
          search
        );
        if (data?.length == 0) setHasMore(false);
        // setLoading(false);
        setPage((page) => page + 1);
        setData((prevPosts) => {
          return [...prevPosts, ...(data || [])];
        });
      } else {
        return [];
      }
    }

    const handleScroll = (e: Event) => {
      const target = e.target as Document;
      const ta = target.documentElement as Document["documentElement"];
      const scrollHeight = ta.scrollHeight;
      const currentHeight = ta.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        if (hasMore) loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isAsc, tokener, sortWith, page, search]);

  useEffect(() => {
    setData(posts);
  }, [posts]);

  return (
    <div className="flex flex-col w-full mx-auto gap-2">
      {data?.length > 0 &&
        data?.map((post, index) => {
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
              <Like
                token={tokener?.token}
                liked={post.likedByUser}
                id={post._id}
                totalLikes={post.numberOfLikes}
                totalComments={post.commentCount}
              />
            </div>
          );
        })}
      {data.length == 0 && (
        <div className="bg-card px-3 py-4 border-2 border-black rounded-lg">
          No Posts
        </div>
      )}
    </div>
  );
}
// loading && (
// <div className="h-[200px] flex justify-center items-center w-full">
//   <Loader />
// </div>
// )
