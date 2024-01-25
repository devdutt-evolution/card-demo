import { Comment } from "@/types/type.d";
import { transformText } from "../commentUtils";
import CustomLike from "@/components/Like";

export default function Comment({
  comment,
  postId,
}: {
  comment: Comment;
  postId: string;
}) {
  const commentBody = transformText(comment.body);
  return (
    <div
      key={comment._id}
      id={comment._id}
      className="bg-divider rounded-lg p-3"
    >
      <h4 className="text-l font-bold ">
        <a href={`to:${comment.email}`}>
          {comment?.name.split(" ")[0] || comment.name}
        </a>
      </h4>
      <p className="text-sm text-place">{comment.email}</p>
      <div className="py-3" dangerouslySetInnerHTML={{ __html: commentBody }} />
      <CustomLike
        commentId={comment._id}
        likeCount={comment.numberOfLikes}
        liked={comment.likedByUser}
        postId={postId}
        varient="comment"
      />
    </div>
  );
}
