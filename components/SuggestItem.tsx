import Image from "next/image";

const getInitials = (name: string | undefined): string => {
  if (!name) return "DN";
  const nameArr = name.split(" ");

  if (nameArr.length == 1) return nameArr[0][0].toUpperCase();
  else if (nameArr.length > 1)
    return nameArr[0][0].toUpperCase() + nameArr.at(-1)![0].toUpperCase();
  else return "";
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
      <div className='rounded-full w-8 h-8 bg-place flex justify-center items-center mr-2 overflow-hidden'>
        {!picture ? (
          getInitials(displayText)
        ) : (
          <object
            data={`${process.env.NEXT_PUBLIC_URL_BACKEND}/pictures/${picture}`}
            width='40'
            height='40'
            aria-label='This image should exist, but alas it does not'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='https://www.gravatar.com/avatar'
              height={40}
              width={40}
              className='object-cover rounded-lg w-full h-full'
              alt='profile picture'
            />
          </object>
        )}
      </div>
      <p className=''>{displayText}</p>
    </div>
  );
}
