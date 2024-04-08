import type { PropsWithChildren } from "react";

export default function PostsLayout({ children }: PropsWithChildren) {
  return (
    <main className='flex flex-col w-4/5 sm:w-3/5 min-h-[50vh] min-w-80 mx-auto mt-2 gap-2'>
      {children}
    </main>
  );
}
