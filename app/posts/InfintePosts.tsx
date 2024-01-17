"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Posts } from "../../types/type.d";
import { DateTime } from "luxon";
import Loader from "../../components/Loader";
import Like from "@/components/Like";

const PAGE_SIZE = 10;
async function fetchNextPosts(
  pageNumber: number,
  sortWith: string,
  isAsc: string,
  token: any,
  search: string = ""
) {
  if (token) {
    let url;
    if (!search)
      url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_limit=${PAGE_SIZE}&_page=${pageNumber}&_sort=${sortWith}&_order=${isAsc}&_expand=user`;
    else
      url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_q=${search}&_limit=${PAGE_SIZE}&_expand=user`;

    const res = await fetch(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (res.status != 200) throw new Error("failed to fetch");

    const data: { posts: Posts } = await res.json();
    return data.posts;
  }
}

export default function InfinitePosts({
  search,
  sortWith,
  isAsc,
  token,
}: {
  search: string;
  sortWith: string;
  isAsc: string;
  token: any;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Posts>([]);
  const [page, setPage] = useState(2);

  const loadMore = useCallback(async () => {
    let data = (await fetchNextPosts(
      page,
      sortWith,
      isAsc,
      token?.token,
      search
    )) as Posts;
    setLoading(false);
    setPage((page) => page + 1);
    setData((prevPosts) => {
      return [...(prevPosts || []), ...(data || [])];
    });
  }, [page, sortWith, isAsc, search, token]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      let data = (await fetchNextPosts(
        1,
        sortWith,
        isAsc,
        token?.token,
        search
      )) as Posts;
      setData(data);
      setPage(2);
      setLoading(false);
    })();
  }, [isAsc, sortWith, search, token]);

  // infinite scroll
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as Document;
      const ta = target.documentElement as Document["documentElement"];
      const scrollHeight = ta.scrollHeight;
      const currentHeight = ta.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        loadMore();
        setLoading(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div className="flex flex-col w-full mx-auto gap-2">
      {loading ? (
        <div className="h-[200px] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : data?.length > 0 ? (
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
              <Link href={`/post/${post._id}`}>
                <h3 className="pb-4 text-xl">{post.title}</h3>
                <div
                  className="ProseMirror nono pb-4"
                  dangerouslySetInnerHTML={{ __html: post.body }}
                ></div>
              </Link>
              <Like
                token={token?.token}
                liked={post.likedByUser}
                id={post._id}
                totalLikes={post.numberOfLikes}
                totalComments={post.commentCount}
              />
            </div>
          );
        })
      ) : (
        <div className="bg-card px-3 py-4 border-2 border-black rounded-lg">
          No Posts
        </div>
      )}
    </div>
  );
}
