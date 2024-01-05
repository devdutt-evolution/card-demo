"use client";
import Link from "next/link";
import AddPost from "./AddPost";
import ReactQueryProvider from "@/components/ReactQuery";
import { useCallback, useEffect, useState } from "react";
import type { Posts } from "../../types/type.d";

const PAGE_SIZE = 10;
const fetchNextPosts = async (
  pageNumber: number,
  sortWith: string,
  isAsc: string,
  search: string = ""
) => {
  let res;
  if (!search)
    res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_limit=${PAGE_SIZE}&_page=${pageNumber}&_sort=${sortWith}&_order=${isAsc}&_expand=user`
    );
  else
    res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts?_q=${search}&_limit=${PAGE_SIZE}&_expand=user`
    );
  if (!res.ok) throw new Error("failed to fetch");
  let data: { posts: Posts } = await res.json();

  return data.posts;
};

export default function InfinitePosts({ posts }: { posts: Posts }) {
  const [isError, setError] = useState(false);
  const [yes, setYes] = useState(false);
  const [data, setData] = useState<Posts>(posts);
  const [page, setPage] = useState(2);
  const [isAsc, setAsc] = useState("asc");
  const [sortWith, setSortWith] = useState("title");
  const [search, setSearch] = useState("");

  const loadMore = useCallback(async () => {
    let data = await fetchNextPosts(page, sortWith, isAsc);
    setData((prevPosts) => {
      return [...prevPosts, ...data];
    });
    setPage((page) => page + 1);
  }, [page, sortWith, isAsc]);
  // to check if the passed data has changed from parent compo
  useEffect(() => {
    setData(posts);
  }, [posts]);
  // for debounce and search
  useEffect(() => {
    const getData = setTimeout(async () => {
      const d = await fetchNextPosts(1, sortWith, isAsc, search);
      setData(d);
    }, 1500);

    return () => clearTimeout(getData);
  }, [search, sortWith, isAsc]);
  // on sorting change data
  useEffect(() => {
    setPage(2);
    let fun = async () => {
      let data = await fetchNextPosts(1, sortWith, isAsc);
      setData(data);
    };
    fun();
  }, [sortWith, isAsc]);
  // infinite scroll
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as Document;
      const ta = target.documentElement as Document["documentElement"];
      const scrollHeight = ta.scrollHeight;
      const currentHeight = ta.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);
  // only after initial load render the components
  useEffect(() => {
    setYes(true);
  }, []);

  // input handlers
  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.target.value);
  const sortChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setAsc(e.target.value);
  const fieldChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setSortWith(e.target.value);

  // if error
  if (isError) return <main>Error Occured</main>;
  // if no data
  if (data?.length == 0)
    return (
      <main className="flex flex-col gap-y-1 w-4/5 text-white mx-auto mt-2 h-max border-2 border-white px-1 py-1">
        No Posts
      </main>
    );
  return (
    <>
      {yes && (
        <ReactQueryProvider>
          <main className="flex w-full">
            <div className="flex flex-col w-3/5 text-white mx-auto h-max p-2">
              <AddPost />
              <input
                type="search"
                className="focus:outline-none text-[#FFF] font-roboto rounded-lg bg-card p-2"
                placeholder="Search"
                onChange={handleSearch}
              />
              <div className="flex justify-end py-2 gap-2">
                <select
                  className="p-2 rounded-lg bg-card"
                  value={isAsc}
                  onChange={sortChange}
                >
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
                <select
                  className="p-2 rounded-lg bg-card"
                  value={sortWith}
                  onChange={fieldChange}
                >
                  <option value="title">Title</option>
                  <option value="body">Description</option>
                </select>
              </div>
              {data?.map((post) => {
                return (
                  <div
                    key={post._id}
                    className="bg-card rounded-lg py-6 mb-2 px-8 border-2 border-black hover:border-2 hover:border-green"
                  >
                    <Link className="w-fit" href={`/user/${post.userId}`}>
                      <h2 className="text-green text-2xl w-min">
                        {post.user?.username}
                      </h2>
                      <h3 className="text-sm mb-4 w-min">{post.user?.name}</h3>
                    </Link>
                    <Link href={`/post/${post._id}`}>
                      <h3 className="text-xl pb-4">{post.title}</h3>
                      <p>{post.body}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </main>
        </ReactQueryProvider>
      )}
    </>
  );
}
