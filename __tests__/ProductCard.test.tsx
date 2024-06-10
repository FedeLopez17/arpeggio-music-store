import React from "react";
import ProductCard from "../src/components/ProductCard";
import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ProductType } from "../src/types";

const mockedAddToFavorites = vi.fn();
const mockedRemoveFromFavorites = vi.fn();

describe("Product Card", () => {
  const renderProductCard = (isFavorite = false, product?: ProductType) => {
    render(
      <ProductCard
        product={
          product || {
            name: "Product 1",
            brand: "Abrand",
            slug: "product1",
            categoryId: "category",
            subCategoryId: "subcategory",
            imagesPath: "imagesPath1",
            price: 50,
            rating: 2,
            attributes: { attribute1: "value1", attribute2: "value2" },
          }
        }
        addToFavorites={mockedAddToFavorites}
        removeFromFavorites={mockedRemoveFromFavorites}
        isFavorite={isFavorite}
      />,
      { wrapper: BrowserRouter }
    );
  };

  it("renders card", () => {
    renderProductCard();

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/product/category/subcategory/product1"
    );
  });

  it("handles favorite toggle interaction", async () => {
    const user = userEvent.setup();
    renderProductCard();

    const addToFavoritesToggle = screen.getByTitle("Add to Favorites");
    await act(async () => {
      await user.click(addToFavoritesToggle);
    });

    expect(mockedAddToFavorites).toHaveBeenCalled();

    renderProductCard(true);

    const removeFromFavoritesToggle = screen.getByTitle(
      "Remove from Favorites"
    );

    await act(async () => {
      await user.click(removeFromFavoritesToggle);
    });

    expect(mockedRemoveFromFavorites).toHaveBeenCalled();
  });
});
