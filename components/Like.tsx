"use client";

import { useOptimistic } from "react";
import { likeAction } from "@/utils/action";
import {
  Angry,
  FilledLike,
  Happy,
  OutlineLike,
  Reaction,
  Sad,
  Thumb,
  Verified,
} from "./icons/Reaction";
import Tippy from "@tippyjs/react";

type LikeObject = {
  liked: boolean;
  likeCount: number;
};

export default function Like({
  likeCount,
  liked,
  varient,
  postId,
  commentId,
}: {
  likeCount: number;
  liked: boolean;
  varient: string;
  postId: string;
  commentId: string;
}) {
  const [optimisticLike, optimisticUpdate] = useOptimistic(
    { likeCount, liked },
    (prevCount, newCount: LikeObject) => {
      return {
        ...newCount,
        likeCount: prevCount.likeCount + newCount.likeCount,
      };
    }
  );

  return (
    <Tippy
      animateFill={true}
      placement="top"
      content={AvailableReactions()}
      interactive={true}
    >
      <div
        className="w-max flex gap-3 p-1 px-2 rounded-full bg-black hover:bg-opacity-50"
        onClick={(e) => {
          optimisticUpdate({
            likeCount: optimisticLike.likeCount ? -1 : 1,
            liked: !optimisticLike.liked,
          });
          likeAction(postId, liked, varient, commentId);
        }}
      >
        {!optimisticLike.liked ? <Reaction /> : <FilledLike />}
        <p className="text-md">{optimisticLike.likeCount}</p>
      </div>
    </Tippy>
  );
}

function AvailableReactions() {
  return (
    <ul className="rounded-full flex gap-3 w-max p-2">
      <li className="rounded-full delay-75 hover:scale-125">
        <OutlineLike />
      </li>
      <li className="rounded-full hover:scale-125">
        <Thumb />
      </li>
      <li className="rounded-full hover:scale-125">
        <Happy />
      </li>
      <li className="rounded-full hover:scale-125 hover:[--gcolor:#1496d9]">
        <Verified />
      </li>
      <li className="rounded-full hover:scale-125">
        <Sad />
      </li>
      <li className="rounded-full hover:scale-125 hover:[--gcolor:#F75A68]">
        <Angry />
      </li>
    </ul>
  );
}
