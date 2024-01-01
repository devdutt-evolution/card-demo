"use client";
// Comment component to show comments under post
import { Comments, Comment } from "@/types/type.d";
import { useEffect, useState } from "react";

export default function Comment({ postId }: { postId: number }) {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Comments | []>([]);

  useEffect(() => {
    const fetchCommentsDetail = async (postId: number) => {
      try {
        let data = await fetch(`https://jsonplaceholder.typicode.com/comments`);
        data = await data.json();
        let comments: Comments = data.filter(
          (comment: Comment) => comment.postId == postId
        );

        setLoading(false);
        setData(comments);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    fetchCommentsDetail(postId);
  }, [postId]);
  // if error
  if (isError) return <div>Error Occured</div>;
  // if loading
  if (isLoading)
    return (
      <main className="flex w-full h-full justify-center items-center font-bold text-white">
        Loading
      </main>
    );
  // if no post
  if (data.length == 0)
    return (
      <div className="flex flex-col gap-y-1 w-4/5 text-white mx-auto mt-2 h-max border-2 border-white px-2 py-1">
        No Comments
      </div>
    );
  // else
  return (
    <div className="flex flex-col gap-y-1 w-4/5 text-white mx-auto mt-2 h-max border-2 border-white px-2 py-1">
      {data.map((comment) => {
        return (
          <>
            <h4 key={comment.id} className="text-l pt-1 leading-3">
              <a href={`to:${comment.email}`}>
                {comment.name.split(" ")[0].toUpperCase()}
              </a>
            </h4>
            <p className="pl-2 pb-2">{comment.body}</p>
          </>
        );
      })}
    </div>
  );
}
