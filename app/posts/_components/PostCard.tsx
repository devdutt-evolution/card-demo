import { DateTime } from "luxon";
import Link from "next/link";
import CustomLike from "@/components/Like";
import CommentIcon from "@/components/icons/Comment";
import { REACTIONS } from "@/utils/consts";
import { Post } from "@/types/type.d";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { reportPost } from "../pageUtils";

type Props = { post: Post };
type FormData = {
  reason: string;
};

export default function PostCard(props: Props) {
  const { post } = props;
  let parsedDate;
  if (post.publishAt && post.publishAt > 0)
    parsedDate = DateTime.fromMillis(post.publishAt);

  const { data: authData } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, setFocus, resetField } = useForm<FormData>();

  useEffect(() => {
    setFocus("reason");
  }, [setFocus]);

  function handleClick() {
    setOpen(true);
  }

  function toggleModal() {
    setOpen((p) => !p);
  }

  async function Report(data: FormData) {
    setLoading(true);
    const [_, error] = await reportPost(
      post._id,
      data.reason,
      authData?.user.token as string
    );
    if (error) {
      setError("Failed to report");
    } else {
      toggleModal();
      resetField("reason");
      setError("");
    }
    setLoading(false);
  }

  return (
    <>
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
        <div className='flex justify-between'>
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
          <button
            className='px-3 py-2 bg-red rounded-full text-center hover:shadow-sm hover:shadow-slate-50'
            onClick={handleClick}
          >
            Report
          </button>
        </div>
      </div>
      {open && (
        <Modal open={open} toggle={toggleModal}>
          <form
            noValidate
            onSubmit={handleSubmit(Report)}
            className='py-8 px-10 bg-card rounded-lg min-w-[500px]'
          >
            <textarea
              className='min-w-72 min-h-32 resize bg-divider outline-none focus:outline-green w-full px-4 py-2 text-[#fff] rounded-lg tracking-wide'
              placeholder='Reason to report'
              {...register("reason", { required: false })}
            />
            {error && <p className='text-red'>{error}</p>}
            <div className='flex justify-center mt-4'>
              {loading ? (
                <Loader />
              ) : (
                <button className='px-3 py-2 rounded-lg bg-green text-white'>
                  Report
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
