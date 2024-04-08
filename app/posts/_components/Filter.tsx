"use client";

import Clock from "@/components/icons/Clock";
import { SORT_FIELD, SORT_ORDER } from "@/utils/consts";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  setUserId: (a: string) => void;
  orderBy: SORT_ORDER;
  setOrderBy: (a: SORT_ORDER) => void;
  fieldName: SORT_FIELD;
  setFieldName: (a: SORT_FIELD) => void;
};
export default function Filter(props: Props) {
  const router = useRouter();
  const { userId, setUserId, orderBy, setOrderBy, fieldName, setFieldName } =
    props;

  const handleRecent = () => {
    if (fieldName === SORT_FIELD.time && orderBy === SORT_ORDER.desc) {
      setFieldName(SORT_FIELD.title);
      setOrderBy(SORT_ORDER.asc);
    } else {
      setFieldName(SORT_FIELD.time);
      setOrderBy(SORT_ORDER.desc);
    }
  };

  const handleMostLiked = () => {
    if (fieldName === SORT_FIELD.likes && orderBy === SORT_ORDER.desc) {
      setFieldName(SORT_FIELD.time);
      setOrderBy(SORT_ORDER.desc);
    } else {
      setFieldName(SORT_FIELD.likes);
      setOrderBy(SORT_ORDER.desc);
    }
  };

  const handleResetFilter = () => {
    setUserId("");
    // router.push(`/posts?order=${SORT_ORDER.desc}&field=${SORT_FIELD.time}`);
    router.push(`/posts`);
  };

  return (
    <div className='flex justify-end gap-2 text-sm font-semibold'>
      {userId && (
        <button
          onClick={(e) => handleResetFilter()}
          type='button'
          className={`py-2 px-3 bg-card rounded-lg`}
        >
          Reset Filters
        </button>
      )}
      <button
        type='button'
        onClick={(e) => handleRecent()}
        className={`py-2 px-3 ${
          orderBy == SORT_ORDER.desc &&
          fieldName == SORT_FIELD.time &&
          "border-green text-green"
        }`}
      >
        <Clock
          color={
            orderBy == SORT_ORDER.desc && fieldName == SORT_FIELD.time
              ? "fill-green"
              : "fill-[#fff]"
          }
        />
      </button>
      <button
        type='button'
        onClick={(e) => handleMostLiked()}
        className={`py-2 px-3 bg-card rounded-lg ${
          orderBy == SORT_ORDER.desc &&
          fieldName == SORT_FIELD.likes &&
          "border-green text-green"
        }`}
      >
        Most Liked
      </button>
      <select
        className='bg-card focus:outline-green p-2 rounded-lg outline-none'
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value as SORT_ORDER)}
      >
        <option value={SORT_ORDER.asc}>Asc</option>
        <option value={SORT_ORDER.desc}>Desc</option>
      </select>
      <select
        className='bg-card focus:outline-green p-2 rounded-lg outline-none'
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value as SORT_FIELD)}
      >
        <option value={SORT_FIELD.title}>Title</option>
        <option value={SORT_FIELD.time}>Time</option>
        <option value={SORT_FIELD.likes}>Likes</option>
      </select>
    </div>
  );
}
