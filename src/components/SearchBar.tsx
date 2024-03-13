import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ProductType } from "../types";
import { searchCatalog } from "../catalogManager";
import SearchResult from "./SearchResult";

export default function SearchBar() {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [matchingProducts, setMatchingProducts] = useState<ProductType[]>();
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const [resultItemSelected, setResultItemSelected] = useState(false);

  useEffect(() => {
    if (!resultItemSelected) return;

    setInputHasFocus(false);
    setResultItemSelected(false);
  }, [resultItemSelected]);

  return (
    <section className="flex flex-col w-fit">
      <section className="flex justify-center items-center gap-2 bg-white border-2 border-transparent focus-within:border-blue-500 px-3 py-1 rounded-2xl w-fit">
        <input
          type="text"
          placeholder="Search"
          className="w-[200px] bg-transparent focus-visible:outline-0 text-sm"
          value={searchBarValue}
          onChange={({ target: { value } }) => {
            setSearchBarValue(value);
            setMatchingProducts(searchCatalog(value));
          }}
          onFocus={() => setInputHasFocus(true)}
          onBlur={(e) => {
            if (!e.relatedTarget?.classList.contains("result-item")) {
              setInputHasFocus(false);
            }
          }}
        />
        <FaMagnifyingGlass className="cursor-pointer border-l-[1px] border-l-gray-400 pl-2 box-content" />
      </section>
      {!!matchingProducts?.length && inputHasFocus && (
        <section
          className="relative"
          onClick={() => setResultItemSelected(true)}
        >
          <SearchResult products={matchingProducts} />
        </section>
      )}
    </section>
  );
}
