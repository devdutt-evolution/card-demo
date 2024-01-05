import { PostComment } from "@/types/type.d";
import Link from "next/link";
import Comment from "@/components/Comment";

export default async function Post({ params }: { params: { postId: string } }) {
  const fetchPostDetail = async (postId: string) => {
    let data = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}`);
    let post: { post: PostComment } = await data.json();

    return post.post;
  };
  const data: PostComment = await fetchPostDetail(params.postId);

  return (
    <div className="flex flex-col w-3/5 text-white mx-auto h-max">
      {data && Object.keys(data).length > 0 ? (
        <div className="bg-card rounded-lg py-6 px-8 m-2">
          <h2 className="text-2xl pb-5 font-bold">{data?.title}</h2>
          <p>{data?.body}</p>
          <div className="border-2 border-divider my-8"></div>
          <Comment comments={data?.comments} />
          <Link href="/posts">
            <button className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg">
              &nbsp;Back&nbsp;
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-card rounded-lg py-6 px-8 m-2 text-2xl h-[calc(100vh-130px)] flex gap-2 justify-center items-center">
          <Link href="/posts">
            <p className="py-1 px-3 rounded-lg bg-green">&larr;</p>
          </Link>
          <p>No Such Post</p>
        </div>
      )}
    </div>
  );
}
