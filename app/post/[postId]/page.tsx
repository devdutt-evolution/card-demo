import { getServerSession } from "next-auth";
import PostData from "./_components/PostData";
import { options } from "@/utils/options";
import { fetchPostDetail } from "./helper";

export default async function Post({ params }: { params: { postId: string } }) {
  const session = await getServerSession(options);
  const postData = await fetchPostDetail(params.postId, session?.user?.token);

  return <PostData postDetails={postData.post} />;
}
