import { render, screen } from "@testing-library/react"
import TopProductos from "./TopProductos"

const mockTopProductos = [
  { nombre: "Hamburguesa Clásica", totalCantidad: 120, totalGanancia: 1245.5 },
  { nombre: "Pizza Personal", totalCantidad: 95, totalGanancia: 950.0 },
  { nombre: "Inka Cola", totalCantidad: 200, totalGanancia: 600.75 },
]

describe("TopProductos component", () => {
  it("renderiza título y descripción", () => {
    render(<TopProductos topProductos={mockTopProductos} />)

    expect(screen.getByText("Top productos")).toBeInTheDocument()
    expect(
      screen.getByText(/Top 10 de los productos más vendidos/i)
    ).toBeInTheDocument()
  })

  it("renderiza los encabezados de la tabla", () => {
    render(<TopProductos topProductos={mockTopProductos} />)

    expect(screen.getByText("Top")).toBeInTheDocument()
    expect(screen.getByText("Producto")).toBeInTheDocument()
    expect(screen.getByText("Cantidad vendida")).toBeInTheDocument()
    expect(screen.getByText("Ganancia total")).toBeInTheDocument()
  })

  it("muestra los productos correctamente", () => {
    render(<TopProductos topProductos={mockTopProductos} />)

    // Recorremos cada producto y verificamos su presencia
    mockTopProductos.forEach((producto, index) => {
      expect(screen.getByText((index + 1).toString())).toBeInTheDocument()
      expect(screen.getByText(producto.nombre)).toBeInTheDocument()
      expect(screen.getByText(producto.totalCantidad.toString())).toBeInTheDocument()
      expect(screen.getByText(`S/.${producto.totalGanancia.toFixed(2)}`)).toBeInTheDocument()
    })
  })
})
