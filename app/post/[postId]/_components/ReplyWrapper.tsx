"use client";

import type { Comment } from "@/types/type.d";
import type { Session } from "next-auth";
import { useState } from "react";
import AddReply from "./AddReply";

export default function ReplyWrapper({
  comment,
  userSession,
}: {
  comment: Comment;
  userSession: Session["user"];
}) {
  const [active, setActive] = useState(false);

  function toggleActive() {
    setActive((state) => !state);
  }

  return (
    <>
      <button
        type="button"
        className="max-w-min p-1 px-2 mt-2 rounded-full cursor-pointer hover:bg-card"
        onClick={(e) => toggleActive()}
      >
        Reply
      </button>
      {active && (
        <div className="w-[80%] mx-auto">
          <h4 className="font-bold mb-2">@{userSession.name}</h4>
          <AddReply
            toggleActive={toggleActive}
            initString={`@[${comment.username}](${comment.userId}) `}
          />
        </div>
      )}
    </>
  );
}
