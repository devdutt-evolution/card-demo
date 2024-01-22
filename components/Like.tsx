"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import OutlineLike from "./icons/OutlineLike";
import FilledLike from "./icons/FilledLike";
import Comment from "./icons/Comment";

let callapi = (postId: string) =>
  `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}/react`;

export default function Like({
  liked,
  id,
  totalLikes,
  totalComments,
  token,
}: {
  liked: boolean;
  id: string;
  totalLikes: number;
  totalComments: number;
  token: any;
}) {
  const [like, setLike] = useState(liked);
  const [likes, setLikes] = useState(totalLikes);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="w-min flex gap-4 p-1 bg-black rounded-full">
      <div
        ref={ref}
        className="w-min hover:bg-card hover:cursor-pointer flex gap-3 p-1 px-2 rounded-full"
        onClick={async (e) => {
          if (like) {
            if (liked) setLikes(totalLikes - 1);
            else if (!liked) setLikes(totalLikes);
          } else {
            if (liked) setLikes(totalLikes);
            else if (!liked) setLikes(totalLikes + 1);
            setTimeout(() => {
              if (ref.current) {
                const firstChild = ref.current.firstChild as HTMLElement;
                if (firstChild) firstChild.classList.remove("animate-ping");
              }
            }, 450);
            if (ref.current) {
              const firstChild = ref.current.firstChild as HTMLElement;
              if (firstChild) firstChild.classList.add("animate-ping");
            }
          }
          const res = await fetch(callapi(id), {
            method: "put",
            body: JSON.stringify({ reaction: like ? "unlike" : "like" }),
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          // if (res.status != 200) console.error("Failed to like");
          setLike((l) => !l);
        }}
      >
        {!like ? <OutlineLike /> : <FilledLike />}
        <p className="text-md">{likes}</p>
      </div>
      <Link
        className="w-min hover:bg-card flex gap-3 p-1 px-2 rounded-full"
        href={`/post/${id}`}
      >
        <Comment />
        <p className="text-md">{totalComments}</p>
      </Link>
    </div>
  );
}
