import productsJson from "./data/products.json";
import { OrderByOption, ProductType } from "./types";
import { shuffleArray } from "./utils";

const MAX_PRODUCTS_PER_PAGE = 24;

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

function filterCatalog({
  category,
  subCategory,
  favorites,
}: {
  category?: string;
  subCategory?: string;
  favorites?: string[];
}) {
  return productsJson.filter((product) =>
    favorites !== undefined
      ? favorites.includes(product.slug)
      : (!category || category === product.categoryId) &&
        (!subCategory || subCategory === product.subCategoryId)
  );
}

export function searchCatalog(searchTerm: string) {
  if (!searchTerm) return [];

  const words = searchTerm.split(/\s+/);

  return productsJson.filter((product) =>
    words.every(
      (word) =>
        product.name.toLocaleLowerCase().includes(word.toLocaleLowerCase()) ||
        product.brand.toLocaleLowerCase().includes(word.toLocaleLowerCase())
    )
  );
}

function getCatalogPageContent(page: number, products: ProductType[]) {
  const startingIndex = MAX_PRODUCTS_PER_PAGE * (page - 1);
  const endingIndex = startingIndex + MAX_PRODUCTS_PER_PAGE;

  return page <= getNumberOfPages({ products })
    ? products.slice(startingIndex, endingIndex)
    : [];
}

export function getNumberOfPages({
  products,
  category,
  subCategory,
  search,
  favorites,
}: {
  products?: ProductType[];
  category?: string;
  subCategory?: string;
  search?: string;
  favorites?: string[];
}) {
  const productsArr = products
    ? products
    : search
    ? searchCatalog(search)
    : category || favorites !== undefined
    ? filterCatalog({ category, subCategory, favorites })
    : productsJson;

  return Math.ceil(productsArr.length / MAX_PRODUCTS_PER_PAGE);
}

export function getCatalog(
  page: number,
  orderBy?: OrderByOption
): ProductType[] {
  const products = orderBy ? orderCatalog(orderBy, productsJson) : productsJson;
  return getCatalogPageContent(page, products);
}

export function getProductBySlug(slug: string): ProductType | null {
  const product: ProductType | undefined = productsJson.find(
    (product) => product.slug === slug
  );

  return product ? product : null;
}

export function getFilteredProducts({
  page,
  category,
  subCategory,
  search,
  orderBy,
  favorites,
}: {
  page: number;
  category?: string;
  subCategory?: string;
  search?: string;
  orderBy: OrderByOption;
  favorites?: string[];
}): ProductType[] {
  if (
    (subCategory && !category) ||
    (!category && !search && favorites == undefined)
  ) {
    throw new Error("Missing arguments");
  }

  const filteredProducts = search
    ? searchCatalog(search)
    : favorites !== undefined
    ? filterCatalog({ favorites })
    : filterCatalog({ category: category as string, subCategory });

  orderCatalog(orderBy, filteredProducts);

  return getCatalogPageContent(page, filteredProducts);
}

export function getHighlitedProducts(limit: number) {
  const bestRatedProducts = productsJson.filter(
    (product) => product.rating === 5
  );
  return shuffleArray(bestRatedProducts).slice(0, limit);
}
