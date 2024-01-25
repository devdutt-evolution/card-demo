import { likeAction } from "@/utils/action";
import {
  Angry,
  Happy,
  OutlineLike,
  Sad,
  Thumb,
  Verified,
} from "./icons/Reaction";

export default function AvailableReactions({
  optimisticUpdate,
  postId,
  varient,
  commentId,
}: {
  postId: string;
  varient: string;
  commentId: string;
  optimisticUpdate: Function;
}) {
  return (
    <ul className="rounded-full flex gap-3 w-max p-2 bg-black">
      <li
        className="rounded-full delay-75 hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          optimisticUpdate({
            likeCount: 1,
            reaction: "heart",
          });
          likeAction(postId, "heart", varient, commentId);
        }}
      >
        <OutlineLike />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300"
        onClick={async (e) => {
          optimisticUpdate({
            likeCount: 1,
            reaction: "like",
          });
          await likeAction(postId, "like", varient, commentId);
        }}
      >
        <Thumb />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          optimisticUpdate({
            likeCount: 1,
            reaction: "happy",
          });
          likeAction(postId, "happy", varient, commentId);
        }}
      >
        <Happy />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300 hover:[--gcolor:#1496d9]"
        onClick={(e) => {
          optimisticUpdate({
            likeCount: 1,
            reaction: "verified",
          });
          likeAction(postId, "verified", varient, commentId);
        }}
      >
        <Verified />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300"
        onClick={(e) => {
          optimisticUpdate({
            likeCount: 1,
            reaction: "sad",
          });
          likeAction(postId, "sad", varient, commentId);
        }}
      >
        <Sad />
      </li>
      <li
        className="rounded-full hover:scale-150 transition-all duration-300 hover:[--gcolor:#F75A68]"
        onClick={(e) => {
          optimisticUpdate({
            likeCount: 1,
            reaction: "angry",
          });
          likeAction(postId, "angry", varient, commentId);
        }}
      >
        <Angry />
      </li>
    </ul>
  );
}
