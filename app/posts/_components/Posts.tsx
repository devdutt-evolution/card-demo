"use client";

import type { Post } from "@/types/type.d";
import AddPost from "./AddPost";
import Search from "./Search";
import Filter from "./Filter";
import Loader from "@/components/Loader";
import { SORT_FIELD, SORT_ORDER } from "@/utils/consts";
import { useSortAndFilter } from "./sortAndFilterHook";
import PostCard from "./PostCard";

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
    data,
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
        {loading ? (
          <div className='h-[200px] flex justify-center items-center w-full'>
            <Loader />
          </div>
        ) : data?.length > 0 ? (
          data?.map((post) => <PostCard post={post} key={post._id} />)
        ) : (
          <div className='bg-card px-3 py-4 border-2 border-black rounded-lg'>
            No Posts
          </div>
        )}
      </div>
    </>
  );
}
