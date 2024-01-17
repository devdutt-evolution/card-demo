"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./rich.css";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 py-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${editor.isActive("italic") ? "is-active" : ""} `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${editor.isActive("strike") ? "is-active" : ""} `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`${editor.isActive("code") ? "is-active" : ""} `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${
          editor.isActive("paragraph") ? "text-green" : "text-[#fff]"
        } font-bold`}
      >
        P
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        } `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M200-280v-400h80v160h160v-160h80v400h-80v-160H280v160h-80Zm480 0v-320h-80v-80h160v400h-80Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        } `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-160q0-33 23.5-56.5T600-520h160v-80H520v-80h240q33 0 56.5 23.5T840-600v80q0 33-23.5 56.5T760-440H600v80h240v80H520Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        } `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H600v-80h160v-80H520v-80h240q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H520Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive("bulletList") ? "is-active" : ""} `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M480-560h200v-80H480v80Zm0 240h200v-80H480v80ZM360-520q33 0 56.5-23.5T440-600q0-33-23.5-56.5T360-680q-33 0-56.5 23.5T280-600q0 33 23.5 56.5T360-520Zm0 240q33 0 56.5-23.5T440-360q0-33-23.5-56.5T360-440q-33 0-56.5 23.5T280-360q0 33 23.5 56.5T360-280ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${editor.isActive("orderedList") ? "is-active" : ""} `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M680-80v-60h100v-30h-60v-60h60v-30H680v-60h120q17 0 28.5 11.5T840-280v40q0 17-11.5 28.5T800-200q17 0 28.5 11.5T840-160v40q0 17-11.5 28.5T800-80H680Zm0-280v-110q0-17 11.5-28.5T720-510h60v-30H680v-60h120q17 0 28.5 11.5T840-560v70q0 17-11.5 28.5T800-450h-60v30h100v60H680Zm60-280v-180h-60v-60h120v240h-60ZM120-200v-80h480v80H120Zm0-240v-80h480v80H120Zm0-240v-80h480v80H120Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${
          editor.isActive("heading", { level: 4 }) ? "is-active" : ""
        } `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm600 0v-120H520v-280h80v200h120v-200h80v200h80v80h-80v120h-80Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${
          editor.isActive("heading", { level: 5 }) ? "is-active" : ""
        } `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H520v-240h320v80H600v80h160q33 0 56.5 23.5T840-440v80q0 33-23.5 56.5T760-280H520Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`${
          editor.isActive("heading", { level: 6 }) ? "is-active" : ""
        } `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm480 0q-33 0-56.5-23.5T520-360v-240q0-33 23.5-56.5T600-680h240v80H600v80h160q33 0 56.5 23.5T840-440v80q0 33-23.5 56.5T760-280H600Zm0-160v80h160v-80H600Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${editor.isActive("codeBlock") ? "is-active" : ""} `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m384-336 56-57-87-87 87-87-56-57-144 144 144 144Zm192 0 144-144-144-144-56 57 87 87-87 87 56 57ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${editor.isActive("blockQuote") ? "is-active" : ""} `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m228-240 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T458-480L320-240h-92Zm360 0 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T818-480L680-240h-92ZM320-500q25 0 42.5-17.5T380-560q0-25-17.5-42.5T320-620q-25 0-42.5 17.5T260-560q0 25 17.5 42.5T320-500Zm360 0q25 0 42.5-17.5T740-560q0-25-17.5-42.5T680-620q-25 0-42.5 17.5T620-560q0 25 17.5 42.5T680-500Zm0-60Zm-360 0Z" />
        </svg>
      </button>
      <button
        className=""
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#fff]"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M160-440v-80h640v80H160Z" />
        </svg>
      </button>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = `<br /><br />`;

export default function Name() {
  return (
    <div
      className="flex flex-col"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
      >
        <></>
      </EditorProvider>
    </div>
  );
}
