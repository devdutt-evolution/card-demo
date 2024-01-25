"use client";

import { useOptimistic } from "react";
import { likeAction } from "@/utils/action";
import {
  Angry,
  Happy,
  OutlineLike,
  Reaction,
  Sad,
  Thumb,
  Verified,
} from "./icons/Reaction";
import Tippy from "@tippyjs/react";
import AvailableReactions from "./AvailableReactions";
// import { useRouter } from "next/navigation";

type LikeObject = {
  reaction: string;
  likeCount: number;
};

export default function Like({
  likeCount,
  reactionType,
  varient,
  postId,
  commentId,
}: {
  likeCount: number;
  reactionType?: string;
  varient: string;
  postId: string;
  commentId: string;
}) {
  const [optimisticLike, optimisticUpdate] = useOptimistic(
    { likeCount, reaction: reactionType },
    (prevCount, newCount: LikeObject) => {
      return {
        reaction: newCount.reaction,
        likeCount: prevCount.likeCount + newCount.likeCount,
      };
    }
  );

  return (
    <Tippy
      placement="top"
      content={
        reactionType === "unlike" ? (
          <AvailableReactions
            optimisticUpdate={optimisticUpdate}
            postId={postId}
            varient={varient}
            commentId={commentId}
          />
        ) : (
          <></>
        )
      }
      interactive={true}
    >
      <div
        className="w-max flex gap-3 p-1 px-2 rounded-full bg-black hover:bg-opacity-50"
        onClick={(e) => {
          optimisticUpdate({
            likeCount: -1,
            reaction: "unlike",
          });
          likeAction(postId, "unlike", varient, commentId);
        }}
      >
        {optimisticLike?.reaction === "heart" ? (
          <OutlineLike active={true} />
        ) : optimisticLike?.reaction === "like" ? (
          <Thumb active={true} />
        ) : optimisticLike?.reaction === "happy" ? (
          <Happy active={true} />
        ) : optimisticLike?.reaction === "sad" ? (
          <Sad active={true} />
        ) : optimisticLike?.reaction === "verified" ? (
          <Verified active={true} />
        ) : optimisticLike?.reaction === "angry" ? (
          <Angry active={true} />
        ) : (
          <Reaction />
        )}
        <p className="text-md">{optimisticLike.likeCount}</p>
      </div>
    </Tippy>
  );
}
