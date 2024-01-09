"use client";

import React, { useCallback, useState } from "react";
// Import the Slate editor factory.
import { Node, Editor, Transforms, Element, createEditor, Text } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = { type: string; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export default function Test() {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate initialValue={initialValue} editor={editor}>
      <Editable
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;

          switch (event.key) {
            // When "`" is pressed, keep our existing code block logic.
            case "`": {
              event.preventDefault();
              const [match]: any = Editor.nodes(editor, {
                match: (n: any) => n.type === "code",
              });
              Transforms.setNodes(
                editor,
                { type: match ? "paragraph" : "code" },
                { match: (n: any) => Editor.isBlock(editor, n) }
              );
              break;
            }

            // When "B" is pressed, bold the text in the selection.
            case "b": {
              event.preventDefault();
              Editor.addMark(editor, "bold", true);
              break;
            }
          }
        }}
      />
    </Slate>
  );
}
const CodeElement = (props: any) => {
  return <pre {...props.attributes}>{props.children}</pre>;
};
const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};
