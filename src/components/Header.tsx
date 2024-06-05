import storeLogo from "../assets/images/arpeggio.svg";
import { FaBars, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MainNavBarLink from "./MainNavBarLink";
import SearchBar from "./SearchBar";
import { PiGuitarFill } from "react-icons/pi";

export default function Header({
  isCatalogPage,
  sideBarActive,
  cartHasItems,
  openSideBar,
  closeSideBar,
  searchBarValue,
  setSearch,
}: {
  isCatalogPage: boolean;
  sideBarActive: boolean;
  cartHasItems: boolean;
  openSideBar: () => void;
  closeSideBar: () => void;
  searchBarValue: string;
  setSearch: (search: string) => void;
}) {
  return (
    <nav className="p-3 bg-black text-white flex flex-col items-center gap-4 relative">
      <section className="w-full xl:w-[1280px] flex box-border px-4 items-center">
        <Link to="/">
          <img
            src={storeLogo}
            alt="Arpeggio Music Store's Logo"
            title="Home"
            className="h-6 ml-3 xl:ml-0"
          />
        </Link>
        <ul className="flex justify-end items-center gap-8 w-full">
          {isCatalogPage && (
            <li
              className="xl:hidden cursor-pointer absolute left-2"
              title="Toggle Sidebar"
            >
              {sideBarActive ? (
                <FaXmark onClick={closeSideBar} data-testid="x-mark-icon" />
              ) : (
                <FaBars onClick={openSideBar} data-testid="hamburger-icon" />
              )}
            </li>
          )}
          <li>
            <MainNavBarLink
              path="/catalog/1"
              innerText="Catalog"
              pathToMatch="/catalog/"
              icon={PiGuitarFill}
            />
          </li>
          <li className="hidden lg:block">
            <SearchBar
              searchBarValue={searchBarValue}
              setSearch={setSearch}
              id="searchbar-1"
            />
          </li>
          <li>
            <MainNavBarLink
              path="/cart"
              innerText="Cart"
              icon={FaShoppingCart}
              addNotification={cartHasItems}
            />
          </li>
          <li>
            <MainNavBarLink
              path="/about"
              innerText="About"
              icon={FaInfoCircle}
            />
          </li>
        </ul>
      </section>
      <section className="lg:hidden">
        <SearchBar
          searchBarValue={searchBarValue}
          setSearch={setSearch}
          id="searchbar-2"
        />
      </section>
    </nav>
  );
}
