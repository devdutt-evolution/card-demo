"use client";

import Clock from "@/components/icons/Clock";
import { SORT_FIELD, SORT_ORDER } from "@/utils/consts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Filter() {
  const params = useSearchParams();
  const router = useRouter();
  const [userId, setUserId] = useState(params.get("userId"));
  const [orderBy, setOrderBy] = useState(params.get("order") || SORT_ORDER.asc);
  const [fieldName, setFieldName] = useState(
    params.get("field") || SORT_FIELD.title
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
    if (fieldName == SORT_FIELD.time && orderBy == SORT_ORDER.desc) {
      setFieldName(SORT_FIELD.title);
      setOrderBy(SORT_ORDER.asc);
    } else {
      setFieldName(SORT_FIELD.time);
      setOrderBy(SORT_ORDER.desc);
    }
  };

  const handleMostLiked = () => {
    if (fieldName == SORT_FIELD.likes && orderBy == SORT_ORDER.desc) {
      setFieldName(SORT_FIELD.title);
      setOrderBy(SORT_ORDER.asc);
    } else {
      setFieldName(SORT_FIELD.likes);
      setOrderBy(SORT_ORDER.desc);
    }
  };

  const handleResetFilter = () => {
    setUserId("");
    router.push(`/posts?order=${SORT_ORDER.asc}&field=${SORT_FIELD.title}`);
  };

  return (
    <div className='flex justify-end gap-2 text-sm font-semibold'>
      {userId && (
        <button
          onClick={(e) => handleResetFilter()}
          type='button'
          className={`py-2 px-3 bg-card rounded-lg`}
        >
          Reset Filters
        </button>
      )}
      <button
        type='button'
        onClick={(e) => handleRecent()}
        className={`py-2 px-3 ${
          orderBy == SORT_ORDER.desc &&
          fieldName == SORT_FIELD.time &&
          "border-green text-green"
        }`}
      >
        <Clock
          color={
            orderBy == SORT_ORDER.desc && fieldName == SORT_FIELD.time
              ? "fill-green"
              : "fill-[#fff]"
          }
        />
      </button>
      <button
        type='button'
        onClick={(e) => handleMostLiked()}
        className={`py-2 px-3 bg-card rounded-lg ${
          orderBy == SORT_ORDER.desc &&
          fieldName == SORT_FIELD.likes &&
          "border-green text-green"
        }`}
      >
        Most Liked
      </button>
      <select
        className='bg-card focus:outline-green p-2 rounded-lg outline-none'
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value)}
      >
        <option value={SORT_ORDER.asc}>Asc</option>
        <option value={SORT_ORDER.desc}>Desc</option>
      </select>
      <select
        className='bg-card focus:outline-green p-2 rounded-lg outline-none'
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
      >
        <option value={SORT_FIELD.title}>Title</option>
        <option value={SORT_FIELD.time}>Time</option>
        <option value={SORT_FIELD.likes}>Likes</option>
      </select>
    </div>
  );
}
