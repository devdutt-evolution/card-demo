"use client";

import { useOptimistic, useRef, useState, useTransition } from "react";
import { reactOnComment } from "../action";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import OutlineLike from "@/components/icons/OutlineLike";
import FilledLike from "@/components/icons/FilledLike";

let callapi = (commentId: string) =>
  `${process.env.NEXT_PUBLIC_URL_BACKEND}/comments/${commentId}`;

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
  const { data } = useSession({ required: true });
  const tokener: any = data?.user;
  const [numberOfLikes, addOptimisticLike] = useOptimistic<number, number>(
    totalLikes,
    (currentState: number, optimisticVal: number) => {
      let temp = currentState;
      temp += optimisticVal;
      return temp;
    }
  );

  const [liked, setLiked] = useState<boolean>(initLiked);
  const params: { postId: string } = useParams();

  const ref = useRef<HTMLDivElement>(null);

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
    if (liked) {
      setLiked(false);
      addOptimisticLike(-1);
    } else {
      setLiked(true);
      addOptimisticLike(1);
      animateFav();
    }

    reactOnComment(callapi(id), liked, tokener.token, params.postId);
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
      {!liked ? <OutlineLike /> : <FilledLike />}
      <p className="text-md">{numberOfLikes}</p>
    </div>
  );
}
