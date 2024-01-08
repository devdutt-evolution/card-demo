"use client";
import InfinitePosts from "@/components/posts/InfintePosts";
import AddPost from "../../components/posts/AddPost";
import { useEffect, useState } from "react";

export default function PostsWrapper() {
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

  return (
    <main className="flex w-full">
      <div className="flex flex-col w-3/5 text-white mx-auto h-max p-2">
        <AddPost setCust={setCust} />
        <input
          type="search"
          className="focus:outline-none text-[#FFF] font-roboto rounded-lg bg-card p-2"
          id="search"
          autoComplete="off"
          placeholder="Search"
          value={tempSearch}
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
        <InfinitePosts
          sortWith={sortWith}
          isAsc={isAsc}
          search={search}
          cust={cust}
        />
      </div>
    </main>
  );
}
