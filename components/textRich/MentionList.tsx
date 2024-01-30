import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import SuggestionItem from "@/components/SuggestItem";

export const MentionList = forwardRef(function AnyName(props: any, ref) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const list: { id: string; display: string, picture: string }[] = props?.items;
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
          (item: { id: string; display: string, picture: string }, index: number) => (
            <SuggestionItem
              key={index}
              displayText={item.display}
              picture={item.picture}
              classname={index === selectedIndex ? "bg-green" : ""}
              onClick={() => selectItem(index)}
            />
          )
        )
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});
