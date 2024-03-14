import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  getCatalog,
  getFilteredProducts,
  getNumberOfPages,
  searchCatalog,
} from "../catalogManager";
import OrderBySelector from "../components/OrderBySelector";
import { OrderByOption, SetOrderByOption } from "../types";
import PageSelector from "../components/PageSelector";
import { useEffect } from "react";

export default function ProductsPage({
  currentOrderByOption,
  setCurrentOrderByOption,
  clearSearch,
}: {
  currentOrderByOption: OrderByOption;
  setCurrentOrderByOption: SetOrderByOption;
  clearSearch: () => void;
}) {
  const { category, subcategory, page = 1 } = useParams();

  const numberOfPages = getNumberOfPages({
    category,
    subCategory: subcategory,
  });

  const search = useSearchParams()[0].get("search");

  useEffect(() => {
    if (!search) clearSearch();
  }, [search]);

  const noParams = !category && !subcategory;

  const catalog = search
    ? searchCatalog(search)
    : noParams
    ? getCatalog(Number(page), currentOrderByOption)
    : getFilteredProducts({
        category: category || "",
        subCategory: subcategory ? subcategory : undefined,
        orderBy: currentOrderByOption,
        page: Number(page),
      });

  return (
    <>
      {!catalog.length ? (
        <h4>No matching products</h4>
      ) : (
        <>
          <section className="w-full flex justify-end mb-3">
            <OrderBySelector
              currentSelection={currentOrderByOption}
              setOrderOption={setCurrentOrderByOption}
            />
          </section>
          <section className="w-full grid gap-3 grid-cols-catalog justify-center justify-items-center">
            {catalog.map((product) => (
              <ProductCard key={product.imagesPath} product={product} />
            ))}
          </section>
          {numberOfPages > 1 && (
            <section className="w-full flex justify-center mt-2">
              <PageSelector
                numberOfPages={numberOfPages}
                category={category}
                subCategory={subcategory}
                currentPage={Number(page)}
              />
            </section>
          )}
        </>
      )}
    </>
  );
}
