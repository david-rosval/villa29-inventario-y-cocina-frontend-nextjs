import React from "react";
import { render, screen } from "@testing-library/react";
import TotalEntregados from "./TotalEntregados";

// Mock de NumberTicker
jest.mock("../ui/number-ticker", () => ({
  __esModule: true,
  default: ({ value }: { value: number }) => <span>{value}</span>,
}));

describe("TotalEntregados", () => {
  it("muestra el título y la proporción entregados/total correctamente", () => {
    const entregados = 42;
    const totalPedidos = 50;

    render(<TotalEntregados entregados={entregados} totalPedidos={totalPedidos} />);

    // Verifica el título
    expect(screen.getByText(/Pedidos entregados/i)).toBeInTheDocument();

    // Verifica el número de pedidos entregados
    expect(screen.getByText("42")).toBeInTheDocument();

    // Verifica el total mostrado junto al número
    expect(screen.getByText(`/50`)).toBeInTheDocument();
  });
});
