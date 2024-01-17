"use client";

import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export default function AddComment({ postId }: { postId: string }) {
  const router = useRouter();
  const { data } = useSession({ required: true });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleComment: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setComment(e.target.value);

  async function createComment(postId: string) {
    try {
      setLoading(true);
      const token: any = data?.user;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}/comment`,
        {
          method: "post",
          headers: {
            authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );

      setLoading(false);
      setComment("");
      setError("");
      if (res.status === 201) router.refresh();
      else setError("Failed");
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  }

  return (
    <div className="flex flex-col gap-2 justify-between mb-4">
      <textarea
        className="bg-black w-full rounded-lg p-2 outline-none border-2 border-black focus:border-2 focus:border-green"
        placeholder="create comment ..."
        value={comment}
        onChange={handleComment}
      />
      <div>
        {error && <p className="text-red pb-2">{error}</p>}
        <button
          className="py-2 px-3 bg-green hover:bg-hgreen rounded-lg text-sm"
          onClick={(e) => createComment(postId)}
        >
          {!loading ? <p>Comment</p> : <Loader />}
        </button>
      </div>
    </div>
  );
}
