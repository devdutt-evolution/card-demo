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
  userId,
}: {
  username: string | undefined;
  userId: string | undefined;
}) {
  return (
    <Link
      className="p-2 px-3 rounded-lg text-center bg-place text-black"
      href={`user/${userId}`}
    >
      {getInitials(username)}
    </Link>
  );
}
