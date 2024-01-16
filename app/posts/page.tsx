"use client";

import InfinitePosts from "./InfintePosts";
import AddPost from "./AddPost";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";

export default function PostsWrapper() {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const [isAsc, setAsc] = useState("asc");
  const [sortWith, setSortWith] = useState("title");
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");
  const [cust, setCust] = useState(false);

  // for debounce and search
  useEffect(() => {
    const getData = setTimeout(async () => {
      const ele = document.getElementById("search") as HTMLInputElement;
      if (ele) setSearch(ele.value);
    }, 1500);

    return () => clearTimeout(getData);
  }, [tempSearch]);

  // input handlers
  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setTempSearch(e.target.value);
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
    <main className="flex w-full">
      <div className="flex flex-col w-3/5 text-white mx-auto h-max p-2">
        <AddPost setCust={setCust} token={data?.user} />
        <input
          type="search"
          className="outline-none focus:outline-green text-[#FFF] font-roboto rounded-lg bg-card p-2 px-4"
          id="search"
          autoComplete="off"
          placeholder="Search"
          value={tempSearch}
          onChange={handleSearch}
        />
        <div className="flex justify-end py-2 gap-2 text-sm font-semibold">
          <button
            onClick={handleRecent}
            className={`py-2 px-3 ${
              isAsc == "desc" &&
              sortWith == "createdAt" &&
              "border-green text-green"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                isAsc == "desc" && sortWith == "createdAt"
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
            className="p-2 rounded-lg bg-card outline-none focus:outline-green"
            value={isAsc}
            onChange={sortChange}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <select
            className="p-2 rounded-lg bg-card outline-none focus:outline-green"
            value={sortWith}
            onChange={fieldChange}
          >
            <option value="title">Title</option>
            <option value="body">Description</option>
            <option value="createdAt">Time</option>
            <option value="numberOfLikes">Likes</option>
          </select>
        </div>
        {status === "loading" ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <InfinitePosts
            sortWith={sortWith}
            isAsc={isAsc}
            search={search}
            cust={cust}
            token={data?.user}
          />
        )}
      </div>
    </main>
  );
}
