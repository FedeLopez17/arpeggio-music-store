import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getAllProducts, getFilteredProducts } from "../productsManager";

export default function ProductsPage() {
  const { category, subcategory } = useParams();

  const noParams = !category && !subcategory;
  const products = noParams
    ? getAllProducts()
    : getFilteredProducts({
        category,
        subCategory: subcategory ? subcategory : undefined,
      });

  return (
    <section className="grid gap-3">
      {products.map((product) => (
        <ProductCard key={product.imagesPath} product={product} />
      ))}
    </section>
  );
}
