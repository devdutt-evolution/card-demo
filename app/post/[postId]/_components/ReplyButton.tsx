"use client";

import type { Comment } from "@/types/type.d";
import type { Session } from "next-auth";
import AddReply from "./AddReply";
import { useState } from "react";

/**
 * Component which returns reply text and manages its own state to create replies
 */
export default function ReplyButton({
  comment,
  userSession,
}: {
  comment: Comment;
  userSession: Session["user"];
}) {
  const [active, setActive] = useState(false);

  function toggleActive() {
    setActive((e) => !e);
  }

  return (
    <>
      <button
        type="button"
        className="max-w-min mt-2 rounded-full cursor-pointer hover:text-hgreen"
        onClick={(e) => toggleActive()}
      >
        Reply
      </button>
      {active && (
        <div className="w-[80%] mx-auto">
          <h4 className="font-bold mb-2">@{userSession.name}</h4>
          <AddReply
            comment={comment}
            userSession={userSession}
            toggleActive={toggleActive}
            initString={`@[${comment.username}](${comment.userId}) `}
          />
        </div>
      )}
    </>
  );
}
