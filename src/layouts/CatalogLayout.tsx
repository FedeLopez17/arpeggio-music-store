import { Link, Outlet, useLocation } from "react-router-dom";
import categories from "../data/categories.json";
import { CategoryType } from "../types";
import CategoryListItem from "../components/CategoryListItem";

export default function ProductsLayout({
  closeSideBar,
  sideBarActive,
}: {
  closeSideBar: () => void;
  sideBarActive: boolean;
}) {
  const { pathname } = useLocation();
  const favoritesLinkActive = pathname.includes(`/catalog/favorites/`);

  return (
    <section className="flex justify-center flex-grow">
      <section className="w-full xl:w-[1280px] flex">
        {/* The following section is a backdrop which can be clicked to deactivate the sidebar menu */}
        <section
          className={`${
            sideBarActive ? "block" : "hidden"
          } xl:hidden absolute h-full w-full bg-black opacity-30 z-20`}
          onClick={closeSideBar}
        ></section>
        <aside
          className={`bg-white text-nowrap absolute h-full overflow-hidden ${
            sideBarActive ? "w-[min(280px,_100%)]" : "w-0"
          } xl:w-[280px] xl:static z-30 transition-all duration-200 ease-in`}
        >
          <nav className="">
            <ul className="flex flex-col justify-start items-start mt-2 gap-4">
              <Link
                to="favorites/1"
                className={`bg-white w-full px-2 ${
                  favoritesLinkActive ? "font-bold" : ""
                }`}
              >
                Favorites
              </Link>
              {categories.map((category: CategoryType) => (
                <CategoryListItem category={category} key={category.id} />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="w-full h-min-full">
          <Outlet />
        </main>
      </section>
    </section>
  );
}
