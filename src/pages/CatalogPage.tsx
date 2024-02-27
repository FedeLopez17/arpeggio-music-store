import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getCatalog, getFilteredProducts } from "../catalogManager";

export default function ProductsPage() {
  const { category, subcategory } = useParams();

  const noParams = !category && !subcategory;
  const catalog = noParams
    ? getCatalog()
    : getFilteredProducts({
        category,
        subCategory: subcategory ? subcategory : undefined,
      });

  return (
    <section className="grid gap-3">
      {!catalog.length ? (
        <h4>No matching products</h4>
      ) : (
        catalog.map((product) => (
          <ProductCard key={product.imagesPath} product={product} />
        ))
      )}
    </section>
  );
}
