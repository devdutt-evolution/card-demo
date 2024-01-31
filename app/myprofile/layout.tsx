import type { PropsWithChildren } from "react";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-4/5 sm:w-3/5 min-h-[50vh] rounded-lg mx-auto p-5 mt-2 bg-card max-w-[650px]">
      {children}
    </div>
  );
}
