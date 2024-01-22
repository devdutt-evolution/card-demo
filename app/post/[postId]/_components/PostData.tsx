import { options } from "@/utils/options";
import { getServerSession } from "next-auth";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { fetchPostDetail } from "../commentUtils";

export default async function PostData({ postId }: { postId: string }) {
  const session = await getServerSession(options);

  const token = session?.user as any;
  const postData = await fetchPostDetail(postId, token.token);

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{postData?.title}</h2>
      <div
        className="ProseMirror nono"
        dangerouslySetInnerHTML={{ __html: postData?.body || <p></p> }}
      ></div>
      <hr className="border-2 border-divider my-4" />
      {/* create comment */}
      <AddComment postId={postId} />
      {/* comments list */}
      <div className="my-4 flex gap-2 flex-col">
        {postData?.comments && postData.comments.length > 0 ? (
          postData.comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        ) : (
          <div className="bg-divider py-3 px-5 rounded-lg">No Comments</div>
        )}
      </div>
    </>
  );
}
