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
    <ul className="rounded-full flex gap-3 w-max p-2 bg-black">
      <li
        className="rounded-full delay-75 hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          onReact(1, REACTIONS.HEART);
        }}
      >
        <OutlineLike />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          onReact(1, REACTIONS.LIKE);
        }}
      >
        <Thumb />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          onReact(1, REACTIONS.HAPPY);
        }}
      >
        <Happy />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300 hover:[--gcolor:#1496d9]"
        onClick={(e) => {
          onReact(1, REACTIONS.VERIFIED);
        }}
      >
        <Verified />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          onReact(1, REACTIONS.SAD);
        }}
      >
        <Sad />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300 hover:[--gcolor:#F75A68]"
        onClick={(e) => {
          onReact(1, REACTIONS.ANGRY);
        }}
      >
        <Angry />
      </li>
    </ul>
  );
}
