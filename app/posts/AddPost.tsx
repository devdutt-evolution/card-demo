"use client";
import { ChangeEventHandler, useState } from "react";
import Modal from "../../components/Modal";
import PostHook from "./PostHook";
import TextRich from "@/components/textRich/TextRich";

export default function AddPost({ setCust }: { setCust: Function }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isSchedule, setIsSchedule] = useState(false);
  const [schedule, setSchedule] = useState(new Date());
  // const [body, setBody] = useState("");
  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value);
  // const changeBody: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
  //   setBody(e.target.value);

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
          <form className="pt-[40px] px-8 pb-1 rounded-lg bg-card bg-opacity-80 h-max flex flex-col items-center gap-4">
            <input
              className="outline-none focus:outline-green bg-divider p-2 font-[#FFF] rounded-lg w-full"
              placeholder="Post Title"
              type="text"
              value={title}
              onChange={changeTitle}
            />
            <div className=" bg-divider rounded-lg px-2 w-full">
              <TextRich />
            </div>
            {/* <textarea
              className="bg-divider p-2 font-[#FFF] rounded-lg h-[12vh] w-full"
              placeholder="Post Body"
              value={body}
              onChange={changeBody}
            /> */}
            <div className="flex gap-2 w-full">
              <input
                className="outline-none focus:outline-green accent-green hover:bg-green hover:bg-opacity-50"
                type="checkbox"
                id="isSchedule"
                onChange={(e) => setIsSchedule(e.target.checked)}
              />
              <label htmlFor="isSchedule">Schedule</label>
            </div>
            {isSchedule && (
              <input
              className="focus:outline-green text-place outline-none rounded-lg p-2 w-full bg-divider"
                type="datetime-local"
                placeholder=""
                onChange={(e) => setSchedule(new Date(e.target.value))}
              />
            )}
            <PostHook
              title={title}
              // body={body}
              isSchedule={isSchedule}
              schedule={schedule}
              toggle={() => {
                setOpen((t) => !t);
                setCust((t: boolean) => !t);
                setTitle("");
                setIsSchedule(false);
                setSchedule(new Date());
                // setBody("");
              }}
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
