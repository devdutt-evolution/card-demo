import { Post } from '@/types/type.d';
import { FetchResponse } from '@/utils/requests';

export interface ReportedPosts {
  _id: string;
  reportedCount: number;
  reports: reportReasonAndUser[];
  post: Post;
}

type reportUser = {
  _id: string;
  username: string;
  name: string;
  picture: string;
};

export type reportReasonAndUser = {
  reason: string;
  userId: string;
  user: reportUser;
};

export async function getReportedPosts(
  token: string
): Promise<[null | ReportedPosts[], null | string]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/reports`, {
    method: 'GET',
    headers: { authorization: `Bearer ${token}` },
  });

  const data = new FetchResponse<{ posts: ReportedPosts[] }>(res)
    .checkAuth()
    .checkNotFound()
    .checkInternal();

  if (data.isError()) {
    const data = await res.json();
    return [null, data.message || 'Failed'];
  }
  const posts = await data.getData();

  return [posts.posts, null];
}

export async function deletePostApi(
  postId: string,
  token: string
): Promise<[string | null, string | null]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/reports/${postId}`,
    {
      method: 'DELETE',
      headers: { authorization: `Bearer ${token}` },
    }
  );

  const data = new FetchResponse<{ posts: ReportedPosts[] }>(res)
    .checkAuth()
    .checkNotFound()
    .checkInternal();

  if (data.isError()) {
    const data = await res.json();
    return [null, data.message || 'Failed'];
  }

  return ['OK', null];
}

export async function discardReportApi(
  postId: string,
  token: string
): Promise<[string | null, string | null]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/reports/${postId}`,
    {
      method: 'PUT',
      headers: { authorization: `Bearer ${token}` },
    }
  );

  const data = new FetchResponse<{ posts: ReportedPosts[] }>(res)
    .checkAuth()
    .checkNotFound()
    .checkInternal();

  if (data.isError()) {
    const data = await res.json();
    return [null, data.message || 'Failed'];
  }

  return ['OK', null];
}
