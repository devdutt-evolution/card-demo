import {
  Angry,
  Happy,
  OutlineLike,
  Sad,
  Thumb,
  Verified,
} from "./icons/Reaction";

type Reaction = "like" | "heart" | "sad" | "happy" | "verified" | "angry";

export default function AvailableReactions({
  onReact,
}: {
  onReact: (count: number, reaction: Reaction) => void;
}) {
  return (
    <ul className="rounded-full flex gap-3 w-max p-2 bg-black">
      <li
        className="rounded-full delay-75 hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          onReact(1, "heart");
        }}
      >
        <OutlineLike />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          onReact(1, "like");
        }}
      >
        <Thumb />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          onReact(1, "happy");
        }}
      >
        <Happy />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300 hover:[--gcolor:#1496d9]"
        onClick={(e) => {
          onReact(1, "verified");
        }}
      >
        <Verified />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          onReact(1, "sad");
        }}
      >
        <Sad />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300 hover:[--gcolor:#F75A68]"
        onClick={(e) => {
          onReact(1, "angry");
        }}
      >
        <Angry />
      </li>
    </ul>
  );
}
