import { Outlet, useLocation } from "react-router-dom";
import MainNavBarLink from "../components/MainNavBarLink";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function RootLayout({
  openSideBar,
  closeSideBar,
  sideBarActive,
}: {
  openSideBar: () => void;
  closeSideBar: () => void;
  sideBarActive: boolean;
}) {
  const { pathname } = useLocation();
  const isCatalogPage = pathname.includes("catalog");

  return (
    <section className="min-h-screen flex flex-col">
      <nav>
        <ul className="flex justify-start items-center gap-3">
          {isCatalogPage && (
            <li className="xl:hidden cursor-pointer">
              {sideBarActive ? (
                <FaXmark onClick={closeSideBar} />
              ) : (
                <FaBars onClick={openSideBar} />
              )}
            </li>
          )}
          <li>
            <MainNavBarLink path="/" innerText="Home" />
          </li>
          <li>
            <MainNavBarLink
              path="/catalog/1"
              innerText="Catalog"
              pathToMatch="/catalog/"
            />
          </li>
          <li>
            <MainNavBarLink path="/about" innerText="About" />
          </li>
          <li>
            <MainNavBarLink path="/cart" innerText="Cart" />
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
