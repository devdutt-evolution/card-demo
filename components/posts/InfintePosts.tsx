"use client";
import Link from "next/link";
import AddPost from "./AddPost";
import ReactQueryProvider from "@/components/ReactQuery";
import { useCallback, useEffect, useState } from "react";
import type { Posts } from "../../types/type.d";
import { DateTime } from "luxon";
import Loader from "../Loader";

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
  const [loading, setLoading] = useState(false);
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
    setLoading(false);
    setPage((page) => page + 1);
  }, [page, sortWith, isAsc]);
  // to check if the passed data has changed from parent compo
  useEffect(() => {
    fetchNextPosts(1, sortWith, isAsc).then((data) => {
      setData(data);
    });
    setLoading(false);
    setPage(1);
  }, [posts, sortWith, isAsc]);
  // for debounce and search
  useEffect(() => {
    setLoading(true);
    const getData = setTimeout(async () => {
      const d = await fetchNextPosts(1, sortWith, isAsc, search);
      setData(d);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(getData);
  }, [search, sortWith, isAsc]);
  // on sorting change data
  // useEffect(() => {
  //   setPage(2);
  //   let fun = async () => {
  //     let data = await fetchNextPosts(1, sortWith, isAsc);
  //     setData(data);
  //   };
  //   fun();
  // }, [sortWith, isAsc]);
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
    
  const handleRecent: React.MouseEventHandler = (e) => {
    if (sortWith == "createdAt" && isAsc == "desc") {
      setSortWith("title");
      setAsc("asc");
    } else {
      setSortWith("createdAt");
      setAsc("desc");
    }
  };

  // if error
  if (isError) return <main>Error Occured</main>;

  return (
    <>
      {yes && (
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
              <button
                onClick={handleRecent}
                className={`py-2 px-3 bg-card rounded-lg border-2 border-card ${
                  isAsc == "desc" &&
                  sortWith == "createdAt" &&
                  "border-green text-green"
                }`}
              >
                Recent First
              </button>
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
                <option value="createdAt">Time</option>
              </select>
            </div>
            {data.length > 0 ? (
              data?.map((post) => {
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
                        <h2 className="text-green text-2xl">
                          {post.user?.username}
                        </h2>
                        {post.publishAt && <h3>{luxonDate?.toRelative()}</h3>}
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
        </main>
      )}
    </>
  );
}
