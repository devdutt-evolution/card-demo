import AddComment from "./AddComment";
import Comment from "./Comment";
import { type PostComment } from "@/types/type.d";

export default async function PostData({
  postDetails,
}: {
  postDetails: PostComment;
}) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{postDetails?.title}</h2>
      <div
        className="ProseMirror nono"
        dangerouslySetInnerHTML={{ __html: postDetails?.body || <p></p> }}
      />
      <hr className="border-2 border-divider my-4" />
      <AddComment />
      <div className="my-4 flex gap-2 flex-col">
        {Array.isArray(postDetails?.comments) ? (
          postDetails.comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        ) : (
          <div className="bg-divider py-3 px-5 rounded-lg">No Comments</div>
        )}
      </div>
    </>
  );
}
