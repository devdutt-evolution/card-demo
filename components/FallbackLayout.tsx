import type { PropsWithChildren } from "react";

export default function FallbackLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full flex h-[50vh] justify-center items-center">
      {children}
    </div>
  );
}
