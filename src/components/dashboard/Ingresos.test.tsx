import { render, screen, fireEvent } from "@testing-library/react"
import Ingresos from "./Ingresos" // ajusta la ruta si es necesario

const mockDiario = [
  { dia: "01/07/2025", ingreso: 108.59 },
  { dia: "02/07/2025", ingreso: 292.92 },
]

const mockMensual = [
  { mes: "Ene", ganancia: 1678.89 },
  { mes: "Feb", ganancia: 2829.47 },
]

describe("Ingresos component", () => {
  it("renderiza correctamente el título y la descripción", () => {
    render(<Ingresos diario={mockDiario} mensual={mockMensual} />)
    expect(screen.getByText("Ingresos")).toBeInTheDocument()
    expect(
      screen.getByText(/Mostrando el total de ingresos/i)
    ).toBeInTheDocument()
  })

  it("muestra los botones de gráfico diario y mensual", () => {
    render(<Ingresos diario={mockDiario} mensual={mockMensual} />)
    expect(screen.getByText("Diario")).toBeInTheDocument()
    expect(screen.getByText("Mensual")).toBeInTheDocument()
  })

  it("cambia a gráfico mensual al hacer clic", () => {
    const { container } = render(<Ingresos diario={mockDiario} mensual={mockMensual} />)

    const mensualButton = screen.getByText("Mensual")
    fireEvent.click(mensualButton)

    const activeButtons = container.querySelectorAll('[data-active="true"]')
    expect(activeButtons.length).toBe(1)
    expect(activeButtons[0].textContent).toContain("Mensual")
  })
})
