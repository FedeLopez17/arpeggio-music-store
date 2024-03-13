import { ProductType } from "../types";
import SearchResultItem from "./SearchResultItem";

export default function SearchResult({
  products,
}: {
  products: ProductType[];
}) {
  const searchResultItems: JSX.Element[] = [];
  for (let i = 0; i < (products.length > 3 ? 3 : products.length); i++) {
    searchResultItems[i] = (
      <SearchResultItem product={products[i]} key={products[i].slug} />
    );
  }

  return (
    <section className="flex flex-col absolute top-1 z-20 bg-gray-300">
      <section className="flex flex-col gap-1">{searchResultItems}</section>
      {products.length > 3 && (
        <section>
          {/* TODO: this 'p' tag below should be within a link to a catalog page that shows all matching products */}
          <p>{products.length} products found</p>
        </section>
      )}
    </section>
  );
}
