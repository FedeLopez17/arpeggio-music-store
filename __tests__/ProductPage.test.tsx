import React from "react";
import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import ProductPage from "../src/pages/ProductPage";
import { ShoppingCart } from "../src/types";
import { Params } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", () => ({
  useParams: (): Readonly<Params<string>> => ({
    category: "category",
    subcategory: "subcategory",
    product: "product1",
  }),
}));

vi.mock("../src/catalogManager", () => {
  return {
    getProductBySlug: vi.fn().mockReturnValue({
      name: "Product 1",
      brand: "brand",
      slug: "product1",
      categoryId: "category",
      subCategoryId: "subcategory",
      imagesPath: "imagesPath1",
      price: 100,
      rating: 5,
      attributes: { attribute1: "value1", attribute2: "value2" },
    }),
  };
});

vi.mock("../src/utils", async (importOriginal) => {
  const actual: {} = await importOriginal();
  return {
    ...actual,
    getProductImageURLs: vi
      .fn()
      .mockResolvedValue(["image1.jpg", "image2.jpg"]),
    formatPrice: vi.fn((number: number) => number),
  };
});

const mockAddProduct = vi.fn();
const mockRemoveProduct = vi.fn();
const mockAddFavorite = vi.fn();
const mockRemoveFavorite = vi.fn();
const mockShoppingCart: ShoppingCart = [
  {
    product: {
      name: "Product 1",
      brand: "brand",
      slug: "product1",
      categoryId: "category",
      subCategoryId: "subcategory",
      imagesPath: "imagesPath1",
      price: 100,
      rating: 5,
      attributes: { attribute1: "value1", attribute2: "value2" },
    },
    quantity: 1,
  },
  {
    product: {
      name: "Product 2",
      brand: "brand",
      slug: "product2",
      categoryId: "category",
      subCategoryId: "subcategory",
      imagesPath: "imagesPath2",
      price: 100,
      rating: 5,
      attributes: { attribute1: "value1", attribute2: "value2" },
    },
    quantity: 1,
  },
];

const mockFavorites = ["product1", "product2"];

describe("ProductPage", () => {
  beforeEach(() => {
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderProductPage = async (
    favorites: string[] = mockFavorites,
    shoppingCart: ShoppingCart = mockShoppingCart
  ) => {
    await act(async () =>
      render(
        <ProductPage
          addProduct={mockAddProduct}
          removeProduct={mockRemoveProduct}
          shoppingCart={shoppingCart}
          addFavorite={mockAddFavorite}
          removeFavorite={mockRemoveFavorite}
          favorites={favorites}
        />
      )
    );
  };

  it("renders slideshow", async () => {
    await renderProductPage([], []);
    expect(screen.getByTestId("slideshow")).toBeInTheDocument();
  });

  it("renders attribute table correctly", async () => {
    await renderProductPage([], []);

    const attributeTable = screen.getByRole("table");
    const headers = screen.getAllByRole("columnheader");
    const rows = screen.getAllByRole("row");

    expect(attributeTable).toBeInTheDocument();
    expect(headers).toHaveLength(2);
    expect(rows).toHaveLength(2);
    expect(rows[0].firstChild?.textContent).toBe("attribute1");
    expect(rows[1].firstChild?.textContent).toBe("attribute2");
    expect(rows[0].lastChild?.textContent).toBe("value1");
    expect(rows[1].lastChild?.textContent).toBe("value2");
  });

  it("renders 'add to cart' button and quantity selector when the product isn't in the cart", async () => {
    const user = userEvent.setup();
    await renderProductPage([], []);

    const addToCartButtons = screen.getAllByText("ADD TO CART");
    addToCartButtons.forEach((addToCartButton) =>
      expect(addToCartButton).toBeInTheDocument()
    );

    await act(async () => {
      await user.click(addToCartButtons[0]);
    });

    expect(mockAddProduct).toBeCalledTimes(1);

    screen
      .getAllByTitle("Quantity")
      .forEach((quantitySelector) =>
        expect(quantitySelector).toBeInTheDocument()
      );
  });

  it("renders 'remove from cart' button when the product is already in the cart", async () => {
    const user = userEvent.setup();
    await renderProductPage();

    const removeFromCartButtons = screen.getAllByText("REMOVE FROM CART");
    removeFromCartButtons.forEach((removeFromCartButton) =>
      expect(removeFromCartButton).toBeInTheDocument()
    );

    await act(async () => {
      await user.click(removeFromCartButtons[0]);
    });

    expect(mockRemoveProduct).toBeCalledTimes(1);
  });

  it("renders 'Add to Favorites' toggle when the product isn't in favourites", async () => {
    const user = userEvent.setup();
    await renderProductPage([], []);

    const addToFavouritesToggle = screen.getAllByTitle("Add to Favorites");
    addToFavouritesToggle.forEach((toggle) =>
      expect(toggle).toBeInTheDocument()
    );

    await act(async () => {
      await user.click(addToFavouritesToggle[0]);
    });

    expect(mockAddFavorite).toBeCalledTimes(1);
  });

  it("renders 'Remove from Favorites' toggle when the product isn't in favourites", async () => {
    const user = userEvent.setup();
    await renderProductPage();

    const removeFromFavouritesToggle = screen.getAllByTitle(
      "Remove from Favorites"
    );
    removeFromFavouritesToggle.forEach((toggle) =>
      expect(toggle).toBeInTheDocument()
    );

    await act(async () => {
      await user.click(removeFromFavouritesToggle[0]);
    });

    expect(mockRemoveFavorite).toBeCalledTimes(1);
  });
});
