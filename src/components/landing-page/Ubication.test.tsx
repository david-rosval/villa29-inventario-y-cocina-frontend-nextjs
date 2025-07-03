import { render, screen } from "@testing-library/react";
import Ubication from "./Ubication";
import "@testing-library/jest-dom";

describe("Ubication component", () => {
  beforeEach(() => {
    render(<Ubication />);
  });

  it("renders the main section heading", () => {
    const heading = screen.getByRole("heading", { name: /ubícanos/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the location icon and text", () => {
    const locationTitle = screen.getByRole("heading", { name: /ubicación/i });
    expect(locationTitle).toBeInTheDocument();

    expect(
      screen.getByText(/sector 3 grupo 29 manzana f lote 3/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/villa el salvador/i)).toBeInTheDocument();
  });

  it("renders the schedule icon and text", () => {
    const scheduleTitle = screen.getByRole("heading", { name: /horario/i });
    expect(scheduleTitle).toBeInTheDocument();

    expect(
      screen.getByText(/Lun, Mie, Jue, Vie, Sab, Dom/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/7:00 PM A 11:00 PM/i)).toBeInTheDocument();
  });

  it("renders the Google Maps iframe", () => {
    const iframe = screen.getByTitle(/ubicación villa 29/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", expect.stringContaining("google.com/maps/embed"));
  });
});
