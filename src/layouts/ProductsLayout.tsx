import { NavLink, Outlet } from "react-router-dom";
import categories from "../data/categories.json";
import { CategoryType } from "../types";

export default function ProductsLayout() {
  return (
    <>
      <nav>
        <ul className="flex justify-start items-center gap-3">
          {categories.map((category: CategoryType) => (
            <li key={category.id}>
              <NavLink to={`/products/${category.id}`}>{category.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
