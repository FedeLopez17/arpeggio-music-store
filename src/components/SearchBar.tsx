import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar() {
  const [searchBarValue, setSearchBarValue] = useState("");

  return (
    <section className="flex justify-center items-center gap-2 bg-white border-2 border-transparent focus-within:border-blue-500 px-3 py-1 rounded-2xl w-fit">
      <input
        type="text"
        placeholder="Search"
        className="w-[200px] bg-transparent focus-visible:outline-0 text-sm"
        value={searchBarValue}
        onChange={(e) => setSearchBarValue(e.target.value)}
      />
      <FaMagnifyingGlass className="cursor-pointer border-l-[1px] border-l-gray-400 pl-2 box-content" />
    </section>
  );
}
