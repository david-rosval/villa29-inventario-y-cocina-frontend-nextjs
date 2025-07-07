import React from "react";
import { render, screen } from "@testing-library/react";
import PromedioEntrega from "./PromedioEntrega";

// Mock del NumberTicker
jest.mock("../ui/number-ticker", () => ({
  __esModule: true,
  default: ({ value }: { value: number }) => <span>{value}</span>,
}));

describe("PromedioEntrega", () => {
  it("muestra el título y los minutos correctamente extraídos del string", () => {
    const entregaPromedio = "00:17:45"; // 17 minutos

    render(<PromedioEntrega entregaPromedio={entregaPromedio} />);

    // Verifica el título
    expect(screen.getByText(/Tiempo promedio de entrega/i)).toBeInTheDocument();

    // Verifica los minutos extraídos y renderizados
    expect(screen.getByText("17")).toBeInTheDocument();

    // Verifica que se muestra el texto "min"
    expect(screen.getByText(/min/i)).toBeInTheDocument();
  });
});
