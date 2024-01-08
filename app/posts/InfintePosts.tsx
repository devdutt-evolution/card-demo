"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Posts } from "../../types/type.d";
import { DateTime } from "luxon";
import Loader from "../../components/Loader";

const PAGE_SIZE = 10;
const fetchNextPosts = async (
  pageNumber: number,
  sortWith: string,
  isAsc: string,
  token: string,
  search: string = ""
) => {
  if (token) {
    let res;
    if (!search)
      res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_limit=${PAGE_SIZE}&_page=${pageNumber}&_sort=${sortWith}&_order=${isAsc}&_expand=user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    else
      res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_q=${search}&_limit=${PAGE_SIZE}&_expand=user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    if (!res.ok) throw new Error("failed to fetch");
    let data: { posts: Posts } = await res.json();

    return data.posts;
  }
};

export default function InfinitePosts({
  search,
  sortWith,
  isAsc,
  cust,
  token,
}: {
  search: string;
  sortWith: string;
  isAsc: string;
  cust: boolean;
  token: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Posts>([]);
  const [page, setPage] = useState(2);

  const loadMore = useCallback(async () => {
    let data = (await fetchNextPosts(
      page,
      sortWith,
      isAsc,
      token,
      search
    )) as Posts;
    setLoading(false);
    setPage((page) => page + 1);
    setData((prevPosts) => [...prevPosts, ...data]);
  }, [page, sortWith, isAsc, search, token]);

  useEffect(() => {
    setLoading(true);
    let a = async () => {
      let data = (await fetchNextPosts(
        1,
        sortWith,
        isAsc,
        token,
        search
      )) as Posts;
      setData(data);
      setPage(2);
      setLoading(false);
    };
    a();
  }, [isAsc, sortWith, search, cust, token]);

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
    <div className="flex flex-col w-full text-white mx-auto h-max">
      {data?.length > 0 ? (
        data?.map((post, index) => {
          let diff = post.publishAt;
          let luxonDate;
          if (diff && diff > 0) luxonDate = DateTime.fromMillis(diff);

          return (
            <div
              key={post._id}
              className="bg-card rounded-lg py-6 mb-2 px-8 border-2 border-black hover:border-2 hover:border-green"
            >
              <Link className="w-fit" href={`/user/${post.userId}`}>
                <div className="flex justify-between">
                  <h2 className="text-green text-2xl">{post.user?.username}</h2>
                  {luxonDate && <h3>{luxonDate?.toRelative()}</h3>}
                </div>
                <h3 className="text-sm mb-4">{post.user?.name}</h3>
              </Link>
              <Link href={`/post/${post._id}`}>
                <h3 className="text-xl pb-4">{post.title}</h3>
                <p>{post.body}</p>
              </Link>
            </div>
          );
        })
      ) : (
        <div className="bg-card rounded-lg py-4 px-3 border-2 border-black">
          No Posts
        </div>
      )}
      {loading && (
        <div className="h-[200px] flex justify-center items-center w-full">
          <Loader />
        </div>
      )}
    </div>
  );
}
