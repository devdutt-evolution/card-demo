// Comment component to show comments under post
import { Comments } from "@/types/type.d";
// import { useEffect, useState } from "react";

export default async function Comment({ comments }: { comments: Comments }) {
  if (comments?.length == 0)
    return (
      <div className="bg-divider my-5 py-3 px-5 rounded-lg">
        No Comments
      </div>
    );
  // else
  return (
    <>
      {comments?.map((comment) => {
        return (
          <div
            key={comment._id}
            className="bg-divider my-5 py-3 px-5 rounded-lg"
          >
            <h4 className="text-l font-bold">
              <a href={`to:${comment.email}`}>{comment.name.split(" ")[0]}</a>
            </h4>
            <p className="text-sm text-place">{comment.email}</p>
            <p className="pt-3">{comment.body}</p>
          </div>
        );
      })}
    </>
  );
}
