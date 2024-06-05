import { Outlet, useLocation } from "react-router-dom";
import { ShoppingCart } from "../types";
import Footer from "../components/Footer";
import Header from "../components/Header";

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

  return (
    <section className="min-h-screen flex flex-col">
      <Header
        isCatalogPage={pathname.includes("catalog")}
        sideBarActive={sideBarActive}
        cartHasItems={shoppingCart.length > 0}
        openSideBar={openSideBar}
        closeSideBar={closeSideBar}
        searchBarValue={searchBarValue}
        setSearch={setSearch}
      />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
