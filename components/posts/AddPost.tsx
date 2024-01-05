"use client";
import { ChangeEventHandler, useState } from "react";
import Modal from "./Modal";
import PostHook from "./PostHook";

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isSchedule, setIsSchedule] = useState(false);
  const [schedule, setSchedule] = useState(new Date());
  const [body, setBody] = useState("");
  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value);
  const changeBody: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
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
            <textarea
              className="bg-divider p-2 font-[#FFF] rounded-lg block h-[12vh] w-3/5"
              placeholder="Post Body"
              value={body}
              onChange={changeBody}
            />
            <div className="flex gap-2 justify-start w-3/5">
              <input
                type="checkbox"
                id="isSchedule"
                className="accent-green hover:bg-green hover:bg-opacity-50"
                onChange={(e) => setIsSchedule(e.target.checked)}
              />
              <label htmlFor="isSchedule">Schedule</label>
            </div>
            {isSchedule && (
              <input
                type="datetime-local"
                className="text-place outline-none rounded-lg p-2 bg-divider"
                onChange={(e) => setSchedule(new Date(e.target.value))}
              />
            )}
            <PostHook
              title={title}
              body={body}
              isSchedule={isSchedule}
              schedule={schedule}
              toggle={() => {
                setOpen((t) => !t);
                setTitle("");
                setIsSchedule(false);
                setSchedule(new Date());
                setBody("");
              }}
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
