import { render, screen, act } from "@testing-library/react";
import MostRequested from "./MostRequested";
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe("MostRequested", () => {
  beforeEach(() => {
    render(<MostRequested />);
  });

  it("renders the main section heading", () => {
    expect(
      screen.getByRole("heading", { name: /los más pedidos/i })
    ).toBeInTheDocument();
  });

  it("renders all 3 product titles and prices", () => {
    expect(screen.getByText("Cuba Libre")).toBeInTheDocument();
    expect(screen.getByText("S/ 20.00")).toBeInTheDocument();

    expect(screen.getByText("Hamb. Cheese")).toBeInTheDocument();
    expect(screen.getByText("S/ 12.90")).toBeInTheDocument();

    expect(screen.getByText("Alitas BBQ")).toBeInTheDocument();
    expect(screen.getByText("S/ 18.00")).toBeInTheDocument();
  });

  it("renders all 3 images with correct alt text", () => {
    expect(screen.getByAltText("Cuba libre")).toBeInTheDocument();
    expect(screen.getByAltText("Hamburguesa Cheese")).toBeInTheDocument();
    expect(screen.getByAltText("Alitas BBQ")).toBeInTheDocument();
  });

  it("activates each card in order every 2.5 seconds", () => {
    const getCardContainer = (alt: string) =>
      screen.getByAltText(alt).parentElement as HTMLElement;

    const card1 = getCardContainer("Cuba libre");
    const card2 = getCardContainer("Hamburguesa Cheese");
    const card3 = getCardContainer("Alitas BBQ");

    expect(card1).toHaveClass("scale-105");
    expect(card2).not.toHaveClass("scale-105");
    expect(card3).not.toHaveClass("scale-105");

    act(() => {
      jest.advanceTimersByTime(2500);
    });
    expect(card2).toHaveClass("scale-105");
    expect(card1).not.toHaveClass("scale-105");
    expect(card3).not.toHaveClass("scale-105");

    act(() => {
      jest.advanceTimersByTime(2500);
    });
    expect(card3).toHaveClass("scale-105");

    act(() => {
      jest.advanceTimersByTime(2500);
    });
    expect(card1).toHaveClass("scale-105");
  });
});
