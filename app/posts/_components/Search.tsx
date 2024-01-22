"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("q") || "";
  // console.log(params.toString());
  const [search, setSearch] = useState<string>(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ele = document.getElementById("search") as HTMLInputElement;
      if (ele) setSearch(ele.value);

      const current = new URLSearchParams(Array.from(params.entries()));
      if (!search || search == "") {
        current.delete("q");
      } else {
        current.set("q", search);
      }
      let queryString = current.toString();
      router.push(queryString ? `?${queryString}` : "");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router, search, params]);

  return (
    <input
      type="search"
      className="outline-none focus:outline-green text-[#FFF] font-roboto rounded-lg bg-card p-2 px-4"
      id="search"
      autoComplete="off"
      placeholder="Search"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
