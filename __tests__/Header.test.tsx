import React from "react";
import Header from "../src/components/Header";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const mockedCloseSideBar = vi.fn();
const mockedOpenSideBar = vi.fn();
const mockedSetSearch = vi.fn();

const renderHeader = (props = {}) => {
  const defaultProps = {
    isCatalogPage: false,
    sideBarActive: false,
    cartHasItems: false,
    openSideBar: mockedOpenSideBar,
    closeSideBar: mockedCloseSideBar,
    searchBarValue: "",
    setSearch: mockedSetSearch,
  };

  return render(<Header {...defaultProps} {...props} />, {
    wrapper: BrowserRouter,
  });
};

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders logo image correctly", () => {
    renderHeader();

    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
  });

  it("renders navbar items correctly", () => {
    renderHeader();

    expect(screen.getAllByPlaceholderText("Search").length).toEqual(2);

    const logo = screen.getByRole("img");
    expect(logo.closest("a")).toHaveAttribute("href", "/");

    expect(screen.getByText("Catalog").closest("a")).toHaveAttribute(
      "href",
      "/catalog/1"
    );
    expect(screen.getByText("Cart").closest("a")).toHaveAttribute(
      "href",
      "/cart"
    );
    expect(screen.getByText("About").closest("a")).toHaveAttribute(
      "href",
      "/about"
    );
  });

  it("renders hamburguer icon in catalog page", () => {
    renderHeader({ isCatalogPage: true });
    expect(screen.getByTestId("hamburger-icon")).toBeInTheDocument();
  });

  it("renders x-mark icon in catalog page", () => {
    renderHeader({ isCatalogPage: true, sideBarActive: true });
    expect(screen.getByTestId("x-mark-icon")).toBeInTheDocument();
  });

  it("renders cart notification when cart has items", () => {
    renderHeader({ cartHasItems: true });
    expect(screen.getByTestId("notification-icon")).toBeInTheDocument();
  });

  it("doesn't render cart notification when cart is empty", () => {
    renderHeader();
    expect(screen.queryByTestId("notification-icon")).not.toBeInTheDocument();
  });

  it("calls openSideBar when hamburger icon is clicked", async () => {
    const user = userEvent.setup();
    renderHeader({ isCatalogPage: true });
    const hamburgerIcon = screen.getByTestId("hamburger-icon");
    await user.click(hamburgerIcon);
    expect(mockedOpenSideBar).toHaveBeenCalledTimes(1);
  });

  it("does not call openSideBar when it is not the catalog page", () => {
    renderHeader({ isCatalogPage: false });

    const hamburgerIcon = screen.queryByTestId("hamburger-icon");
    expect(hamburgerIcon).not.toBeInTheDocument();
    expect(mockedOpenSideBar).toHaveBeenCalledTimes(0);
  });
});
