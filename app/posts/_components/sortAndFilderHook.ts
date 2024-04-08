import { Post } from "@/types/type.d";
import { getMorePosts } from "@/utils/action";
import { SORT_FIELD, SORT_ORDER } from "@/utils/consts";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useSortAndFilter = (posts: Post[]) => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(posts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const [sortWith, setSortWith] = useState(
    params.get("field") || SORT_FIELD.time
  );
  const [isAsc, setIsAsc] = useState(params.get("order") || SORT_ORDER.desc);
  const [userId, setUserId] = useState(params.get("userId") || "");
  const [search, setSearch] = useState(params.get("q") || "");

  const optimalGetPosts = useCallback(
    async function getPosts() {
      const data: Post[] = await getMorePosts(1, sortWith, isAsc, search);

      if (data?.length < 9) setHasMore(false);
      setPage(2);

      setData(data && data.length ? [...data] : []);
      setLoading(false);
    },
    [isAsc, sortWith, search]
  );

  async function loadMore() {
    if (hasMore) {
      const data: Post[] = await getMorePosts(page, sortWith, isAsc, search);

      if (data?.length < 9) setHasMore(false);
      setPage((page) => page + 1);
      setData((prevPosts) => [...prevPosts, ...data]);
    }
    setLoading(false);
  }

  // set posts if changed
  useEffect(() => {
    setData(posts);
  }, [posts]);

  // handle infinity scroll
  useEffect(() => {
    if (!userId) {
      const scrollHandler = (e: Event) => {
        if (!hasMore) return;

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

  // set shallow urlParams and fetch posts accordingly
  useEffect(() => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (!isAsc) current.delete("order");
    else current.set("order", isAsc);

    if (!sortWith) current.delete("field");
    else current.set("field", sortWith);

    if (!search) current.delete("q");
    else current.set("q", search);

    const queryString = current.toString();
    window.history.replaceState(null, "Posts", `/posts?${queryString || ""}`);

    setLoading(true);
    optimalGetPosts();
  }, [sortWith, isAsc, userId, search, optimalGetPosts, params]);

  return {
    search,
    setSearch,
    sortWith,
    setSortWith,
    isAsc,
    setIsAsc,
    userId,
    setUserId,
    loading,
    data,
  };
};
