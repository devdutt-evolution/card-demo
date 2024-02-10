"use client";

import type { Comment } from "@/types/type.d";
import { transformText } from "../commentUtils";
import CustomLike from "@/components/Like";
import { REACTIONS } from "@/utils/consts";
import Link from "next/link";
import type { Session } from "next-auth";
import ReplyButton from "./ReplyButton";
import { useState } from "react";
import CommentReplies from "./CommentReplies";

export default function CommentBody({
  comment,
  userSession,
  isActive,
  replyId,
}: {
  comment: Comment;
  userSession: Session["user"];
  isActive: boolean;
  replyId: string | string[] | undefined;
}) {
  const commentBody = transformText(comment.body);
  const userName = comment?.username;
  const reactionType = comment?.userLike?.reactionType || REACTIONS.UNLIKE;
  const customLikeVarient = "comment";

  const [activeShow, setActiveShow] = useState(isActive);

  function toggleShowActive() {
    setActiveShow((state) => !state);
  }

  return (
    <div
      key={comment._id}
      id={comment._id}
      className="bg-divider rounded-lg p-3"
    >
      <h4 className="text-l font-bold ">
        <Link href={`/user/${comment.userId}`}>@{userName}</Link>
      </h4>
      <div className="py-3" dangerouslySetInnerHTML={{ __html: commentBody }} />
      {/* REACTION ELEMENT */}
      <CustomLike
        commentId={comment._id}
        reactionType={reactionType}
        likeCount={comment.numberOfLikes}
        postId={comment.postId}
        varient={customLikeVarient}
      />
      {/* REPLY BUTTON */}
      <ReplyButton comment={comment} userSession={userSession} />
      {/* IF THERE ARE REPLIES */}
      {comment.replies > 0 && (
        <p
          className="text-hgreen hover:underline cursor-pointer mt-2"
          onClick={(e) => toggleShowActive()}
        >
          {comment.replies} reply
        </p>
      )}
      {activeShow && (
        <CommentReplies comment={comment} userSession={userSession} replyId={replyId} />
      )}
    </div>
  );
}
