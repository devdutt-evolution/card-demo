"use client";

import { useCallback, useEffect, useOptimistic, useTransition } from "react";
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
import { REACTIONS } from "@/utils/consts";

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
  reactionType: string;
  varient: string;
  postId: string;
  commentId?: string;
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

  useEffect(() => {
    startTransition(() =>
      optimisticUpdate({ likeCount, reaction: reactionType })
    );
  }, [optimisticUpdate, likeCount, reactionType]);

  const [_ispending, startTransition] = useTransition();

  const handleClicks = useCallback(
    (count: number, react: REACTIONS) => {
      startTransition(() => {
        optimisticUpdate({
          likeCount: count,
          reaction: react,
        });
        likeAction(postId, react, varient, commentId);
      });
    },
    [postId, commentId, varient, optimisticUpdate]
  );

  return (
    <Tippy
      placement="left"
      // onHide={() => {}}
      // trigger="manual"
      // showOnCreate={true}
      content={
        !reactionType || reactionType === REACTIONS.UNLIKE ? (
          <AvailableReactions onReact={handleClicks} />
        ) : (
          <></>
        )
      }
      interactive={true}
    >
      <div
        className="w-max flex gap-3 p-1 px-2 rounded-full bg-black hover:bg-opacity-50"
        onClick={(e) => {
          handleClicks(-1, REACTIONS.UNLIKE);
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
