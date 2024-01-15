"use client";

import { useEffect, useRef, useState } from "react";

export default function Like({ liked, id }: { liked: boolean; id: string }) {
  const [like, setLike] = useState(liked);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!like && ref.current) {
      setTimeout(() => {
        if (ref.current) {
          const firstChild = ref.current.firstChild as HTMLElement;
          if (firstChild) firstChild.classList.remove("animate-ping");
        }
      }, 700);
      const firstChild = ref.current.firstChild as HTMLElement;
      if (firstChild) firstChild.classList.add("animate-ping");
    }
  }, [like]);

  return (
    <div ref={ref} onClick={(e) => setLike((l) => !l)} className="w-min">
      {like ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          fill="white"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#F75A68"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </div>
  );
}
