import React from "react";

export default function FallbackLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full flex h-[50vh] justify-center items-center">
      {children}
    </div>
  );
}
