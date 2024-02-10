import type { Comment } from "@/types/type.d";
import React, { useEffect, useState } from "react";
import { getReply } from "../helper";
import { Session } from "next-auth";
import Link from "next/link";
import ReplyButton from "./ReplyButton";
import { transformText } from "../commentUtils";

export default function CommentReplies({
  comment,
  userSession,
  replyId,
}: {
  comment: Comment;
  userSession: Session["user"];
  replyId: string | string[] | undefined;
}) {
  const [replies, setReplies] = useState<Comment[]>([]);

  useEffect(() => {
    async function getReplies() {
      const repliesData = await getReply(comment._id, userSession.token);
      setReplies(repliesData.replies);
    }
    getReplies();
  }, [setReplies, comment, userSession]);

  useEffect(() => {
    if (replyId && typeof replyId == "string") {
      const ele = document.getElementById(replyId);
      ele?.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      {replies && (
        <div className="flex flex-col items-end gap-2">
          {replies.map((reply) => (
            <div
              key={reply._id}
              className="w-[90%] rounded-lg bg-card p-2"
              id={reply._id}
            >
              <Link
                href={`/user/${reply.userId}`}
                className="pb-2 font-bold block"
              >
                @{reply.username}
              </Link>
              <div
                dangerouslySetInnerHTML={{ __html: transformText(reply.body) }}
              />
              <ReplyButton comment={reply} userSession={userSession} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
