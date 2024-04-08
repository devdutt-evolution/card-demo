"use client";

import { useEffect, useState } from "react";

type Props = {
  setSearch: (q: string) => void;
  search: string;
};

export default function Search(props: Props) {
  const { setSearch, search } = props;
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setSearch, localSearch]);

  return (
    <input
      type='search'
      className='outline-none focus:outline-green text-[#FFF] font-roboto rounded-lg bg-card p-2 px-4'
      id='search'
      autoComplete='off'
      placeholder='Search'
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
    />
  );
}
