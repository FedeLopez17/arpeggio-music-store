import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getCatalog, getFilteredProducts } from "../catalogManager";
import OrderBySelector from "../components/OrderBySelector";
import { OrderByOption, SetOrderByOption } from "../types";

export default function ProductsPage({
  currentOrderByOption,
  setCurrentOrderByOption,
}: {
  currentOrderByOption: OrderByOption;
  setCurrentOrderByOption: SetOrderByOption;
}) {
  const { category, subcategory } = useParams();

  const noParams = !category && !subcategory;
  const catalog = noParams
    ? getCatalog(currentOrderByOption)
    : getFilteredProducts({
        category: category as string,
        subCategory: subcategory ? subcategory : undefined,
        orderBy: currentOrderByOption,
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
        </>
      )}
    </section>
  );
}
