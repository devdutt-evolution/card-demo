"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import SuggestionBox from "@/components/Suggestion";
import SuggestionItem from "@/components/SuggestItem";
import { createComment, fetchUsers } from "../helper";

export default function AddComment() {
  const router = useRouter();
  const { postId } = useParams();
  const { data } = useSession({ required: true });

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch users for suggestion
  async function fetchUser(query: string, callback: Function) {
    try {
      if (!query) return;
      const users = await fetchUsers(query, data?.user?.token);

      callback(users.users);
    } catch (err) {
      setError("Failed to fetch users");
    }
  }

  // create comment
  async function postComment() {
    try {
      setLoading(true);
      createComment(
        typeof postId === "string" ? postId : postId[0],
        comment,
        data?.user?.token
      );
      setComment("");
      setError("");
      router.refresh();
    } catch (err) {
      if (typeof err === "string") setError(err);
      setError("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex flex-col gap-2 justify-between mb-4"
      onKeyDown={(e) => {
        if (e.ctrlKey && e.key == "Enter") {
          e.preventDefault();
          postComment();
        }
      }}
    >
      <MentionsInput
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={"Mention people using '@'"}
        a11ySuggestionsListLabel={"Suggested mentions"}
        customSuggestionsContainer={SuggestionBox}
        className="bg-black rounded-lg outline-none focus:outline-none border-0 text-sm min-h-[100px]"
      >
        <Mention
          trigger="@"
          data={fetchUser}
          renderSuggestion={(data: any) => (
            <SuggestionItem
              displayText={data?.display}
              picture={data?.picture}
            />
          )}
          displayTransform={(_id, name) => `@${name}`}
          appendSpaceOnAdd
        />
      </MentionsInput>
      {error && <p className="text-red pb-2">{error}</p>}
      <button
        className="py-2 px-3 bg-green hover:bg-hgreen rounded-lg text-sm"
        onClick={(e) => postComment()}
      >
        {!loading ? <p>Comment</p> : <p>Posting...</p>}
      </button>
    </div>
  );
}
