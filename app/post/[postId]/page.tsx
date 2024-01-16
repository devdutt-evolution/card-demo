import Loader from "@/components/Loader";
import { Suspense } from "react";
import PostData from "./PostData";

export default function Post({ params }: { params: { postId: string } }) {
  return (
    <div className="flex flex-col w-3/5 text-white mx-auto h-max">
      <Suspense
        fallback={
          <div className="h-[70vh] flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        <PostData postId={params.postId} />
      </Suspense>
    </div>
  );
}
