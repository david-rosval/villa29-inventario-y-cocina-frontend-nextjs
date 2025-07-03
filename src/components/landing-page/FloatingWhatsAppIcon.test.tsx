import { render, screen, fireEvent } from "@testing-library/react";
import FloatingWhatsAppIcon from "./FloatingWhatsAppIcon";
import "@testing-library/jest-dom";

describe("FloatingWhatsAppIcon", () => {
  beforeEach(() => {
    // Espiamos window.open antes de cada test
    jest.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the WhatsApp icon", () => {
    render(<FloatingWhatsAppIcon />);
    const icon = screen.getByAltText("WhatsApp");
    expect(icon).toBeInTheDocument();
  });

  it("has tooltip hidden by default", () => {
    render(<FloatingWhatsAppIcon />);
    const tooltip = screen.getByText(/¿Desea pedir un delivery/i);
    expect(tooltip).toHaveClass("opacity-0");
  });

  it("opens WhatsApp chat on click", () => {
    render(<FloatingWhatsAppIcon />);
    const clickable = screen.getByRole("img", { hidden: true }).closest("div");

    if (!clickable) throw new Error("Clickable container not found");

    fireEvent.click(clickable);

    const expectedUrl =
      "https://wa.me/+51937280900?text=" +
      encodeURIComponent("Buenas, quisiera solicitar un delivery, por favor.");

    expect(window.open).toHaveBeenCalledWith(expectedUrl, "_blank");
  });
});
