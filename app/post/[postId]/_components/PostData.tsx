"use client";

import type { Session } from "next-auth";
import AddComment from "./AddComment";
import CommentBody from "./CommentBody";
import { type PostComment } from "@/types/type.d";
import { useEffect, useState } from "react";
import EditPost from "./EditPost";

/**
 * Main component which manages skeleton of post details
 */
export default function PostData({
  postDetails,
  userSession,
  commentId,
  replyId,
}: {
  postDetails: PostComment;
  userSession: Session["user"];
  commentId: string | string[] | undefined;
  replyId: string | string[] | undefined;
}) {
  const [details, setDetails] = useState(postDetails);

  useEffect(() => {
    setDetails(postDetails);
    if (commentId && typeof commentId == "string" && !replyId) {
      const ele = document.getElementById(commentId);
      ele?.scrollIntoView({ behavior: "smooth" });
    }
  }, [postDetails, setDetails, commentId, replyId]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold mb-2'>{details?.title}</h2>
        {userSession.id.toString() === postDetails.userId.toString() && (
          <EditPost
            initTitle={details.title}
            body={details.body}
            postId={details._id.toString()}
          />
        )}
      </div>
      <div
        className='ProseMirror nono'
        dangerouslySetInnerHTML={{ __html: details?.body || <p></p> }}
      />
      <hr className='border-2 border-divider my-4' />
      {/* CREATE TEXTAREA */}
      <AddComment />
      {/* COMMENTS IF THERE ARE */}
      <div className='my-4 flex gap-2 flex-col'>
        {Array.isArray(details?.comments) ? (
          details.comments?.map((comment) => (
            <CommentBody
              key={comment._id}
              comment={comment}
              userSession={userSession}
              isActive={comment._id === commentId}
              replyId={replyId}
            />
          ))
        ) : (
          <div className='bg-divider py-3 px-5 rounded-lg'>No Comments</div>
        )}
      </div>
    </>
  );
}
