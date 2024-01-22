import { Comment } from "@/types/type.d";
import { transformText } from "../commentUtils";
import CommentLike from "./CommentLike";

export default function Comment({
  comment,
}: {
  comment: Comment;
}) {
  const commentBody = transformText(comment.body);
  return (
    <div key={comment._id} className="bg-divider rounded-lg p-3">
      <h4 className="text-l font-bold ">
        <a href={`to:${comment.email}`}>
          {comment?.name.split(" ")[0] || comment.name}
        </a>
      </h4>
      <p className="text-sm text-place">{comment.email}</p>
      <div className="py-3" dangerouslySetInnerHTML={{ __html: commentBody }} />
      <CommentLike
        initLiked={comment.likedByUser}
        totalLikes={comment.numberOfLikes}
        id={comment._id}
      />
    </div>
  );
}
