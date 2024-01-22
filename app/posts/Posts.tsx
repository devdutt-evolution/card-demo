"use client";

import InfinitePosts from "./InfintePosts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AddPost from "./AddPost";
import Clock from "@/components/icons/Clock";
// import { requestForToken } from "@/utils/firebase";

export default function Posts() {
  const { data } = useSession({
    required: true,
  });
  const [isAsc, setAsc] = useState("asc");
  const [sortWith, setSortWith] = useState("title");
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");
  // requestForToken();

  // for debounce and search
  useEffect(() => {
    const getData = setTimeout(() => {
      const ele = document.getElementById("search") as HTMLInputElement;
      if (ele) setSearch(ele.value);
    }, 1500);

    return () => clearTimeout(getData);
  }, [tempSearch]);

  const handleRecent: React.MouseEventHandler = (e) => {
    if (sortWith == "updatedAt" && isAsc == "desc") {
      setSortWith("title");
      setAsc("asc");
    } else {
      setSortWith("updatedAt");
      setAsc("desc");
    }
  };
  const handleMostLiked: React.MouseEventHandler = (e) => {
    if (sortWith == "numberOfLikes" && isAsc == "desc") {
      setSortWith("title");
      setAsc("asc");
    } else {
      setSortWith("numberOfLikes");
      setAsc("desc");
    }
  };

  return (
    <div className="flex flex-col w-3/5 mx-auto gap-2 justify-around mt-2">
      <AddPost />
      <input
        type="search"
        className="outline-none focus:outline-green text-[#FFF] font-roboto rounded-lg bg-card p-2 px-4"
        id="search"
        autoComplete="off"
        placeholder="Search"
        value={tempSearch}
        onChange={(e) => setTempSearch(e.target.value)}
      />
      <div className="flex justify-end gap-2 text-sm font-semibold">
        <button
          onClick={handleRecent}
          className={`py-2 px-3 ${
            isAsc == "desc" &&
            sortWith == "updatedAt" &&
            "border-green text-green"
          }`}
        >
          <Clock
            color={
              isAsc == "desc" && sortWith == "updatedAt"
                ? "fill-green"
                : "fill-[#fff]"
            }
          />
        </button>
        <button
          onClick={handleMostLiked}
          className={`py-2 px-3 bg-card rounded-lg ${
            isAsc == "desc" &&
            sortWith == "numberOfLikes" &&
            "border-green text-green"
          }`}
        >
          Most Liked
        </button>
        <select
          className="bg-card focus:outline-green p-2 rounded-lg outline-none"
          value={isAsc}
          onChange={(e) => setAsc(e.target.value)}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <select
          className="bg-card focus:outline-green p-2 rounded-lg outline-none"
          value={sortWith}
          onChange={(e) => setSortWith(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="body">Description</option>
          <option value="updatedAt">Time</option>
          <option value="numberOfLikes">Likes</option>
        </select>
      </div>
      <InfinitePosts
        sortWith={sortWith}
        isAsc={isAsc}
        search={search}
        token={data?.user}
      />
    </div>
  );
}
