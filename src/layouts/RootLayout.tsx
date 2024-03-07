import { Outlet, useLocation } from "react-router-dom";
import MainNavBarLink from "../components/MainNavBarLink";
import { FaBars, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { PiGuitarFill } from "react-icons/pi";
import { ShoppingCart } from "../types";

export default function RootLayout({
  openSideBar,
  closeSideBar,
  sideBarActive,
  shoppingCart,
}: {
  openSideBar: () => void;
  closeSideBar: () => void;
  sideBarActive: boolean;
  shoppingCart: ShoppingCart;
}) {
  const { pathname } = useLocation();
  const isCatalogPage = pathname.includes("catalog");

  const cartHasItems = shoppingCart.length > 0;

  return (
    <section className="min-h-screen flex flex-col">
      <nav className="p-3 bg-pink-400">
        <ul className="flex justify-center items-center gap-8 relative">
          {isCatalogPage && (
            <li className="xl:hidden cursor-pointer absolute left-0">
              {sideBarActive ? (
                <FaXmark onClick={closeSideBar} />
              ) : (
                <FaBars onClick={openSideBar} />
              )}
            </li>
          )}
          <li>
            <MainNavBarLink path="/" innerText="Home" icon={GoHomeFill} />
          </li>
          <li>
            <MainNavBarLink
              path="/catalog/1"
              innerText="Catalog"
              pathToMatch="/catalog/"
              icon={PiGuitarFill}
            />
          </li>
          <li>
            <MainNavBarLink
              path="/about"
              innerText="About"
              icon={FaInfoCircle}
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
        </ul>
      </nav>
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <footer className="bg-yellow-500 h-8"></footer>
    </section>
  );
}
