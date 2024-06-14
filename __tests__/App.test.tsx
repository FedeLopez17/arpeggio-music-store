import React from "react";
import App from "../src/App";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const getPrice = (product: HTMLElement) =>
  parseInt(
    (product.querySelector(".product-price")?.textContent as string).slice(1)
  );

const getRating = (product: HTMLElement) =>
  parseFloat(
    (product.querySelector(".product-rating")?.textContent as string).slice(
      1,
      -1
    )
  );

const getName = (product: HTMLElement) =>
  product.querySelector(".product-name")?.textContent as string;

describe("App", () => {
  beforeEach(() => {
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
  });

  it("renders products in the correct order", async () => {
    const user = userEvent.setup();
    render(<App />);

    const catalogButton = screen.getAllByText("Catalog")[0];
    await user.click(catalogButton);

    const orderBySeletor = screen.getByRole("combobox");
    expect(orderBySeletor).toHaveValue("Price: high to low");

    const productsHighToLow = screen.getAllByTestId(/product-card-/);
    const productPricesHighToLow = productsHighToLow.map(getPrice);

    for (let index = 1; index < productPricesHighToLow.length; index++) {
      expect(productPricesHighToLow[index]).toBeLessThanOrEqual(
        productPricesHighToLow[index - 1]
      );
    }

    await act(async () => {
      await user.selectOptions(orderBySeletor, "Price: low to high");
    });

    const productsLowToHigh = screen.getAllByTestId(/product-card-/);
    const productPricesLowToHigh = productsLowToHigh.map(getPrice);

    for (let index = 1; index < productPricesLowToHigh.length; index++) {
      expect(productPricesLowToHigh[index]).toBeGreaterThanOrEqual(
        productPricesLowToHigh[index - 1]
      );
    }

    await act(async () => {
      await user.selectOptions(orderBySeletor, "Best rated first");
    });

    const productsBestFirst = screen.getAllByTestId(/product-card-/);
    const productRatings = productsBestFirst.map(getRating);

    for (let index = 1; index < productRatings.length; index++) {
      expect(productRatings[index]).toBeLessThanOrEqual(
        productRatings[index - 1]
      );
    }

    await act(async () => {
      await user.selectOptions(orderBySeletor, "Alphabet (A-Z)");
    });

    const productsAZ = screen.getAllByTestId(/product-card-/);
    const productNamesAZ = productsAZ.map(getName);

    expect(productNamesAZ).toEqual(
      [...productNamesAZ].sort((productA, productB) =>
        productA.localeCompare(productB)
      )
    );

    await act(async () => {
      await user.selectOptions(orderBySeletor, "Alphabet (Z-A)");
    });

    const productsZA = screen.getAllByTestId(/product-card-/);
    const productNamesZA = productsZA.map(getName);

    expect(productNamesZA).toEqual(
      [...productNamesZA].sort((productA, productB) =>
        productB.localeCompare(productA)
      )
    );
  });

  it("adds product to favorites", async () => {
    const user = userEvent.setup();
    render(<App />);

    const catalogButton = screen.getAllByText("Catalog")[0];
    await user.click(catalogButton);

    const product = screen.getAllByTestId(/product-card-/)[0];
    await act(async () => {
      await user.click(
        product.querySelector(".favorite-toggle-add") as Element
      );
    });

    await user.click(screen.getByText("Favorites"));
    expect(screen.getByText(getName(product))).toBeInTheDocument();
  });

  it("removes product from favorites", async () => {
    const user = userEvent.setup();
    render(<App />);

    const catalogButton = screen.getAllByText("Catalog")[0];
    await user.click(catalogButton);

    await user.click(screen.getByText("Favorites"));

    const product = screen.getAllByTestId(/product-card-/)[0];

    await act(async () => {
      await user.click(
        product.querySelector(".favorite-toggle-remove") as Element
      );
    });

    expect(screen.queryByText(getName(product))).toBeNull();
  });

  it("adds product to cart", async () => {
    const user = userEvent.setup();
    render(<App />);

    const catalogButton = screen.getAllByText("Catalog")[0];
    await user.click(catalogButton);

    const product = screen.getAllByTestId(/product-card-/)[0];

    await user.click(product);

    const addToCartButton = screen.getAllByText("ADD TO CART")[0];

    await act(async () => {
      await user.click(addToCartButton);
    });

    const cartButton = screen.getAllByText("Cart")[0];
    await user.click(cartButton);

    expect(screen.getByText(getName(product))).toBeInTheDocument();
  });

  it("removes product from cart", async () => {
    const user = userEvent.setup();
    render(<App />);

    const cartButton = screen.getAllByText("Cart")[0];
    await user.click(cartButton);

    const product = screen.getByTestId("cart-item");
    expect(product).toBeInTheDocument();

    const productName = (product.querySelector(".product-name") as Element)
      .textContent as string;

    const removeButton = screen.getByTitle("Remove");
    await act(async () => {
      await user.click(removeButton);
    });

    expect(screen.queryByText(productName)).toBeNull();
    expect(screen.getByText(/Empty/)).toBeInTheDocument();
  });

  it("searches for product using the search bar", async () => {
    const user = userEvent.setup();
    render(<App />);

    const catalogButton = screen.getAllByText("Catalog")[0];
    await user.click(catalogButton);

    const product = screen.getAllByTestId(/product-card-/)[0];
    const productName = getName(product);

    const searchBar = screen.getAllByPlaceholderText("Search")[0];
    await act(async () => {
      await user.type(searchBar, productName);
    });

    const searchResultItem = screen.getByTitle(`Search result ${productName}`);
    await user.click(searchResultItem);

    expect(screen.getAllByRole("heading", { name: productName })).toHaveLength(
      2
    );
    expect(screen.getByTestId("slideshow")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
