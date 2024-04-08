import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { options } from "@/utils/options";
import { REACTIONS } from "@/utils/consts";
import Like from "@/components/Like";
import Comment from "@/components/icons/Comment";
import { getUserDetails } from "../getUserDetails";

export default async function UserDetails({ userId }: { userId: string }) {
  const session = await getServerSession(options);
  const user = await getUserDetails(userId, session?.user?.token);

  if (!user) return notFound();

  return (
    <div className='flex flex-col gap-4'>
      <section className='flex gap-5'>
        <Image
          height={100}
          width={150}
          src={`${process.env.NEXT_PUBLIC_URL_BACKEND}/pictures/${user.picture}`}
          alt='profile picture'
          className='rounded-lg object-cover aspect-square'
        />
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold mb-2'>{user?.name}</h2>
          <p>username: {user?.username}</p>
          <p>
            email:&nbsp;
            <a href={`to:${user?.email}`} className='hover:text-hgreen'>
              {user?.email}
            </a>
          </p>
          <p>
            phone:&nbsp;
            <a href={`tel:${user?.phone}`} className='hover:text-hgreen'>
              {user?.phone}
            </a>
          </p>
        </div>
      </section>
      <section className='md:col-span-2 flex flex-col gap-2'>
        <h2 className='my-2 text-2xl text-green border-b-2 border-b-green rounded-sm'>
          Recent Posts By {user.name}
        </h2>
        {user.posts?.map((post) => (
          <div
            className='rounded-lg border-2 border-divider hover:border-green p-4'
            key={post._id}
          >
            <Link
              href={`/posts/${post._id}`}
              className='font-bold text-xl hover:text-green cursor-pointer block mb-4'
            >
              {post.title}
            </Link>
            <div
              className='ProseMirror nono pb-4'
              dangerouslySetInnerHTML={{ __html: post.body }}
            ></div>
            <div className='flex gap-3 bg-black rounded-full w-max p-1 justify-center items-center'>
              <Like
                likeCount={post.likes}
                reactionType={post.userLike?.reactionType || REACTIONS.UNLIKE}
                variant='post'
                postId={post._id}
              />
              <Link
                href={`/posts/${post._id}`}
                className='flex gap-1 px-2 p-1 hover:cursor-pointer hover:bg-card rounded-full'
              >
                <Comment />
                <p>{post.comments}</p>
              </Link>
            </div>
          </div>
        ))}
        <Link
          href={`/posts?userId=${user._id}`}
          className='underline text-green text-right hover:cursor-pointer'
        >
          More Posts from {user.name}
        </Link>
      </section>
    </div>
  );
}
