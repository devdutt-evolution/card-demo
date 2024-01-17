"use client";

import InfinitePosts from "./InfintePosts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AddPost from "./AddPost";

export default function Posts() {
  const { data } = useSession({
    required: true,
  });
  const [isAsc, setAsc] = useState("asc");
  const [sortWith, setSortWith] = useState("title");
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={
              isAsc == "desc" && sortWith == "updatedAt"
                ? "fill-green"
                : "fill-[#fff]"
            }
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
          </svg>
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
