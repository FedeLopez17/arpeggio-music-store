import { Outlet } from "react-router-dom";
import categories from "../data/categories.json";
import { CategoryType } from "../types";
import CategoryListItem from "../components/CategoryListItem";

export default function ProductsLayout() {
  return (
    <section className="flex">
      <aside>
        <nav className="">
          <ul className="flex  flex-col justify-start items-start gap-3">
            {categories.map((category: CategoryType) => (
              <CategoryListItem category={category} key={category.id} />
            ))}
          </ul>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </section>
  );
}
