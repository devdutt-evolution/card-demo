"use client";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostHook({
  title,
  body,
  isSchedule,
  schedule,
  toggle,
}: {
  title: string;
  body: string;
  isSchedule: boolean;
  schedule: Date;
  toggle: () => void;
}) {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSent(false);
    setError("");
  }, [title, body]);
  const createPost: FormEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const postData = {
      title,
      body,
      tobePublished: isSchedule,
      publishAt: isSchedule ? schedule.getTime() : 0
    };
    // mutation.mutate(postData);
    setSent(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/posts`, postData)
      .then((data) => {
        setError("");
        router.refresh();
        toggle();
      })
      .catch((err) => {
        if (err.name == "AxiosError") setError(err.response.data.message);
        setSent(false);
      });
  };

  return (
    <>
      {sent ? (
        <p className="text-green px-4 py-2 rounded-lg mb-4">Creating Post</p>
      ) : (
        <>
          {error != "" ? (
            <>
              <p className="text-red px-4 py-2 rounded-lg mb-2">{error}</p>
            </>
          ) : (
            <button
              className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg mb-4"
              type="submit"
              onClick={createPost}
            >
              Post
            </button>
          )}
        </>
      )}
    </>
  );
}
