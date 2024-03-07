import { Outlet } from "react-router-dom";
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
  return (
    <section className="flex justify-center bg-blue-400">
      <section className="w-full xl:w-[1200px] bg-green-300 flex">
        {/* The following section is a backdrop which can be clicked to deactivate the sidebar menu */}
        <section
          className={`${
            sideBarActive ? "block" : "hidden"
          } xl:hidden absolute h-full w-full bg-black opacity-30 z-20`}
          onClick={closeSideBar}
        ></section>
        <aside
          className={`bg-red-400 text-nowrap absolute h-full overflow-hidden ${
            sideBarActive ? "w-[min(300px,_100%)]" : "w-0"
          } xl:w-[300px] xl:static z-30 transition-all duration-200 ease-in`}
        >
          <nav className="">
            <ul className="flex flex-col justify-start items-start gap-3">
              {categories.map((category: CategoryType) => (
                <CategoryListItem category={category} key={category.id} />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="w-full">
          <Outlet />
        </main>
      </section>
    </section>
  );
}
