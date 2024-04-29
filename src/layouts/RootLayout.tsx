import { Link, Outlet, useLocation } from "react-router-dom";
import MainNavBarLink from "../components/MainNavBarLink";
import { FaBars, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { PiGuitarFill } from "react-icons/pi";
import { ShoppingCart } from "../types";
import SearchBar from "../components/SearchBar";
import storeLogo from "../assets/images/arpeggio.svg";
import Footer from "../components/Footer";

export default function RootLayout({
  openSideBar,
  closeSideBar,
  sideBarActive,
  shoppingCart,
  searchBarValue,
  setSearch,
}: {
  openSideBar: () => void;
  closeSideBar: () => void;
  sideBarActive: boolean;
  shoppingCart: ShoppingCart;
  searchBarValue: string;
  setSearch: (search: string) => void;
}) {
  const { pathname } = useLocation();
  const isCatalogPage = pathname.includes("catalog");

  const cartHasItems = shoppingCart.length > 0;

  return (
    <section className="min-h-screen flex flex-col">
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
              <li className="xl:hidden cursor-pointer absolute left-2">
                {sideBarActive ? (
                  <FaXmark onClick={closeSideBar} />
                ) : (
                  <FaBars onClick={openSideBar} />
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
            <li className="hidden md:block">
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
        <section className="md:hidden">
          <SearchBar searchBarValue={searchBarValue} setSearch={setSearch} id="searchbar-2"/>
        </section>
      </nav>
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
