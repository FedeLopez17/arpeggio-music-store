import React from "react";
import HeroSlideshow from "../src/components/HeroSlideshow";
import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const MAX_IMAGE_INDEX = 6;

describe("HeroSlideshow", () => {
  const getImageIndexFromId = (testId: string) => parseInt(testId.slice(6));

  const setup = () => {
    render(<HeroSlideshow />, { wrapper: BrowserRouter });
    const initialImage = screen.getByTestId(/image/);
    expect(initialImage).toBeInTheDocument();
    const initialImageIndex = getImageIndexFromId(
      initialImage.getAttribute("data-testid") as string
    );
    return { initialImageIndex };
  };

  const clickArrow = async (arrowTitle: "Previous" | "Next") => {
    const user = userEvent.setup();
    const arrow = screen.getByTitle(arrowTitle);
    await act(async () => await user.click(arrow));
  };

  it("cycles to the next image after 5 seconds", () => {
    vi.useFakeTimers();
    const { initialImageIndex } = setup();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const nextImage = screen.getByTestId(
      `image-${
        initialImageIndex < MAX_IMAGE_INDEX ? initialImageIndex + 1 : "0"
      }`
    );
    expect(nextImage).toBeInTheDocument();

    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("cycles to the previous image when the left arrow is clicked", async () => {
    const { initialImageIndex } = setup();

    await clickArrow("Previous");

    const previousImage = screen.queryByTestId(
      initialImageIndex
        ? `image-${initialImageIndex - 1}`
        : `image-${MAX_IMAGE_INDEX}`
    );

    expect(previousImage).toBeInTheDocument();
  });

  it("cycles to the next image when the right arrow is clicked", async () => {
    const { initialImageIndex } = setup();

    await clickArrow("Next");

    const nextImage = screen.queryByTestId(
      initialImageIndex == MAX_IMAGE_INDEX
        ? "image-0"
        : `image-${initialImageIndex + 1}`
    );

    expect(nextImage).toBeInTheDocument();
  });
});
