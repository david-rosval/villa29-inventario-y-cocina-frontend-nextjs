import { render, screen } from "@testing-library/react"
import TopCategorias from "./TopCategorias"

const mockTopCategorias = [
  { categoria: "Hamburguesas", gananciaTotal: 1250.50 },
  { categoria: "Bebidas", gananciaTotal: 870.30 },
]

describe("TopCategorias component", () => {
  it("renderiza el título correctamente", () => {
    render(<TopCategorias topCategorias={mockTopCategorias} />)
    expect(
      screen.getByText("Ventas según Categorías de productos")
    ).toBeInTheDocument()
  })

  it("renderiza el gráfico correctamente", () => {
    render(<TopCategorias topCategorias={mockTopCategorias} />)
    const chartContainer = screen.getByTestId("chart-container")
    expect(chartContainer).toBeInTheDocument()
  })
})
