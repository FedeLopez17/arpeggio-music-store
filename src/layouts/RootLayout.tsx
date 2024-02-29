import { Outlet } from "react-router-dom";
import MainNavBarLink from "../components/MainNavBarLink";

export default function RootLayout() {
  return (
    <>
      <nav>
        <ul className="flex justify-start items-center gap-3">
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
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
