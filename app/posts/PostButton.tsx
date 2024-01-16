"use client";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";

export default function PostHook({
  title,
  // body,
  isSchedule,
  schedule,
  token,
  toggle,
}: {
  title: string;
  // body: string;
  isSchedule: boolean;
  schedule: Date;
  token: string;
  toggle: () => void;
}) {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSent(false);
    setError("");
  }, [title, isSchedule, schedule]);
  const createPost: FormEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let elems = document.querySelector(
      ".ProseMirror:not(.nono)"
    ) as HTMLElement;

    const postData = {
      title,
      body: elems.innerHTML,
      tobePublished: isSchedule,
      publishAt: isSchedule ? schedule.getTime() : 0,
    };
    setSent(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/posts`, postData, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
        <div className="flex justify-center items-center w-full mb-4">
          <Loader />
        </div>
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
