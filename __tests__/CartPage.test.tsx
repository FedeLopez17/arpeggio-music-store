import React from "react";
import CartPage from "../src/pages/CartPage";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ShoppingCart } from "../src/types";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { formatPrice } from "../src/utils";

const mockedRemoveProduct = vi.fn();
const mockedUpdateProductQuantity = vi.fn();
const mockShoppingCart: ShoppingCart = [
  {
    product: {
      name: "Product 1",
      brand: "brand",
      slug: "slug1",
      categoryId: "category",
      subCategoryId: "subCategory",
      imagesPath: "imagesPath1",
      price: 100,
      rating: 5,
      attributes: {},
    },
    quantity: 1,
  },
  {
    product: {
      name: "Product 2",
      brand: "brand",
      slug: "slug2",
      categoryId: "category",
      subCategoryId: "subCategory",
      imagesPath: "imagesPath2",
      price: 100,
      rating: 5,
      attributes: {},
    },
    quantity: 1,
  },
];

describe("Cart Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderCartPage = (cartElements: ShoppingCart = []) => {
    render(
      <CartPage
        removeProduct={mockedRemoveProduct}
        updateProductQuantity={mockedUpdateProductQuantity}
        shoppingCart={cartElements}
      />,
      { wrapper: BrowserRouter }
    );
  };

  it("renders elements correctly when cart is empty", () => {
    renderCartPage();
    expect(screen.getByText(/Empty/)).toBeInTheDocument();
  });

  it("renders elements correctly when cart has elements", () => {
    renderCartPage(mockShoppingCart);

    expect(screen.getAllByTestId("cart-item").length).toBe(
      mockShoppingCart.length
    );
    mockShoppingCart.forEach((cartItem) => {
      expect(screen.getByText(cartItem.product.name)).toBeInTheDocument();
    });
  });

  it("calls removeProduct function when remove product button is clicked", async () => {
    const user = userEvent.setup();
    renderCartPage(mockShoppingCart);

    const removeButton = screen.getAllByTitle("Remove")[0];
    expect(removeButton).toBeInTheDocument();

    await user.click(removeButton);

    expect(mockedRemoveProduct).toBeCalledTimes(1);
  });

  it("calls updateQuantityProduct function when new quantity is selected", async () => {
    const user = userEvent.setup();
    renderCartPage(mockShoppingCart);

    const quantitySelector = screen.getAllByLabelText("Quantity")[0];
    expect(quantitySelector).toBeInTheDocument();

    await user.selectOptions(quantitySelector, "2");

    expect(mockedUpdateProductQuantity).toHaveBeenCalledWith(
      mockShoppingCart[0].product.slug,
      2
    );
    expect(mockedUpdateProductQuantity).toBeCalledTimes(1);
  });

  it("shows correct price", async () => {
    renderCartPage(mockShoppingCart);

    const totalPrice = mockShoppingCart.reduce(
      (accum, cartItem) => accum + cartItem.product.price,
      0
    );

    expect(screen.getByText(formatPrice(totalPrice))).toBeInTheDocument();
  });
});
