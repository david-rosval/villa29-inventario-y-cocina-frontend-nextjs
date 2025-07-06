import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import OrdenCocina from "./OrdenCocina"
import { OrdenesContext } from "./OrdenesProvider"
import { putMock } from "@/__mocks__/axios"
import { type Orden as OrdenType } from "@/lib/types/pedidos"

jest.mock("@/socket", () => ({
  socket: {
    connected: true,
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    io: {
      engine: {
        transport: { name: "polling" },
        on: jest.fn(),
      },
    },
  },
}))

jest.mock("axios", () => jest.requireActual("@/__mocks__/axios"))

describe("OrdenCocina", () => {
  const mockSetNotificaciones = jest.fn()

  const orden: OrdenType = {
    _id: "060720251200",
    estado: "En preparación", // <--- Para mostrar el botón activo
    fecha: "06/07/2025",
    horaAsignado: "12:00",
    pedidos: [
      {
        cantidad: 1,
        menuItem: {
          categoria: "Comida",
          id: 1,
          img: "hamburguesa.jpg",
          nombre: "Hamburguesa",
          precion: 10,
          _id: "menuitem1"
        },
        _id: "pedido1"
      },
      {
        cantidad: 1,
        menuItem: {
          categoria: "Comida",
          id: 2,
          img: "papas.jpg",
          nombre: "Papas",
          precion: 5,
          _id: "menuitem2"
        },
        _id: "pedido2"
      },
    ],
    precioTotal: 15,
    nota: "Sin cebolla",
  }

  beforeEach(() => {
    jest.clearAllMocks()
    putMock.mockResolvedValue({ status: 200 })
  })

  it("muestra los detalles de la orden y permite marcar como listo", async () => {
    const { socket } = await import("@/socket")

    render(
      <OrdenesContext.Provider value={{ setNotificaciones: mockSetNotificaciones, ordenes: [] }}>
        <OrdenCocina orden={orden} i={0} />
      </OrdenesContext.Provider>
    )

    expect(screen.getByText("Hamburguesa")).toBeInTheDocument()
    expect(screen.getByText("Papas")).toBeInTheDocument()

    const button = screen.getByText("Marcar como Listo para entregar")
    fireEvent.click(button)

    await waitFor(() => {
      expect(putMock).toHaveBeenCalledWith("/api/pedidos", {
        id: orden._id,
        estado: orden.estado,
      })

      expect(socket.emit).toHaveBeenCalledWith("pedido-listo", {
        message: "COCINA: pedido listo para que el mozo lo retire",
      })

      expect(mockSetNotificaciones).toHaveBeenCalledTimes(1)
      const updateFn = mockSetNotificaciones.mock.calls[0][0]
      expect(typeof updateFn).toBe("function")

      const result = updateFn(["Notificación previa"])
      expect(result).toEqual([
        "Notificación previa",
        "COCINA: pedido listo para que el mozo lo retire"
      ])
    })

  })
})
