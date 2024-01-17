import Loader from "@/components/Loader";
import Link from "next/link";
import { Suspense } from "react";
import UserData from "./UserData";

export default function UserDetails({
  params,
}: {
  params: { userId: string };
}) {
  if (!params.userId) {
    return (
      <div className="h-max flex items-center justify-center w-3/5 mx-auto">
        <div className="bg-card rounded-lg py-6 px-8 m-2 w-full text-2xl h-[calc(100vh-130px)] flex gap-2 justify-center items-center">
          <Link href="/posts">
            <p className="bg-green px-3 py-1 rounded-lg">&larr;</p>
          </Link>
          <p>No Such User</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-4/5 sm:w-3/5 mx-auto">
      <div className="bg-card flex flex-col p-5 mt-2 rounded-lg">
        {/* show users detais */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center w-3/5 h-[70vh]">
              <Loader />
            </div>
          }
        >
          <UserData userId={params.userId} />
        </Suspense>
        <Link href="/posts" className="w-min">
          <button className="bg-green hover:bg-hgreen px-4 py-2 rounded-lg">
            &nbsp;Back&nbsp;
          </button>
        </Link>
      </div>
    </div>
  );
}
