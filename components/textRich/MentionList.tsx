import { getInitials } from "@/app/post/[postId]/commentUtils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export const MentionList = forwardRef(function AnyName(props: any, ref) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const list: { id: string; display: string }[] = props?.items;
    const item = list[index];

    if (item) {
      props?.command({ id: item.id, label: item.display });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="w-full p-2 flex gap-2 flex-col bg-card max-h-[30vh] overflow-auto">
      {props?.items?.length ? (
        props.items.map(
          (item: { id: string; display: string }, index: number) => (
            <div
              className={`${
                index === selectedIndex ? "bg-green" : ""
              } hover:bg-green cursor-pointer rounded-lg flex items-center w-full p-2`}
              key={index}
              onClick={() => selectItem(index)}
            >
              <div className="rounded-full w-8 h-8 bg-place flex justify-center items-center mr-2">
                {getInitials(item.display)}
              </div>
              <p className="">{item.display}</p>
            </div>
          )
        )
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});
