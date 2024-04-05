"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post } from "@/types/type.d";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import CustomLike from "@/components/Like";
import CommentIcon from "@/components/icons/Comment";
import { getMorePosts } from "@/utils/action";
import Loader from "@/components/Loader";
import { REACTIONS, SORT_FIELD, SORT_ORDER } from "@/utils/consts";

export default function InfinitePosts({ posts }: { posts: Post[] }) {
  const params = useSearchParams();
  const [data, setData] = useState<Post[]>(posts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const sortWith = params.get("field") || SORT_FIELD.time;
  const isAsc = params.get("order") || SORT_ORDER.desc;
  const userId = params.get("userId");
  const search = params.get("q") || "";

  useEffect(() => {
    if (!userId) {
      const scrollHandler = (e: Event) => {
        if (!hasMore) {
          return;
        }
        const target = e.target as Document;
        const doc = target.documentElement;
        const scrollHeight = doc.scrollHeight;
        const currentHeight = doc.scrollTop + window.innerHeight;

        if (currentHeight + 1 > scrollHeight) {
          setLoading(true);
          loadMore();
        }
      };

      window.addEventListener("scroll", scrollHandler);

      return () => window.removeEventListener("scroll", scrollHandler);
    }
  });

  useEffect(() => {
    setData(posts);
  }, [posts]);

  async function loadMore() {
    if (hasMore) {
      let data: Post[] = await getMorePosts(page, sortWith, isAsc, search);

      if (data?.length < 9) setHasMore(false);
      setPage((page) => page + 1);
      setData((prevPosts) => [...prevPosts, ...data]);
    }
    setLoading(false);
  }

  return (
    <div className='flex flex-col w-full mx-auto gap-2'>
      {data?.length > 0 &&
        data?.map((post) => {
          let diff = post.publishAt;
          let luxonDate;
          if (diff && diff > 0) luxonDate = DateTime.fromMillis(diff);

          return (
            <div
              key={post.body}
              className='bg-card hover:border-2 hover:border-green hover:shadow-sm hover:shadow-green px-8 py-6 border-2 border-card rounded-lg'
            >
              <Link className='w-fit' href={`/user/${post.userId}`}>
                <div className='flex justify-between'>
                  <h2 className='text-green text-2xl'>{post.user?.username}</h2>
                  {luxonDate && <h3>{luxonDate?.toRelative()}</h3>}
                </div>
                <div className='flex justify-between items-start'>
                  <h3 className='mb-4 text-sm'>{post.user?.name}</h3>
                  {post.isEdited && (
                    <p className='text-white/60 text-sm'>Edited</p>
                  )}
                </div>
              </Link>
              <div>
                <Link href={`/post/${post._id}`}>
                  <h3 className='pb-4 text-xl hover:text-green'>
                    {post.title}
                  </h3>
                </Link>
                <div
                  className='ProseMirror nono pb-4'
                  dangerouslySetInnerHTML={{ __html: post.body }}
                />
              </div>
              <div className='w-min flex gap-4 p-1 bg-black rounded-full'>
                <CustomLike
                  reactionType={
                    post?.userLike?.reactionType || REACTIONS.UNLIKE
                  }
                  likeCount={post.numberOfLikes}
                  postId={post._id}
                  varient='post'
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
        })}
      {loading && (
        <div className='h-[200px] flex justify-center items-center w-full'>
          <Loader />
        </div>
      )}
      {data.length == 0 && (
        <div className='bg-card px-3 py-4 border-2 border-black rounded-lg'>
          No Posts
        </div>
      )}
    </div>
  );
}
