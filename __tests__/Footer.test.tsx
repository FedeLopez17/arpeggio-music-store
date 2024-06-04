import React from "react";
import Footer from "../src/components/Footer";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Footer", () => {
  it("renders logo image", () => {
    render(<Footer />, { wrapper: BrowserRouter });

    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
  });

  it("renders store description paragraph", () => {
    render(<Footer />, { wrapper: BrowserRouter });

    const paragraph = screen.getByText(
      /Arpeggio is your ultimate destination for all things musical/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("renders navbar list items correctly", () => {
    render(<Footer />, { wrapper: BrowserRouter });

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
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

  it("renders social media icons", () => {
    render(<Footer />, { wrapper: BrowserRouter });

    const facebookIcon = screen.getByTitle("facebook");
    const instagramIcon = screen.getByTitle("instagram");
    const twitterIcon = screen.getByTitle("twitter");

    expect(facebookIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
  });
});
