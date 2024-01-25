"use client";

import { useOptimistic } from "react";
import FilledLike from "./icons/FilledLike";
import OutlineLike from "./icons/OutlineLike";
import { likeAction } from "@/utils/action";

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
      {optimisticLike.liked ? <FilledLike /> : <OutlineLike />}
      <p className="text-md">{optimisticLike.likeCount}</p>
    </div>
  );
}
