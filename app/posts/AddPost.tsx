"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import TextRich from "@/components/textRich/TextRich";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

async function sendPostRequest(
  postData: {
    title: string;
    body: string;
    tobePublished: boolean;
    publishAt: number;
  },
  token: any
) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/posts`, {
      method: "post",
      headers: {
        authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (res.status == 201) return ["success", null];
    return [null, "Failed"];
  } catch (err) {
    return [null, err as string];
  }
}

export default function AddPost() {
  const router = useRouter();
  const { data } = useSession({ required: true });
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isSchedule, setIsSchedule] = useState(false);
  const [schedule, setSchedule] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
    setError("");
  }, [title, isSchedule, schedule]);

  async function createPost() {
    let elems = document.querySelector(
      ".ProseMirror:not(.nono)"
    ) as HTMLElement;

    const postData = {
      title,
      body: elems.innerHTML,
      tobePublished: isSchedule,
      publishAt: isSchedule ? schedule.getTime() : 0,
    };
    setLoading(true);
    let result = await sendPostRequest(postData, data?.user);
    setLoading(false);
    if (result[0]) {
      setError("");
      router.refresh();
      setTitle("");
      setIsSchedule(false);
      setSchedule(new Date());
      setOpen((t) => !t);
    } else {
      setError(result[1]);
    }
  }

  return (
    <div className="bg-card h-[100px] rounded-lg flex items-center justify-center">
      <div
        className="flex gap-2 bg-divider w-4/5 h-2/4 rounded-lg items-center justify-center text-place cursor-pointer hover:text-[#FFF] border-2 border-dashed"
        onClick={() => setOpen((t) => !t)}
      >
        <p className="h-max">
          <span className="text-2xl">+</span>{" "}
          <span className="text-xl">Create Post</span>
        </p>
      </div>

      {open && (
        <Modal
          open={open}
          toggle={() => {
            setOpen((t) => !t);
            setError("");
            setTitle("");
            setIsSchedule(false);
            setSchedule(new Date());
          }}
        >
          <form className="pt-[40px] px-8 pb-1 rounded-lg bg-card bg-opacity-80 h-max flex flex-col items-center gap-4">
            <input
              className="outline-none focus:outline-green bg-divider p-2 font-[#FFF] rounded-lg w-full"
              placeholder="Post Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className=" bg-divider w-full px-2 rounded-lg">
              <TextRich />
            </div>
            <div className="flex w-full gap-2">
              <input
                className="focus:outline-green accent-green hover:bg-green hover:bg-opacity-50 outline-none"
                type="checkbox"
                id="isSchedule"
                onChange={(e) => setIsSchedule(e.target.checked)}
              />
              <label htmlFor="isSchedule">Schedule</label>
            </div>
            {isSchedule && (
              <input
                className="focus:outline-green text-place bg-divider w-full p-2 rounded-lg outline-none"
                type="datetime-local"
                placeholder=""
                onChange={(e) => setSchedule(new Date(e.target.value))}
              />
            )}
            {loading ? (
              <div className="flex items-center justify-center w-full mb-4">
                <Loader />
              </div>
            ) : (
              <>
                {error ? (
                  <p className="text-red px-4 py-2 mb-2 rounded-lg">{error}</p>
                ) : (
                  <button
                    className="bg-green hover:bg-hgreen px-4 py-2 mb-4 rounded-lg"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      createPost();
                    }}
                  >
                    Post
                  </button>
                )}
              </>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
}
