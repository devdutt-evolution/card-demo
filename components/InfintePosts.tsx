"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Posts } from "../types/type.d";

const PAGE_SIZE = 10;
const fetchNextPosts = async (
  pageNumber: number,
  sortWith: string,
  isAsc: string
) => {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${PAGE_SIZE}&_page=${pageNumber}&_sort=${sortWith}&_order=${isAsc}`
  );
  if (!res.ok) throw new Error("failed to fetch");
  let data: Posts = await res.json();
  return data;
};

export default function InfinitePosts({ posts }: { posts: Posts }) {
  const [isError, setError] = useState(false);
  const [data, setData] = useState<Posts>(posts);
  const [page, setPage] = useState(2);
  const [isAsc, setAsc] = useState("asc");
  const [sortWith, setSortWith] = useState("title");
  const [afterSearch, setAfterSearch] = useState<Posts>(data);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = setTimeout(() => {
      if (!search) setAfterSearch(data);
      const d = data.filter((p) => p.title?.includes(search));
      setAfterSearch(d);
    }, 2000);

    return () => clearTimeout(getData);
  }, [data, search]);

  useEffect(() => {
    setPage(2);
    let fun = async () => {
      let data = await fetchNextPosts(1, sortWith, isAsc);
      setData(data);
      setAfterSearch(data);
    };
    fun();
  }, [sortWith, isAsc]);

  const loadMore = async () => {
    let data = await fetchNextPosts(page, sortWith, isAsc);
    setData((prevPosts) => {
      return prevPosts.concat(data);
    });
    setPage((page) => page + 1);
  };
  // if error
  if (isError) return <div>Error Occured</div>;
  // if loading
  // if (isLoading)
  //   return (
  //     <main className="flex min-h-screen justify-center items-center font-bold text-white">
  //       Loading
  //     </main>
  //   );
  // if no data
  if (data.length == 0)
    return (
      <div className="flex flex-col gap-y-1 w-4/5 text-white mx-auto mt-2 h-max border-2 border-white px-1 py-1">
        No Posts
      </div>
    );
  // else
  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.target.value);
  const sortChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setAsc(e.target.value);
  };
  const fieldChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSortWith(e.target.value);
  };
  return (
    <main className="flex w-full">
      <div className="flex flex-col w-3/5 text-white mx-auto h-max">
        <input
          type="search"
          className="focus:outline-none text-[#FFF] font-roboto rounded-lg bg-card p-2 m-2"
          placeholder="Search"
          onChange={handleSearch}
        />
        <div className="flex justify-end">
          <select
            className="p-2 m-2 rounded-lg bg-card"
            value={isAsc}
            onChange={sortChange}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <select
            className="p-2 m-2 rounded-lg bg-card"
            value={sortWith}
            onChange={fieldChange}
          >
            <option value="title">Title</option>
            <option value="body">Description</option>
          </select>
        </div>
        {afterSearch.map((post) => {
          return (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="bg-card rounded-lg py-6 px-8 m-2 border-2 border-black hover:border-2 hover:border-green">
                <h2 className="text-2xl pb-5">{post.title}</h2>
                <p>{post.body}</p>
              </div>
            </Link>
          );
        })}
        {page < 11 ? (
          <button
            className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg m-2"
            onClick={loadMore}
          >
            &nbsp;Load more&nbsp;
          </button>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
