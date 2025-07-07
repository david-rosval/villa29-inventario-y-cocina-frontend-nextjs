import React from "react";
import { render, screen } from "@testing-library/react";
import CrecimientoMensual from "./CrecimientoMensual";

// Mock de NumberTicker
jest.mock("../ui/number-ticker", () => ({
  __esModule: true,
  default: ({ value }: { value: number }) => <span>{value}</span>,
}));

describe("CrecimientoMensual", () => {
  it("muestra el título y el valor del crecimiento con símbolo de porcentaje", () => {
    const crecimiento = 12.34;

    render(<CrecimientoMensual crecimientoMensual={crecimiento} />);

    // Verifica el título
    expect(screen.getByText(/Crecimiento mensual/i)).toBeInTheDocument();

    // Verifica el número mostrado
    expect(screen.getByText("12.34")).toBeInTheDocument();

    // Verifica que el símbolo de porcentaje esté presente
    expect(screen.getByText(/%/)).toBeInTheDocument();
  });
});
