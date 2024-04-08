import { DateTime } from "luxon";
import Link from "next/link";
import CustomLike from "@/components/Like";
import CommentIcon from "@/components/icons/Comment";
import { REACTIONS } from "@/utils/consts";
import { Post } from "@/types/type.d";

type Props = { post: Post };

export default function PostCard(props: Props) {
  const { post } = props;
  let parsedDate;
  if (post.publishAt && post.publishAt > 0)
    parsedDate = DateTime.fromMillis(post.publishAt);

  return (
    <div
      key={post.body}
      className='bg-card hover:border-2 hover:border-green hover:shadow-sm hover:shadow-green px-8 py-6 border-2 border-card rounded-lg'
    >
      <Link className='w-fit' href={`/user/${post.userId}`}>
        <div className='flex justify-between'>
          <h2 className='text-green text-2xl'>{post.user?.username}</h2>
          {parsedDate && <h3>{parsedDate?.toRelative()}</h3>}
        </div>
        <div className='flex justify-between items-start'>
          <h3 className='mb-4 text-sm'>{post.user?.name}</h3>
          {post.isEdited && <p className='text-white/60 text-sm'>Edited</p>}
        </div>
      </Link>
      <div>
        <Link href={`/post/${post._id}`}>
          <h3 className='pb-4 text-xl hover:text-green'>{post.title}</h3>
        </Link>
        <div
          className='ProseMirror nono pb-4'
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </div>
      <div className='w-min flex gap-4 p-1 bg-black rounded-full'>
        <CustomLike
          reactionType={post?.userLike?.reactionType || REACTIONS.UNLIKE}
          likeCount={post.numberOfLikes}
          postId={post._id}
          variant='post'
          commentId=''
        />
        <Link
          className='w-min hover:bg-card flex gap-3 p-1 px-2 rounded-full'
          href={`/post/${post._id}`}
        >
          <CommentIcon />
          <p className='text-md'>{post.commentCount}</p>
        </Link>
      </div>
    </div>
  );
}
