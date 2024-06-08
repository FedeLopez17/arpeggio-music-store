import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import Slideshow from "../src/components/Slideshow";
import userEvent from "@testing-library/user-event";
import { afterEach } from "node:test";

const imageUrls = ["image1.jpg", "image2.jpg"];

vi.mock("../src/utils", () => ({
  checkVisibility: vi.fn().mockResolvedValue(true),
}));

describe("Product Slideshow", () => {
  const clickArrow = async (arrowTitle: "Previous" | "Next") => {
    const user = userEvent.setup();
    const arrow = screen.getByTitle(arrowTitle);
    await act(async () => await user.click(arrow));
  };

  const clickImagePreview = async (previewIndex: 0 | 1) => {
    const user = userEvent.setup();
    const previewImage = screen.getByTestId(`image-selector-${previewIndex}`);
    await act(async () => await user.click(previewImage));
  };

  beforeEach(() => {
    vi.clearAllMocks();

    global.Image = vi.fn().mockImplementation(() => ({
      onload: () => {},
      set src(_url: string) {
        setTimeout(() => {
          this.onload();
        }, 0);
      },
    }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the slideshow component", async () => {
    render(<Slideshow imageUrls={imageUrls} />);
    expect(screen.getByTestId("slideshow")).toBeInTheDocument();
  });

  it("renders initial image", async () => {
    render(<Slideshow imageUrls={imageUrls} />);

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toHaveAttribute(
        "src",
        imageUrls[0]
      )
    );

    expect(screen.getByTestId("slideshow")).toBeInTheDocument();
  });

  it("displays the next image when the next button is clicked", async () => {
    const user = userEvent.setup();
    render(<Slideshow imageUrls={imageUrls} />);

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toHaveAttribute(
        "src",
        imageUrls[0]
      )
    );

    await clickArrow("Next");

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toHaveAttribute(
        "src",
        imageUrls[1]
      )
    );
  });

  it("displays the previous image when the previous button is clicked", async () => {
    render(<Slideshow imageUrls={imageUrls} />);

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toHaveAttribute(
        "src",
        imageUrls[0]
      )
    );

    await clickArrow("Next");

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toHaveAttribute(
        "src",
        imageUrls[1]
      )
    );

    await clickArrow("Previous");

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toHaveAttribute(
        "src",
        imageUrls[0]
      )
    );
  });

  it("can switch images by clicking the small preview images", async () => {
    const user = userEvent.setup();
    render(<Slideshow imageUrls={imageUrls} />);

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toHaveAttribute(
        "src",
        imageUrls[0]
      )
    );

    await clickImagePreview(1);

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toHaveAttribute(
        "src",
        imageUrls[1]
      )
    );

    await clickImagePreview(0);

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toHaveAttribute(
        "src",
        imageUrls[0]
      )
    );
  });

  it("displays a loading skeleton while the image is loading", async () => {
    render(<Slideshow imageUrls={imageUrls} />);

    expect(screen.getByTestId("image-loading-skeleton")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByAltText("Product image")).toBeInTheDocument()
    );

    expect(screen.queryByTestId("image-loading-skeleton")).toBeNull();
  });
});
