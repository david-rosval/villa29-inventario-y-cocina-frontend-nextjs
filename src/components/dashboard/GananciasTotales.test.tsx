import React from "react";
import { render, screen } from "@testing-library/react";
import GananciasTotales from "./GananciasTotales";

// Mock de NumberTicker
jest.mock("../ui/number-ticker", () => ({
  __esModule: true,
  default: ({ value }: { value: number }) => <span>{value.toFixed(2)}</span>,
}));

describe("GananciasTotales", () => {
  it("muestra el título y la ganancia total correctamente", () => {
    const ganancia = 1234.56;

    render(<GananciasTotales gananciaTotal={ganancia} />);

    // Verifica el título
    expect(screen.getByText(/Ganancias totales/i)).toBeInTheDocument();

    // Verifica el número renderizado (formato con 2 decimales)
    expect(screen.getByText("1234.56")).toBeInTheDocument();

    // Verifica el símbolo S/.
    expect(screen.getByText("S/.")).toBeInTheDocument();
  });
});
