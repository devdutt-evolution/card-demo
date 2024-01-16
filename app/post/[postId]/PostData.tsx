import { options } from "@/app/api/auth/[...nextauth]/options";
import CommentLike from "./CommentLike";
import { PostComment } from "@/types/type.d";
import { getServerSession } from "next-auth";
import Link from "next/link";
import AddComment from "./AddComment";

async function fetchPostDetail(postId: string, token: string) {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/posts/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const post: { post: PostComment } = await data.json();

    return post.post;
  } catch (err) {}
}

export default async function PostData({ postId }: { postId: string }) {
  const session = await getServerSession(options);

  const token = session?.user as any;
  const postData = await fetchPostDetail(postId, token.token);

  return (
    <div className="bg-card rounded-lg py-6 px-8 m-2">
      <h2 className="text-2xl pb-5 font-bold">{postData?.title}</h2>
      <div
        className="ProseMirror nono"
        dangerouslySetInnerHTML={{ __html: postData?.body || <p></p> }}
      ></div>
      <div className="border-2 border-divider my-4"></div>
      {/* create comment */}
      <AddComment postId={postId} />
      {/* comments list */}
      {postData?.comments && postData.comments.length > 0 ? (
        postData.comments?.map((comment) => {
          return (
            <div
              key={comment._id}
              className="bg-divider my-5 py-3 px-5 rounded-lg"
            >
              <h4 className="text-l font-bold">
                <a href={`to:${comment.email}`}>
                  {comment?.name.split(" ")[0] || comment.name}
                </a>
              </h4>
              <p className="text-sm text-place">{comment.email}</p>
              <p className="py-3">{comment.body}</p>
              <CommentLike
                token={token.token}
                liked={comment.likedByUser}
                totalLikes={comment.numberOfLikes}
                id={comment._id}
              />
            </div>
          );
        })
      ) : (
        <div className="bg-divider my-4 py-3 px-5 rounded-lg">No Comments</div>
      )}
      <Link href="/posts">
        <button className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg">
          &nbsp;Back&nbsp;
        </button>
      </Link>
    </div>
  );
}
