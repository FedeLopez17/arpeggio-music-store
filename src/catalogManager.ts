import productsJson from "./data/products.json";
import { OrderByOption, ProductType } from "./types";

function orderCatalog(orderBy: OrderByOption, catalog: ProductType[]) {
  catalog.sort((productA, productB) => {
    switch (orderBy) {
      case "Price: low to high":
        return productA.price - productB.price;
      case "Price: high to low":
        return productB.price - productA.price;
      case "Best rated first":
        return productB.rating - productA.rating;
      case "Brand":
        return productA.brand.localeCompare(productB.brand);
      case "Alphabet (A-Z)":
        return productA.name.localeCompare(productB.name);
      default:
        return productB.name.localeCompare(productA.name);
    }
  });

  return catalog;
}

export function getCatalog(orderBy: OrderByOption): ProductType[] {
  return orderCatalog(orderBy, productsJson);
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
  orderBy,
}: {
  category: string;
  orderBy: OrderByOption;
  subCategory?: string;
}): ProductType[] {
  if (subCategory && !category) {
    throw new Error("Subcategory requires category");
  }

  const filteredProducts = productsJson.filter(
    (product) =>
      (!category || category === product.categoryId) &&
      (!subCategory || subCategory === product.subCategoryId)
  );

  return orderCatalog(orderBy, filteredProducts);
}
