import { options } from "@/utils/options";
import { getServerSession } from "next-auth";
import { getUserDetails } from "../getUserDetails";
import { notFound } from "next/navigation";
import Image from "next/image";
import Like from "@/components/Like";
import { REACTIONS } from "@/utils/consts";
import Comment from "@/components/icons/Comment";
import Link from "next/link";

export default async function UserDetails({ userId }: { userId: string }) {
  const session = await getServerSession(options);
  const user = await getUserDetails(userId, session?.user?.token);

  if (!user) return notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
      <section className="max-w-60 max-h-60 min-w-48 min-h-48 ">
        <Image
          height={100}
          width={150}
          src={`${process.env.NEXT_PUBLIC_URL_BACKEND}/pictures/${user.picture}`}
          alt="profile picture"
          className="w-full h-full rounded-lg object-center aspect-square"
        />
      </section>
      <section className="">
        <h2 className="text-2xl pb-5 font-bold">{user?.name}</h2>
        <p>username: {user?.username}</p>
        <p>
          email:&nbsp;
          <a href={`to:${user?.email}`} className="hover:text-hgreen">
            {user?.email}
          </a>
        </p>
        <p>
          phone:&nbsp;
          <a href={`tel:${user?.phone}`} className="hover:text-hgreen">
            {user?.phone}
          </a>
        </p>
        <p>
          website:&nbsp;
          <a href={user?.website} className="hover:text-hgreen">
            {user?.website}
          </a>
        </p>
      </section>
      <section className="">
        {user?.company && (
          <div className="flex flex-col gap-1 mb-6 mt-2 sm:m-0">
            <h3 className="text-2xl mb-2 text-hgreen">Company</h3>
            <p>name:&nbsp;{user.company?.name}</p>
            <p>catchPhrase:&nbsp;{user.company?.catchPhrase}</p>
            <p>bs:&nbsp;{user.company?.bs}</p>
          </div>
        )}
      </section>
      <section className="">
        {user?.address && (
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl mb-2 text-hgreen">Address</h3>
            <p>street:&nbsp;{user.address?.street}</p>
            <p>suite:&nbsp;{user.address?.suite}</p>
            <p>city:&nbsp;{user.address?.city}</p>
            <p>zipcode:&nbsp;{user.address?.zipcode}</p>
          </div>
        )}
      </section>
      <section className="md:col-span-2 flex flex-col gap-2">
        <h2 className="my-2 text-2xl text-green border-b-2 border-b-green rounded-sm">
          Recent Posts By {user.name}
        </h2>
        {user.posts?.map((post) => (
          <div
            className="rounded-lg border-2 border-divider hover:border-green p-4"
            key={post._id}
          >
            <Link
              href={`/posts/${post._id}`}
              className="font-bold text-xl hover:text-green cursor-pointer block mb-4"
            >
              {post.title}
            </Link>
            <div
              className="ProseMirror nono pb-4"
              dangerouslySetInnerHTML={{ __html: post.body }}
            ></div>
            <div className="flex gap-3 bg-black rounded-full w-max p-1 justify-center items-center">
              <Like
                likeCount={post.likes}
                reactionType={post.userLike?.reactionType || REACTIONS.UNLIKE}
                varient="post"
                postId={post._id}
              />
              <Link
                href={`/posts/${post._id}`}
                className="flex gap-1 px-2 p-1 hover:cursor-pointer hover:bg-card rounded-full"
              >
                <Comment />
                <p>{post.comments}</p>
              </Link>
            </div>
          </div>
        ))}
        <Link
          href={`/posts?userId=${user._id}`}
          className="underline text-green text-right hover:cursor-pointer"
        >
          More Posts from {user.name}
        </Link>
      </section>
    </div>
  );
}
