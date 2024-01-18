import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import { MentionList } from "./MentionList";
import { fetchUsers } from "@/app/post/[postId]/commentUtils";

export const suggestion = {
  items: async ({ query }: { query: string }) => {
    const [data, error] = await fetchUsers(query);

    if (data && data.length > 0) {
      return data;
    }
  },

  render: () => {
    let component: ReactRenderer;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props?.editor,
        });

        if (!props?.clientRect) return;

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: any) {
        component?.updateProps(props);

        if (!props?.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props?.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props?.event?.key === "Escape") {
          popup[0].hide();
          return true;
        }

        let Ele: any = component?.ref;
        return Ele.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
