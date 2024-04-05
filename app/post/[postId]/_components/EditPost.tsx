"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import TextRich from "@/components/textRich/TextRich";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { sendPutRequest } from "../commentUtils";

export default function EditPost(props: {
  initTitle: string;
  body: string;
  postId: string;
}) {
  const router = useRouter();
  const { data } = useSession({ required: true });
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.initTitle);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
    setError("");
  }, [title]);

  async function editPost() {
    const slate = document.querySelector(
      ".ProseMirror:not(.nono)"
    ) as HTMLElement;

    const postData = {
      title,
      body: slate.innerHTML,
    };
    setLoading(true);
    let result = await sendPutRequest(
      props.postId,
      postData,
      data?.user?.token
    );
    setLoading(false);
    if (result[0]) {
      setError("");
      router.refresh();
      setOpen((t) => !t);
    } else {
      setError(result[1]);
    }
  }

  return (
    <>
      <button
        className='cursor-pointer hover:text-hgreen'
        type='button'
        onClick={() => setOpen((t) => !t)}
      >
        &#9998;
      </button>

      {open && (
        <Modal
          open={open}
          toggle={() => {
            setOpen((t) => !t);
            setError("");
          }}
        >
          <form className='pt-[40px] px-8 pb-1 rounded-lg bg-card bg-opacity-80 h-max flex flex-col items-center gap-4'>
            <input
              className='outline-none focus:outline-green bg-divider p-2 font-[#FFF] rounded-lg w-full'
              placeholder='Post Title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className=' bg-divider w-full px-2 rounded-lg'>
              <TextRich content={props.body} />
            </div>
            {loading ? (
              <div className='flex items-center justify-center w-full mb-4'>
                <Loader />
              </div>
            ) : (
              <>
                {error ? (
                  <p className='text-red px-4 py-2 mb-2 rounded-lg'>{error}</p>
                ) : (
                  <button
                    className='bg-green hover:bg-hgreen px-4 py-2 mb-4 rounded-lg'
                    type='submit'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      editPost();
                    }}
                  >
                    Edit
                  </button>
                )}
              </>
            )}
          </form>
        </Modal>
      )}
    </>
  );
}
