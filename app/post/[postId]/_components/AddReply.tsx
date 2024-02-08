"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import SuggestionBox from "@/components/Suggestion";
import SuggestionItem from "@/components/SuggestItem";
import { createComment, fetchUsers } from "../helper";
import Loader from "@/components/Loader";

export default function AddReply({
  toggleActive,
  initString = "",
}: {
  toggleActive: Function;
  initString?: string;
}) {
  const router = useRouter();
  const { postId } = useParams();
  const { data } = useSession({ required: true });

  const [reply, setReply] = useState(initString);
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

  // create reply
  async function postReply() {
    try {
      setLoading(true);
      // createReply(
      //   typeof postId === "string" ? postId : postId[0],
      //   reply,
      //   data?.user?.token
      // );
      setReply("");
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
          postReply();
        }
      }}
    >
      <MentionsInput
        value={reply}
        onChange={(e) => {
          setReply(e.target.value);
        }}
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
      <div className="flex justify-end gap-3 items-center">
        <button
          type="button"
          className="p-1 px-2 rounded-full hover:bg-card"
          onClick={(e) => toggleActive()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="p-1 px-2 rounded-full hover:bg-card"
          onClick={(e) => postReply()}
        >
          {loading ? <Loader /> : "Reply"}
        </button>
      </div>
    </div>
  );
}
