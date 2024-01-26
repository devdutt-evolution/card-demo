"use client";

import Clock from "@/components/icons/Clock";
import { SORTFIELD, SORTORDER } from "@/utils/consts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Filter() {
  const params = useSearchParams();
  const router = useRouter();
  const [orderBy, setOrderBy] = useState(params.get("order") || SORTORDER.asc);
  const [fieldName, setFieldName] = useState(
    params.get("field") || SORTFIELD.title
  );

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
    if (fieldName == SORTFIELD.time && orderBy == SORTORDER.desc) {
      setFieldName(SORTFIELD.title);
      setOrderBy(SORTORDER.asc);
    } else {
      setFieldName(SORTFIELD.time);
      setOrderBy(SORTORDER.desc);
    }
  };

  const handleMostLiked = () => {
    if (fieldName == SORTFIELD.likes && orderBy == SORTORDER.desc) {
      setFieldName(SORTFIELD.title);
      setOrderBy(SORTORDER.asc);
    } else {
      setFieldName(SORTFIELD.likes);
      setOrderBy(SORTORDER.desc);
    }
  };

  return (
    <div className="flex justify-end gap-2 text-sm font-semibold">
      <button
        onClick={(e) => handleRecent()}
        className={`py-2 px-3 ${
          orderBy == SORTORDER.desc &&
          fieldName == SORTFIELD.time &&
          "border-green text-green"
        }`}
      >
        <Clock
          color={
            orderBy == SORTORDER.desc && fieldName == SORTFIELD.time
              ? "fill-green"
              : "fill-[#fff]"
          }
        />
      </button>
      <button
        onClick={(e) => handleMostLiked()}
        className={`py-2 px-3 bg-card rounded-lg ${
          orderBy == SORTORDER.desc &&
          fieldName == SORTFIELD.likes &&
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
        <option value={SORTORDER.asc}>Asc</option>
        <option value={SORTORDER.desc}>Desc</option>
      </select>
      <select
        className="bg-card focus:outline-green p-2 rounded-lg outline-none"
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
      >
        <option value={SORTFIELD.title}>Title</option>
        <option value={SORTFIELD.time}>Time</option>
        <option value={SORTFIELD.likes}>Likes</option>
      </select>
    </div>
  );
}
