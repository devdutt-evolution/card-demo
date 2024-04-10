import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from '@/utils/options';
import { getReportedPosts } from './reportUtils';
import PostCard from '../posts/_components/PostCard';

export default async function Reported() {
  const session = await getServerSession(options);

  if (!session?.user.admin) redirect('/posts');

  const [posts, error] = await getReportedPosts(session?.user.token);

  if (error) return <p>Failed to load reports</p>;
  if (!posts?.length)
    return (
      <div className='max-w-3xl mx-auto mt-4 py-4 text-2xl bg-card rounded-lg flex justify-center items-center'>
        No Reported Post yet
      </div>
    );

  return (
    <div className='mx-auto max-w-4xl space-y-4 p-4'>
      {posts &&
        posts.map((post) => {
          return (
            <PostCard
              post={post.post}
              key={post._id}
              admin={true}
              reportedUser={{
                count: post.reportedCount,
                reports: post.reports,
              }}
            />
          );
        })}
    </div>
  );
}
