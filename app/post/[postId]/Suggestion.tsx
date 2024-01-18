import { ReactNode } from "react";
import { SuggestionDataItem } from "react-mentions";
import { getInitials } from "./commentUtils";

export function SuggestionBox({ props }: any) {
  return (
    <div className="min-w-[100px] max-h-[30vh] bg-card overflow-auto text-[#fff] list-none">
      <ul className="w-full p-2 flex gap-2 flex-col">{props.children}</ul>
    </div>
  );
}

export function SuggestionItem(
  data: SuggestionDataItem,
  _q: string,
  _highlightItem: ReactNode,
  _index: number,
  _focused: boolean
) {
  return (
    <div className=" hover:bg-green rounded-lg flex items-center w-full p-2">
      <div className="rounded-full w-8 h-8 bg-place flex justify-center items-center mr-2">
        {getInitials(data.display)}
      </div>
      <p className="">{data.display}</p>
    </div>
  );
}
