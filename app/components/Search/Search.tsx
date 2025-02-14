"use client";

import SearchIcon from "../svgIcons/SearchIcon";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
  darkMode: boolean;
}

const Search = ({ search, setSearch, darkMode }: SearchProps) => {
  return (
    <div className="flex relative items-center w-full h-14 max-w-[480px]">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search for a country..."
        aria-label="Search for a country"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`bg-color1 p-2 w-full transition duration-300 h-full rounded-[5px] col-span-full row-span-1 pl-[72px] pr-8 ring-violet-500 ring-0 focus-visible:ring-2 outline-none shadow-0 focus:shadow-2xl ${!darkMode ? "shadow-xl" : ""}`}
      />
    </div>
  );
};

export default Search;
