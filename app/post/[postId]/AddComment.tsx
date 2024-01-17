"use client";

import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createComment, fetchUsers } from "./commentUtils";
import { Mention, MentionsInput } from "react-mentions";

export default function AddComment({ postId }: { postId: string }) {
  const router = useRouter();
  const { data } = useSession({ required: true });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let timeoutRef = setTimeout(() => {}, 1500);

    return () => clearTimeout(timeoutRef);
  }, [comment]);

  const fetchUser = async (query: string, callback: any) => {
    if (!query) return;

    setTimeout(async () => {
      const [users, error] = (await fetchUsers(query, data?.user)) as any;

      if (error) setError(error);
      callback(users);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-2 justify-between mb-4">
      {/* <textarea
        className="bg-black w-full rounded-lg p-2 outline-none border-2 border-black focus:border-2 focus:border-green"
        placeholder="create comment ..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      /> */}
      <MentionsInput
        // singleLine
        value={comment}
        onChange={(e) => {
          console.log(e.target.value);
          setComment(e.target.value);
        }}
        placeholder={"Mention people using '@'"}
        a11ySuggestionsListLabel={"Suggested mentions"}
        style={{
          "&multiLine": {
            control: {
              minHeight: 63,
            },
            highlighter: {
              padding: "0.5rem",
            },
            input: {
              padding: 9,
            },
          },
          suggestions: {
            list: {
              backgroundColor: "#202024",
            },
            item: {
              padding: "5px 15px",
              "&focused": {
                backgroundColor: "#00875F",
              },
            },
          },
        }}
        className="bg-black rounded-lg outline-none focus:outline-none border-0 text-sm"
      >
        <Mention
          trigger="@"
          data={fetchUser}
          onAdd={(id, value) => {
            console.log("onAdd", id, value);
          }}
          displayTransform={(id, name) => `@${name}`}
          appendSpaceOnAdd
          style={{
            backgroundColor: "#00875F",
            padding: "1px",
            borderRadius: "0.3rem",
          }}
        />
      </MentionsInput>
      <div>
        {error && <p className="text-red pb-2">{error}</p>}
        <button
          className="py-2 px-3 bg-green hover:bg-hgreen rounded-lg text-sm"
          onClick={async (e) => {
            setLoading(true);
            const [success, failed] = await createComment(
              postId,
              data?.user,
              comment
            );
            setLoading(false);
            if (failed) setError(failed);
            else router.refresh();
          }}
        >
          {!loading ? <p>Comment</p> : <Loader />}
        </button>
      </div>
    </div>
  );
}
