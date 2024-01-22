import PostData from "./_components/PostData";

export default function Post({ params }: { params: { postId: string } }) {
  return <PostData postId={params.postId} />;
}
