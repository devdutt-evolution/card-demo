"use client";

import Clock from "@/components/icons/Clock";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Filter() {
  const params = useSearchParams();
  const router = useRouter();
  const [orderBy, setOrderBy] = useState(params.get("order") || "asc");
  const [fieldName, setFieldName] = useState(params.get("field") || "title");

  useEffect(() => {
    const current = new URLSearchParams(Array.from(params.entries()));
    if (!orderBy) current.delete("order");
    else current.set("order", orderBy);

    if (!fieldName) current.delete("field");
    else current.set("field", fieldName);

    const queryString = current.toString();
    router.push(queryString ? `?${queryString}` : "");
  }, [orderBy, fieldName, router, params]);

  const handleRecent = () => {
    if (fieldName == "createdAt" && orderBy == "desc") {
      setFieldName("title");
      setOrderBy("asc");
    } else {
      setFieldName("createdAt");
      setOrderBy("desc");
    }
  };

  const handleMostLiked = () => {
    if (fieldName == "numberOfLikes" && orderBy == "desc") {
      setFieldName("title");
      setOrderBy("asc");
    } else {
      setFieldName("numberOfLikes");
      setOrderBy("desc");
    }
  };

  return (
    <div className="flex justify-end gap-2 text-sm font-semibold">
      <button
        onClick={(e) => handleRecent()}
        className={`py-2 px-3 ${
          orderBy == "desc" &&
          fieldName == "createdAt" &&
          "border-green text-green"
        }`}
      >
        <Clock
          color={
            orderBy == "desc" && fieldName == "createdAt"
              ? "fill-green"
              : "fill-[#fff]"
          }
        />
      </button>
      <button
        onClick={(e) => handleMostLiked()}
        className={`py-2 px-3 bg-card rounded-lg ${
          orderBy == "desc" &&
          fieldName == "numberOfLikes" &&
          "border-green text-green"
        }`}
      >
        Most Liked
      </button>
      <select
        className="bg-card focus:outline-green p-2 rounded-lg outline-none"
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value)}
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <select
        className="bg-card focus:outline-green p-2 rounded-lg outline-none"
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="body">Description</option>
        <option value="createdAt">Time</option>
        <option value="numberOfLikes">Likes</option>
      </select>
    </div>
  );
}
