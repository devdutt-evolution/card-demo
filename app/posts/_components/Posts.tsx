"use client";

import Link from "next/link";
import type { Post } from "@/types/type.d";
import { DateTime } from "luxon";
import CustomLike from "@/components/Like";
import CommentIcon from "@/components/icons/Comment";
import AddPost from "./AddPost";
import Search from "./Search";
import Filter from "./Filter";
import Loader from "@/components/Loader";
import { REACTIONS, SORT_FIELD, SORT_ORDER } from "@/utils/consts";
import { useSortAndFilter } from "./sortAndFilderHook";

export default function InfinitePosts({ posts }: { posts: Post[] }) {
  const {
    search,
    setSearch,
    isAsc,
    setIsAsc,
    sortWith,
    setSortWith,
    userId,
    setUserId,
    loading,
    data
  } = useSortAndFilter(posts);

  return (
    <>
      <AddPost />
      <Search setSearch={setSearch} search={search} />
      <Filter
        fieldName={sortWith as SORT_FIELD}
        setFieldName={setSortWith}
        orderBy={isAsc as SORT_ORDER}
        setOrderBy={setIsAsc}
        userId={userId}
        setUserId={setUserId}
      />
      <div className='flex flex-col w-full mx-auto gap-2'>
        {data?.length > 0 &&
          !loading &&
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
                    <h2 className='text-green text-2xl'>
                      {post.user?.username}
                    </h2>
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
    </>
  );
}
