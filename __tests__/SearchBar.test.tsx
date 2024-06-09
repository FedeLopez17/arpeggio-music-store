import React, { useState } from "react";
import { describe, it, vi, expect, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import SearchBar from "../src/components/SearchBar";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { searchCatalog } from "../src/catalogManager";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual: {} = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
  };
});

vi.mock("../src/catalogManager", () => ({
  searchCatalog: vi.fn(() => [
    {
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
    {
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
  ]),
}));

vi.mock("../src/utils", () => ({
  formatPrice: vi.fn((number: number) => number),
  getProductImage: vi.fn((imagePath: string) => Promise.resolve(imagePath)),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("SearchBar Component", () => {
  const renderSearchBar = () => {
    const WrapperComponent = () => {
      const [searchBarValue, setSearch] = useState("");
      return (
        <BrowserRouter>
          <SearchBar
            searchBarValue={searchBarValue}
            setSearch={setSearch}
            id="search-bar-1"
          />
        </BrowserRouter>
      );
    };

    return render(<WrapperComponent />);
  };

  it("updates input value and calls setSearch on change", async () => {
    const user = userEvent.setup();
    renderSearchBar();

    const input = screen.getByPlaceholderText("Search");

    await act(async () => {
      await user.type(input, "product");
    });

    expect(input).toHaveValue("product");
  });

  it("calls searchCatalog on input change", async () => {
    const user = userEvent.setup();
    renderSearchBar();

    const input = screen.getByPlaceholderText("Search");

    await act(async () => {
      await user.type(input, "product");
    });

    expect(searchCatalog).toHaveBeenCalled();

    expect(searchCatalog).toHaveBeenCalledWith("product");

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("navigates to search results page on search", async () => {
    const user = userEvent.setup();
    renderSearchBar();

    const input = screen.getByPlaceholderText("Search");
    const searchIcon = screen.getByTestId("magnifying-glass-icon");
    await act(async () => {
      await user.type(input, "product");
    });

    expect(input).toHaveFocus();

    await act(async () => {
      await user.click(searchIcon);
    });

    expect(input).not.toHaveFocus();

    expect(mockNavigate).toHaveBeenCalledWith("/catalog/1/?search=product");
  });
});
