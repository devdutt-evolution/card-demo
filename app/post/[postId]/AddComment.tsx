"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createComment, fetchUsers } from "./commentUtils";
import { Mention, MentionsInput } from "react-mentions";
import { SuggestionBox, SuggestionItem } from "./Suggestion";

export default function AddComment({ postId }: { postId: string }) {
  const router = useRouter();
  const { data } = useSession({ required: true });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // fetch users for suggestion
  async function fetchUser(query: string, callback: any) {
    if (!query) return;

    // setTimeout(async () => {
    const [users, error] = (await fetchUsers(query, data?.user)) as any;

    if (error) setError(error);
    callback(users);
    // }, 700);
  }

  async function postComment() {
    setLoading(true);
    const [success, failed] = await createComment(postId, data?.user, comment);
    setLoading(false);
    if (failed) setError(failed);
    else {
      setComment("");
      setError("");
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col gap-2 justify-between mb-4">
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
          renderSuggestion={SuggestionItem}
          displayTransform={(_id, name) => `@${name}`}
          appendSpaceOnAdd
        />
      </MentionsInput>
      <div>
        {error && <p className="text-red pb-2">{error}</p>}
        <button
          className="py-2 px-3 bg-green hover:bg-hgreen rounded-lg text-sm"
          onClick={(e) => postComment()}
        >
          {!loading ? <p>Comment</p> : <p>Posting...</p>}
        </button>
      </div>
    </div>
  );
}
