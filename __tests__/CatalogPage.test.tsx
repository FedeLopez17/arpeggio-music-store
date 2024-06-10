import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Params } from "react-router-dom";
import CatalogPage from "../src/pages/CatalogPage";
import {
  AddFavorite,
  OrderByOption,
  RemoveFavorite,
  SetOrderByOption,
} from "../src/types";
import {
  getCatalog,
  getFilteredProducts,
  getNumberOfPages,
} from "../src/catalogManager";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual: {} = await importOriginal();
  return {
    ...actual,
    useParams: (): Readonly<Params<string>> => ({
      category: undefined,
      subcategory: undefined,
      page: "1",
    }),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

vi.mock("../src/catalogManager", () => ({
  getCatalog: vi.fn(),
  getFilteredProducts: vi.fn(),
  getNumberOfPages: vi.fn(() => 1),
}));

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

const mockedSetCurrentOrderByOption = vi.fn();
const mockedClearSearch = vi.fn();
const mockedAddFavorite = vi.fn();
const mockedRemoveFavorite = vi.fn();

const defaultProps = {
  currentOrderByOption: "Price: high to low" as OrderByOption,
  setCurrentOrderByOption: mockedSetCurrentOrderByOption,
  clearSearch: mockedClearSearch,
  addFavorite: mockedAddFavorite,
  removeFavorite: mockedRemoveFavorite,
  favorites: [],
  isFavoritesPage: false,
};

describe("Catalog Page", () => {
  const renderCatalogPage = (props?: {
    currentOrderByOption?: OrderByOption;
    setCurrentOrderByOption?: SetOrderByOption;
    clearSearch?: () => void;
    addFavorite?: AddFavorite;
    removeFavorite?: RemoveFavorite;
    favorites?: string[];
    isFavoritesPage?: boolean;
  }) => {
    render(<CatalogPage {...defaultProps} {...props} />, {
      wrapper: BrowserRouter,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getCatalog).mockReturnValue([
      {
        name: "Product 1",
        brand: "Abrand",
        slug: "product1",
        categoryId: "category",
        subCategoryId: "subcategory",
        imagesPath: "imagesPath1",
        price: 50,
        rating: 2,
        attributes: { attribute1: "value1", attribute2: "value2" },
      },
      {
        name: "Product 2",
        brand: "Bbrand",
        slug: "product2",
        categoryId: "category",
        subCategoryId: "subcategory",
        imagesPath: "imagesPath2",
        price: 100,
        rating: 3,
        attributes: { attribute1: "value1", attribute2: "value2" },
      },
      {
        name: "Product 3",
        brand: "Cbrand",
        slug: "product3",
        categoryId: "category",
        subCategoryId: "subcategory",
        imagesPath: "imagesPath3",
        price: 150,
        rating: 5,
        attributes: { attribute1: "value1", attribute2: "value2" },
      },
    ]);
  });

  it("renders the OrderBySelector component", () => {
    renderCatalogPage();

    expect(screen.getByText("Price: high to low")).toBeInTheDocument();
  });

  it("renders products correctly", () => {
    renderCatalogPage();

    ["Product 1", "Product 2", "Product 3"].forEach((product) => {
      expect(screen.getByText(product)).toBeInTheDocument();
    });
  });

  it("renders PageSelector when there are multiple pages", () => {
    vi.mocked(getNumberOfPages).mockReturnValue(2);

    renderCatalogPage();

    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("clears search when no search query is present", () => {
    renderCatalogPage();
    expect(mockedClearSearch).toHaveBeenCalled();
  });

  it("calls setCurrentOrderByOption on OrderBySelector change", async () => {
    const user = userEvent.setup();
    renderCatalogPage();

    const orderBySelector = screen.getByRole("combobox");
    await user.selectOptions(orderBySelector, "Price: low to high");

    expect(mockedSetCurrentOrderByOption).toHaveBeenCalledWith(
      "Price: low to high"
    );
  });

  it("renders 'product not found message' when no products are found", () => {
    vi.mocked(getCatalog).mockReturnValue([]);
    renderCatalogPage();

    expect(screen.getByRole("heading").textContent).toBe(
      "Sorry, there are no matching products!"
    );
  });

  it("renders 'no favorites' message when no favorites are found", () => {
    vi.mocked(getFilteredProducts).mockReturnValue([]);
    renderCatalogPage({ isFavoritesPage: true });

    expect(screen.getByRole("heading").textContent).toBe(
      "Your favorites section is Empty!"
    );
  });
});
