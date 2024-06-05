import React from "react";
import Header from "../src/components/Header";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const mockedCloseSideBar = vi.fn();
const mockedOpenSideBar = vi.fn();
const mockedSetSearch = vi.fn();

describe("Header", () => {
  it("renders logo image correctly", () => {
    render(
      <Header
        isCatalogPage={false}
        sideBarActive={false}
        cartHasItems={false}
        openSideBar={mockedOpenSideBar}
        closeSideBar={mockedCloseSideBar}
        searchBarValue=""
        setSearch={mockedSetSearch}
      />,
      { wrapper: BrowserRouter }
    );

    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
  });

  it("renders navbar items correctly", () => {
    render(
      <Header
        isCatalogPage={false}
        sideBarActive={false}
        cartHasItems={false}
        openSideBar={mockedOpenSideBar}
        closeSideBar={mockedCloseSideBar}
        searchBarValue=""
        setSearch={mockedSetSearch}
      />,
      { wrapper: BrowserRouter }
    );

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
    render(
      <Header
        isCatalogPage={true}
        sideBarActive={false}
        cartHasItems={false}
        openSideBar={mockedOpenSideBar}
        closeSideBar={mockedCloseSideBar}
        searchBarValue=""
        setSearch={mockedSetSearch}
      />,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByTitle("Toggle Sidebar")).toBeInTheDocument();
  });
});
