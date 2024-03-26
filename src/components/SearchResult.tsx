import { Link } from "react-router-dom";
import { ProductType } from "../types";
import SearchResultItem from "./SearchResultItem";

export default function SearchResult({
  products,
  search,
}: {
  products: ProductType[];
  search: string;
}) {
  const searchResultItems: JSX.Element[] = [];
  for (let i = 0; i < (products.length > 3 ? 3 : products.length); i++) {
    searchResultItems[i] = (
      <SearchResultItem product={products[i]} key={products[i].slug} />
    );
  }

  return (
    <section className="flex flex-col absolute top-1 z-30 bg-gray-300">
      <section className="flex flex-col gap-1">{searchResultItems}</section>
      {products.length > 3 && (
        <section>
          <Link to={`/catalog/1/?search=${search}`}>
            <p>{products.length} products found</p>
          </Link>
        </section>
      )}
    </section>
  );
}
