export default function SuggestionBox({ props }: any) {
  return (
    <div className="min-w-[100px] max-h-[30vh] bg-card overflow-auto text-[#fff] list-none">
      <ul className="w-full p-2 flex gap-2 flex-col">{props.children}</ul>
    </div>
  );
}
