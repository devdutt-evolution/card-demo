"use client";

import { useOptimistic, useRef, useTransition } from "react";
import { reactOnComment } from "../action";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import OutlineLike from "@/components/icons/OutlineLike";
import FilledLike from "@/components/icons/FilledLike";

let callapi = (commentId: string) =>
  `${process.env.NEXT_PUBLIC_URL_BACKEND}/comments/${commentId}`;

type LikeObject = {
  liked?: boolean;
  totalLikes: number;
};

export default function CommentLike({
  initLiked,
  id,
  totalLikes,
}: {
  initLiked: boolean;
  id: string;
  totalLikes: number;
}) {
  // const router = useRouter();
  const [_isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const params: { postId: string } = useParams();
  const { data } = useSession({ required: true });
  const tokener: any = data?.user;

  const [optimisticState, addOptimisticLike] = useOptimistic<
    LikeObject,
    LikeObject
  >(
    {
      liked: initLiked,
      totalLikes: totalLikes,
    },
    (currentState: LikeObject, optimisticVal: LikeObject) => {
      let total = currentState.totalLikes + optimisticVal.totalLikes;
      console.log("updating", total);
      return {
        liked: !currentState.liked,
        totalLikes: total,
      };
    }
  );

  const animateFav = () => {
    // remove class to remove animation
    setTimeout(() => {
      if (ref.current) {
        const firstChild = ref.current.firstChild as HTMLElement;
        if (firstChild) firstChild.classList.remove("animate-ping");
      }
    }, 450);
    // add class to animate like
    if (ref.current) {
      const firstChild = ref.current.firstChild as HTMLElement;
      if (firstChild) firstChild.classList.add("animate-ping");
    }
  };

  const handleLike = async () => {
    if (optimisticState.liked) {
      addOptimisticLike({ totalLikes: optimisticState.totalLikes-- });
    } else {
      addOptimisticLike({ totalLikes: optimisticState.totalLikes++ });
      animateFav();
    }

    reactOnComment(callapi(id), initLiked, tokener.token, params.postId);
  };

  return (
    <div
      ref={ref}
      onClick={async (e) => {
        startTransition(handleLike);
        handleLike();
      }}
      className="w-min flex gap-4 py-2 px-3 bg-black rounded-full"
    >
      {!optimisticState.liked ? <OutlineLike /> : <FilledLike />}
      <p className="text-md">{optimisticState.totalLikes}</p>
    </div>
  );
}
