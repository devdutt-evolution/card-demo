import { REACTIONS } from "@/utils/consts";
import {
  Angry,
  Happy,
  OutlineLike,
  Sad,
  Thumb,
  Verified,
} from "./icons/Reaction";

export default function AvailableReactions({
  onReact,
}: {
  onReact: (count: number, reaction: REACTIONS) => void;
}) {
  return (
    <ul className="rounded-l-full flex flex-col box-content">
      <li
        className="rounded-full hover:scale-150 p-1 transition-all duration-300 w-min translate-x-[2.5rem] translate-y-[0.5rem]"
        onClick={(e) => {
          onReact(1, REACTIONS.HEART);
        }}
      >
        <OutlineLike active={true} className="scale-125" />
      </li>
      <li
        className="rounded-full hover:scale-150 p-1 transition-all duration-300 w-min translate-x-[1rem]"
        onClick={(e) => {
          onReact(1, REACTIONS.LIKE);
        }}
      >
        <Thumb active={true} className="scale-125" />
      </li>
      <li
        className="rounded-full hover:scale-150 p-1 transition-all duration-300 w-min translate-x-[0rem] mb-1"
        onClick={(e) => {
          onReact(1, REACTIONS.HAPPY);
        }}
      >
        <Happy active={true} className="scale-125" />
      </li>
      {/* <li
        className="rounded-full hover:scale-150 p-1 transition-all duration-300 w-min translate-x-[0rem]"
        onClick={(e) => {
          onReact(1, REACTIONS.VERIFIED);
        }}
      >
        <Verified />
      </li> */}
      <li
        className="rounded-full hover:scale-150 p-1 transition-all duration-300 w-min translate-x-[1rem]"
        onClick={(e) => {
          onReact(1, REACTIONS.SAD);
        }}
      >
        <Sad active={true} className="scale-125" />
      </li>
      <li
        className="rounded-full hover:scale-150 p-1 transition-all duration-300 w-min translate-x-[2.5rem] translate-y-[-0.5rem]"
        onClick={(e) => {
          onReact(1, REACTIONS.ANGRY);
        }}
      >
        <Angry active={true} className="scale-125" />
      </li>
    </ul>
  );
}
