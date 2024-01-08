"use client";
import { Comments } from "@/types/type.d";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

export default function Comment({ comments }: { comments: Comments }) {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(comments);
  const [token, setToken] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    setToken(token as string);
  }, []);
  useEffect(() => {
    setData(comments);
  }, [comments]);

  const handleComment: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setComment(e.target.value);

  const createComment: MouseEventHandler = (e) => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${params.postId}/comment`,
        {
          body: comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setLoading(false);
        setComment("");
        setError("");
        router.refresh();
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.name == "AxiosError")
          setError(err.response.data.message);
        else setError(err.toString());
      });
  };

  return (
    <>
      <div className="h-min flex flex-col gap-4 justify-between">
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
            onClick={createComment}
          >
            {!loading ? <p>Comment</p> : <p>Posting..</p>}
          </button>
        </div>
      </div>
      {data && data.length > 0 ? (
        data?.map((comment) => {
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
        })
      ) : (
        <div className="bg-divider my-4 py-3 px-5 rounded-lg">No Comments</div>
      )}
    </>
  );
}
