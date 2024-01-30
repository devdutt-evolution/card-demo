import Image from "next/image";

const getInitials = (name: string | undefined): string => {
  if (!name) return "DN";
  const splitted = name.split(" ");
  let initials = "";
  if (splitted.length == 1) initials = splitted[0][0].toUpperCase();
  else if (splitted.length > 1)
    initials =
      splitted[0][0].toUpperCase() +
      splitted[splitted.length - 1][0].toUpperCase();

  return initials;
};

export default function SuggestionItem({
  displayText,
  classname,
  picture,
  ...props
}:
  | {
      displayText: string;
      classname: string;
      picture: string;
    }
  | any) {
  return (
    <div
      className={` hover:bg-green rounded-lg flex items-center w-full p-2 ${classname}`}
      {...props}
    >
      <div className="rounded-full w-8 h-8 bg-place flex justify-center items-center mr-2 overflow-hidden">
        {!picture ? (
          getInitials(displayText)
        ) : (
          <Image
            height={32}
            width={32}
            src={`${process.env.NEXT_PUBLIC_URL_BACKEND}/pictures/${picture}`}
            alt="profile picture"
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <p className="">{displayText}</p>
    </div>
  );
}
