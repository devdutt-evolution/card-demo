"use client";

import type { Session } from "next-auth";
import AddComment from "./AddComment";
import CommentBody from "./CommentBody";
import { type PostComment } from "@/types/type.d";
import { useEffect, useState } from "react";

/**
 * Main component which manages skeleton of post details
 */
export default function PostData({
  postDetails,
  userSession,
}: {
  postDetails: PostComment;
  userSession: Session["user"];
}) {
  const [details, setDetails] = useState(postDetails);

  useEffect(() => {
    setDetails(postDetails);
  }, [postDetails, setDetails]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{details?.title}</h2>
      <div
        className="ProseMirror nono"
        dangerouslySetInnerHTML={{ __html: details?.body || <p></p> }}
      />
      <hr className="border-2 border-divider my-4" />
      {/* CREATE TEXTAREA */}
      <AddComment />
      {/* COMMENTS IF THERE ARE */}
      <div className="my-4 flex gap-2 flex-col">
        {Array.isArray(details?.comments) ? (
          details.comments?.map((comment) => (
            <CommentBody
              key={comment._id}
              comment={comment}
              userSession={userSession}
            />
          ))
        ) : (
          <div className="bg-divider py-3 px-5 rounded-lg">No Comments</div>
        )}
      </div>
    </>
  );
}
