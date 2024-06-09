import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PageSelector from "../src/components/PageSelector";

describe("PageSelector Component", () => {
  const renderPageSelector = (props?: {
    currentPage?: number;
    numberOfPages?: number;
    category?: string;
    subCategory?: string;
    search?: string;
    isFavoritesPage?: boolean;
  }) => {
    return render(
      <BrowserRouter>
        <PageSelector
          {...{ ...{ numberOfPages: 10, currentPage: 5 }, ...props }}
        />
      </BrowserRouter>
    );
  };

  it("renders correct number of page links", () => {
    renderPageSelector();

    const pageLinks = screen.getAllByRole("link");
    // Ensure Previous and Next links are also included
    expect(pageLinks.length).toBe(11);
  });

  it("renders Previous and Next buttons", () => {
    renderPageSelector();

    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it("renders the Previous button only when not on the first page", () => {
    renderPageSelector({ currentPage: 1 });

    expect(screen.queryByText(/Previous/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it("renders the Next button only when not on the last page", () => {
    renderPageSelector({ currentPage: 10 });

    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.queryByText(/Next/i)).not.toBeInTheDocument();
  });

  it("highlights the current page", () => {
    renderPageSelector();

    const activePageLink = screen.getByTestId("active-5");
    expect(activePageLink).toBeInTheDocument();
  });

  it("generates correct links", () => {
    renderPageSelector();

    const pageLinks = screen.getAllByTestId(/(inactive|active)/);
    pageLinks.forEach((pageLink, index) => {
      expect(pageLink).toHaveAttribute("href", `/catalog/${index + 1}`);
    });
  });

  it("generates correct links for search", () => {
    renderPageSelector({
      search: "query",
    });

    const pageLinks = screen.getAllByTestId(/(inactive|active)/);
    pageLinks.forEach((pageLink, index) => {
      expect(pageLink).toHaveAttribute(
        "href",
        `/catalog/${index + 1}/?search=query`
      );
    });
  });

  it("generates correct links for favorites", () => {
    renderPageSelector({
      isFavoritesPage: true,
    });

    const pageLinks = screen.getAllByTestId(/(inactive|active)/);
    pageLinks.forEach((pageLink, index) => {
      expect(pageLink).toHaveAttribute(
        "href",
        `/catalog/favorites/${index + 1}`
      );
    });
  });

  it("generates correct links for category", () => {
    renderPageSelector({
      category: "category",
    });

    const pageLinks = screen.getAllByTestId(/(inactive|active)/);
    pageLinks.forEach((pageLink, index) => {
      expect(pageLink).toHaveAttribute(
        "href",
        `/catalog/category/${index + 1}`
      );
    });
  });

  it("generates correct links for category and subcategory", () => {
    renderPageSelector({
      category: "category",
      subCategory: "subcategory",
    });

    const pageLinks = screen.getAllByTestId(/(inactive|active)/);
    pageLinks.forEach((pageLink, index) => {
      expect(pageLink).toHaveAttribute(
        "href",
        `/catalog/category/subcategory/${index + 1}`
      );
    });
  });
});
