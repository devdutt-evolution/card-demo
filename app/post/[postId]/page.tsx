import { getServerSession } from "next-auth";
import PostData from "./_components/PostData";
import { options } from "@/utils/options";
import { fetchPostDetail } from "./helper";

export const revalidate = 0;

export default async function Post({
  params,
  searchParams,
}: {
  params: { postId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(options);
  const postData = await fetchPostDetail(params.postId, session?.user?.token);
  let commentId, replyId;
  if (searchParams) {
    commentId = searchParams.commentId;
    replyId = searchParams.replyId;
  }

  return (
    session?.user && (
      <PostData
        postDetails={postData.post}
        userSession={session.user}
        commentId={commentId}
        replyId={replyId}
      />
    )
  );
}
