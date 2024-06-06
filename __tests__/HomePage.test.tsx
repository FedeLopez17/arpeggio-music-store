import React from "react";
import HomePage from "../src/pages/HomePage";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Home Page", () => {
  it("renders elements", () => {
    render(<HomePage />, { wrapper: BrowserRouter });

    const slideshow = screen.getByTestId("hero-slideshow");
    const mainCategoriesHeading = screen.getByRole("heading", {
      name: "Main Categories",
    });
    const productBanners = screen.getAllByTitle("Product Banner");
    const productHighlightsHeading = screen.getByRole("heading", {
      name: "Product Highlights",
    });
    const testimonialsHeading = screen.getByRole("heading", {
      name: "In Your Own Words",
    });

    expect(slideshow).toBeInTheDocument();
    expect(mainCategoriesHeading).toBeInTheDocument();
    expect(mainCategoriesHeading.parentElement?.children.length).toBe(2);
    expect(productBanners.length).toBeGreaterThanOrEqual(2);
    expect(productHighlightsHeading).toBeInTheDocument();
    expect(productHighlightsHeading.parentElement?.children.length).toBe(2);
    expect(testimonialsHeading).toBeInTheDocument();
    expect(testimonialsHeading.parentElement?.children.length).toBe(2);
  });
});
