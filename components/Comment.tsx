// Comment component to show comments under post
import { Comments, Comment } from "@/types/type.d";
// import { useEffect, useState } from "react";

export default async function Comment({ postId }: { postId: number }) {
  // const [isError, setError] = useState(false);
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState<Comments | []>([]);

  // useEffect(() => {
  const fetchCommentsDetail = async (postId: number) => {
    let data = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    let comments: Comments = await data.json();
    return comments;
  };

  const data = await fetchCommentsDetail(postId);
  // }, [postId]);
  // if error
  // if (isError) return <div>Error Occured</div>;
  // if loading
  // if (isLoading)
  //   return (
  //     <main className="flex w-full h-full justify-center items-center font-bold text-white">
  //       Loading
  //     </main>
  //   );
  // if no post
  if (data.length == 0)
    return (
      <div className="flex flex-col w-full text-white mx-auto mt-2 px-2 py-1">
        No Comments
      </div>
    );
  // else
  return (
    <>
      {data.map((comment) => {
        return (
          <div
            key={comment.id}
            className="bg-divider my-5 py-3 px-5 rounded-lg"
          >
            <h4 className="text-l font-bold">
              <a href={`to:${comment.email}`}>{comment.name.split(" ")[0]}</a>
            </h4>
            <p className="text-sm text-place">{comment.email}</p>
            <p className="pt-3">{comment.body}</p>
          </div>
        );
      })}
    </>
  );
}