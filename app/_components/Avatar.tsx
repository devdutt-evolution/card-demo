import Image from "next/image";
import Link from "next/link";

const getInitials = (name?: string): string => {
  if (!name) return "DN";
  const nameArr = name.split(" ");

  if (nameArr.length == 1) return nameArr[0][0].toUpperCase();
  else if (nameArr.length > 1)
    return nameArr[0][0].toUpperCase() + nameArr.at(-1)![0].toUpperCase();
  else return "";
};

export default function Avatar({
  username,
  profile,
}: {
  username: string | undefined;
  profile: string | undefined;
}) {
  if (profile) {
    return (
      <Link
        className='rounded-lg hidden sm:block w-10 h-10'
        href={`/myprofile`}
      >
        <object
          data={`${process.env.NEXT_PUBLIC_URL_BACKEND}/pictures/${profile}`}
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
      </Link>
    );
  }

  return (
    <Link
      className='p-2 px-3 rounded-lg text-center bg-place text-black hidden sm:block'
      href={`/myprofile`}
    >
      {getInitials(username)}
    </Link>
  );
}
