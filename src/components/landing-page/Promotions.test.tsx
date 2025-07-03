import { render, screen } from "@testing-library/react";
import Promotions from "./Promotions";
import "@testing-library/jest-dom";

describe("Promotions component", () => {
  beforeEach(() => {
    render(<Promotions />);
  });

  it("renders the main title", () => {
    const title = screen.getByRole("heading", { name: /promociones/i });
    expect(title).toBeInTheDocument();
  });

  it("renders the main promotion image with correct alt text", () => {
    const promoImage = screen.getByAltText("Promoción Alitas");
    expect(promoImage).toBeInTheDocument();
    expect(promoImage).toHaveAttribute("src", expect.stringContaining("promocion"));
  });

  it("renders the gif image with correct alt text", () => {
    const gifImage = screen.getByAltText("Promoción Gif");
    expect(gifImage).toBeInTheDocument();
    expect(gifImage).toHaveAttribute("src", expect.stringContaining("gif-promotions"));
  });

  it("renders the card title", () => {
    const cardTitle = screen.getByRole("heading", {
      name: /todos los 15 y fines de mes/i,
    });
    expect(cardTitle).toBeInTheDocument();
  });

  it("renders the promotional descriptive text", () => {
    expect(
      screen.getByText(/Disfruta de 6 alitas a solo 15 soles/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No te lo pierdas y celebra con nosotros en Villa 29/i)
    ).toBeInTheDocument();
  });
});
