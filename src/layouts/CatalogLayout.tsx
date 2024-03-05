import { Outlet } from "react-router-dom";
import categories from "../data/categories.json";
import { CategoryType } from "../types";
import CategoryListItem from "../components/CategoryListItem";

export default function ProductsLayout() {
  return (
    <section className="flex justify-center bg-blue-400">
      <section className="w-full xl:w-[1200px] bg-green-300 flex">
        <aside>
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
