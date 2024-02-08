import type { Comment } from "@/types/type.d";
import { transformText } from "../commentUtils";
import CustomLike from "@/components/Like";
import { REACTIONS } from "@/utils/consts";
import Link from "next/link";

export default function Comment({ comment }: { comment: Comment }) {
  const commentBody = transformText(comment.body);
  const userName = comment?.username;
  const reactionType = comment?.userLike?.reactionType || REACTIONS.UNLIKE;
  const customLikeVarient = "comment";

  return (
    <div
      key={comment._id}
      id={comment._id}
      className="bg-divider rounded-lg p-3"
    >
      <h4 className="text-l font-bold ">
        <Link href={`/user/${comment.userId}`}>@{userName}</Link>
      </h4>
      <div className="py-3" dangerouslySetInnerHTML={{ __html: commentBody }} />
      <CustomLike
        commentId={comment._id}
        reactionType={reactionType}
        likeCount={comment.numberOfLikes}
        postId={comment.postId}
        varient={customLikeVarient}
      />
    </div>
  );
}
