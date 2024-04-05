import Image from "next/image";
import Link from "next/link";

const getInitials = (name?: string): string => {
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
