"use client";

import StarterKit from "@tiptap/starter-kit";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Mention from "@tiptap/extension-mention";
import "./rich.css";
import { suggestion } from "./suggestion";
import {
  BlockQuote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  HorizontalRule,
  Italics,
  OrderList,
  Strike,
} from "../icons/TextRich";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <div className='flex flex-wrap gap-2 py-2'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${editor.isActive("italic") ? "is-active" : ""} `}
      >
        <Italics />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${editor.isActive("strike") ? "is-active" : ""} `}
      >
        <Strike />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`${editor.isActive("code") ? "is-active" : ""} `}
      >
        <Code />
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
        <H1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        } `}
      >
        <H2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        } `}
      >
        <H3 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive("bulletList") ? "is-active" : ""} `}
      >
        <BulletList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${editor.isActive("orderedList") ? "is-active" : ""} `}
      >
        <OrderList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${
          editor.isActive("heading", { level: 4 }) ? "is-active" : ""
        } `}
      >
        <H4 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${
          editor.isActive("heading", { level: 5 }) ? "is-active" : ""
        } `}
      >
        <H5 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`${
          editor.isActive("heading", { level: 6 }) ? "is-active" : ""
        } `}
      >
        <H6 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${editor.isActive("codeBlock") ? "is-active" : ""} `}
      >
        <CodeBlock />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${editor.isActive("blockQuote") ? "is-active" : ""} `}
      >
        <BlockQuote />
      </button>
      <button
        className=''
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <HorizontalRule />
      </button>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
  Mention.configure({
    HTMLAttributes: {
      class: "bg-green rounded-md",
    },
    suggestion,
  }),
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

const content = `<br/>Mention people using '@'<br />`;

export default function TextRich(props: { content?: string }) {
  return (
    <div
      className='flex flex-col'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={props.content || content}
      >
        <></>
      </EditorProvider>
    </div>
  );
}
