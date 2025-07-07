import { render, screen } from "@testing-library/react"
import AdminDashboard from "@/components/ordenes/AdminDashboard"

// Mock de getOrdenes y dashboardInfo
jest.mock("@/lib/ordenes/actions", () => ({
  getOrdenes: jest.fn(),
}))
jest.mock("@/lib/utils", () => {
  const originalModule = jest.requireActual("@/lib/utils")
  return {
    ...originalModule,
    dashboardInfo: jest.fn(),
  }
})

import { getOrdenes } from "@/lib/ordenes/actions"
import { dashboardInfo } from "@/lib/utils"

describe("AdminDashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renderiza todos los bloques del dashboard", async () => {
    const mockOrdenes = [
      {
        estado: "Entregado",
        horaTerminado: "13:30",
        horaAsignado: "13:00",
        fecha: "01/07/2025",
        precioTotal: 100,
        pedidos: [
          { menuItem: { nombre: "Hamburguesa", categoria: "Fast Food" }, cantidad: 2 },
        ],
      },
    ]

    const mockDashboardInfo = {
      gananciaMensual: [{ mes: "Julio", ganancia: 100 }],
      gananciaDiaria: [{ dia: "01/07/2025", ingreso: 100 }],
      entregaPromedio: "00:30",
      gananciaTotal: 100,
      totalPedidos: 1,
      entregados: 1,
      crecimientoMensual: 0,
      topProductos: [
        { nombre: "Hamburguesa", totalGanancia: 100, totalCantidad: 2 },
      ],
      topCategorias: [
        { categoria: "Fast Food", gananciaTotal: 100 },
      ],
    }

    ;(getOrdenes as jest.Mock).mockResolvedValue(mockOrdenes)
    ;(dashboardInfo as jest.Mock).mockReturnValue(mockDashboardInfo)

    render(await AdminDashboard())

    // Verifica textos clave en la UI
    expect(screen.getByText("Reportes")).toBeInTheDocument()
    expect(screen.getByText("Ganancias totales")).toBeInTheDocument()
    expect(screen.getByText("Pedidos entregados")).toBeInTheDocument()
    expect(screen.getByText("Crecimiento mensual")).toBeInTheDocument()
    expect(screen.getByText("Tiempo promedio de entrega")).toBeInTheDocument()
    expect(screen.getByText("Top productos")).toBeInTheDocument()
    expect(screen.getByText("Ventas según Categorías de productos")).toBeInTheDocument()
  })
})
