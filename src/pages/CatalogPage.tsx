import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  getCatalog,
  getFilteredProducts,
  getNumberOfPages,
} from "../catalogManager";
import OrderBySelector from "../components/OrderBySelector";
import {
  AddFavorite,
  OrderByOption,
  RemoveFavorite,
  SetOrderByOption,
} from "../types";
import PageSelector from "../components/PageSelector";
import { useEffect } from "react";
import ProductNotFound from "../components/NotFoundOrEmpty";
import NotFoundOrEmpty from "../components/NotFoundOrEmpty";

export default function CatalogPage({
  currentOrderByOption,
  setCurrentOrderByOption,
  clearSearch,
  addFavorite,
  removeFavorite,
  favorites,
  isFavoritesPage,
}: {
  currentOrderByOption: OrderByOption;
  setCurrentOrderByOption: SetOrderByOption;
  clearSearch: () => void;
  addFavorite: AddFavorite;
  removeFavorite: RemoveFavorite;
  favorites: string[];
  isFavoritesPage?: boolean;
}) {
  const { category, subcategory, page = 1 } = useParams();

  const search = useSearchParams()[0].get("search");

  useEffect(() => {
    if (!search) clearSearch();
  }, [search]);

  const getAllItems =
    !category && !subcategory && !isFavoritesPage && search == undefined;

  const catalog = getAllItems
    ? getCatalog(Number(page), currentOrderByOption)
    : getFilteredProducts({
        category: category || "",
        subCategory: subcategory ? subcategory : undefined,
        search: search ? search : undefined,
        orderBy: currentOrderByOption,
        page: Number(page),
        favorites: isFavoritesPage ? favorites : undefined,
      });

  const numberOfPages = getNumberOfPages({
    category,
    subCategory: subcategory,
    search: search ? search : undefined,
    favorites: isFavoritesPage ? favorites : undefined,
  });

  return (
    <>
      {!catalog.length ? (
        isFavoritesPage ? (
          <NotFoundOrEmpty notFoundType="no-favorites" />
        ) : (
          <ProductNotFound notFoundType="no-matching" />
        )
      ) : (
        <>
          <section className="w-full flex justify-center lg:justify-end lg:w-[954px] xl:w-[984px] m-auto">
            <OrderBySelector
              currentSelection={currentOrderByOption}
              setOrderOption={setCurrentOrderByOption}
              classes="my-6"
            />
          </section>
          <section className="w-full grid gap-3 grid-cols-catalog justify-center justify-items-center xl:justify-end xl:justify-items-end">
            {catalog.map((product) => (
              <ProductCard
                key={product.imagesPath}
                product={product}
                addToFavorites={() => addFavorite(product.slug)}
                removeFromFavorites={() => removeFavorite(product.slug)}
                isFavorite={favorites.includes(product.slug)}
                classes="bg-slate-100 my-4 shadow-xs"
              />
            ))}
          </section>
          {numberOfPages > 1 && (
            <section className="w-full flex justify-center mt-2 xl:pl-[12px]">
              <PageSelector
                numberOfPages={numberOfPages}
                category={category}
                subCategory={subcategory}
                currentPage={Number(page)}
                search={search ? search : undefined}
                isFavoritesPage={isFavoritesPage}
              />
            </section>
          )}
        </>
      )}
    </>
  );
}
