import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  getCatalog,
  getFilteredProducts,
  getNumberOfPages,
} from "../catalogManager";
import OrderBySelector from "../components/OrderBySelector";
import { OrderByOption, SetOrderByOption } from "../types";
import PageSelector from "../components/PageSelector";

export default function ProductsPage({
  currentOrderByOption,
  setCurrentOrderByOption,
}: {
  currentOrderByOption: OrderByOption;
  setCurrentOrderByOption: SetOrderByOption;
}) {
  const { category, subcategory, page = 1 } = useParams();

  const numberOfPages = getNumberOfPages({
    category,
    subCategory: subcategory,
  });

  const noParams = !category && !subcategory;
  const catalog = noParams
    ? getCatalog(Number(page), currentOrderByOption)
    : getFilteredProducts({
        category: category || "",
        subCategory: subcategory ? subcategory : undefined,
        orderBy: currentOrderByOption,
        page: Number(page),
      });

  return (
    <section className="">
      {!catalog.length ? (
        <h4>No matching products</h4>
      ) : (
        <>
          <section className="flex justify-end items-center">
            <OrderBySelector
              currentSelection={currentOrderByOption}
              setOrderOption={setCurrentOrderByOption}
            />
          </section>
          <section className="grid gap-3">
            {catalog.map((product) => (
              <ProductCard key={product.imagesPath} product={product} />
            ))}
          </section>
          {numberOfPages > 1 && (
            <PageSelector
              numberOfPages={numberOfPages}
              category={category}
              subCategory={subcategory}
              currentPage={Number(page)}
            />
          )}
        </>
      )}
    </section>
  );
}
