import productsJson from "./data/products.json";
import { ProductType } from "./types";

export function getAllProducts(): ProductType[] {
  return productsJson;
}

export function getProductBySlug(slug: string): ProductType | null {
  const product: ProductType | undefined = productsJson.find(
    (product) => product.slug === slug
  );

  return product ? product : null;
}

export function getFilteredProducts({
  category,
  subCategory,
  brand,
  orderBy,
  order,
}: {
  category?: string;
  subCategory?: string;
  brand?: string;
  orderBy?: "name" | "rating" | "price";
  order?: "ascending" | "descending";
}): ProductType[] {
  if (subCategory && !category) {
    throw new Error("Subcategory requires category");
  }

  const filteredProducts = productsJson.filter(
    (product) =>
      (!category || category === product.categoryId) &&
      (!subCategory || subCategory === product.subCategoryId) &&
      (!brand || brand === product.brand)
  );

  if (orderBy && order) {
    filteredProducts.sort((productA, productB) => {
      let comparison = 0;
      if (orderBy === "name") {
        comparison = productA.name.localeCompare(productB.name);
      } else if (orderBy === "rating") {
        comparison = productB.rating - productA.rating;
      } else {
        comparison = productA.price - productB.price;
      }
      return order === "descending" ? -comparison : comparison;
    });
  }

  return filteredProducts;
}
