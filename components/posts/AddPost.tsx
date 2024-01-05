"use client";
import { ChangeEventHandler, useState } from "react";
import Modal from "./Modal";
import PostHook from "./PostHook";

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value);
  const changeBody: ChangeEventHandler<HTMLInputElement> = (e) =>
    setBody(e.target.value);

  return (
    <div className="bg-card h-[100px] rounded-lg mb-3 flex flex-col items-center justify-center">
      <div
        className="flex gap-2 bg-divider w-4/5 h-2/4 rounded-lg items-center justify-center text-place
      cursor-pointer hover:text-[#FFF]"
        onClick={() => setOpen((t) => !t)}
      >
        <p className="h-max">
          <span className="text-2xl">+</span>{" "}
          <span className="text-xl">Add Post</span>
        </p>
      </div>

      {open && (
        <Modal open={open} toggle={() => setOpen((t) => !t)}>
          <form className="pt-[40px] rounded-lg bg-card bg-opacity-80 h-max flex flex-col items-center gap-4">
            <input
              className="bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
              placeholder="Post Title"
              type="text"
              value={title}
              onChange={changeTitle}
            />
            <input
              className="bg-divider p-2 font-[#FFF] rounded-lg block w-3/5"
              placeholder="Post Body"
              type="text"
              value={body}
              onChange={changeBody}
            />
            <PostHook
              title={title}
              body={body}
              toggle={() => setOpen((t) => !t)}
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
