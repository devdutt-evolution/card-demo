import type { PropsWithChildren } from "react";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <div className="mt-2 sm:mx-auto rounded-lg w-full lg:w-3/5 max-w-[720px] bg-card">
      {children}
    </div>
  );
}
