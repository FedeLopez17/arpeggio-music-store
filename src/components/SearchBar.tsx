import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ProductType } from "../types";
import { searchCatalog } from "../catalogManager";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  searchBarValue,
  setSearch,
}: {
  searchBarValue: string;
  setSearch: (search: string) => void;
}) {
  const [matchingProducts, setMatchingProducts] = useState<ProductType[]>();
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const [resultSelected, setResultSelected] = useState(false);

  const searchResultContainer = useRef<HTMLElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!resultSelected) return;

    setInputHasFocus(false);
    inputRef.current?.blur();
    setResultSelected(false);
  }, [resultSelected]);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/catalog/1/?search=${searchBarValue}`);
    setResultSelected(true);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "Enter") return;
    handleSearch();
  };

  return (
    <section className="flex flex-col w-fit">
      <section className="flex justify-center items-center gap-2 bg-white border-2 border-transparent focus-within:border-blue-500 px-3 py-1 rounded-2xl w-fit">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="w-[200px] bg-transparent focus-visible:outline-0 text-sm"
          value={searchBarValue}
          onChange={({ target: { value } }) => {
            setSearch(value);
            setMatchingProducts(searchCatalog(value));
          }}
          onFocus={() => setInputHasFocus(true)}
          onBlur={(e) => {
            if (
              !(
                e.relatedTarget &&
                searchResultContainer.current?.contains(e.relatedTarget)
              )
            ) {
              setInputHasFocus(false);
            }
          }}
          onKeyDownCapture={handleKeyDown}
        />
        <FaMagnifyingGlass
          className="cursor-pointer border-l-[1px] border-l-gray-400 pl-2 box-content"
          onClick={handleSearch}
        />
      </section>
      {!!matchingProducts?.length && inputHasFocus && (
        <section
          className="relative"
          onClick={() => setResultSelected(true)}
          ref={searchResultContainer}
        >
          <SearchResult products={matchingProducts} search={searchBarValue} />
        </section>
      )}
    </section>
  );
}
