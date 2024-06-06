import React from "react";
import AboutPage from "../src/pages/AboutPage";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

describe("About Page", () => {
  it("renders elements correctly", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { name: "Disclaimer" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Source Code" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "LinkedIn" })
    ).toBeInTheDocument();
  });
});
