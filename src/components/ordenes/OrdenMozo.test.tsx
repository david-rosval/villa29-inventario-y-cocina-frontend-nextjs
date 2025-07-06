// src/components/ordenes/__tests__/OrdenMozo.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Orden from "./OrdenMozo"
import { OrdenesContext } from "./OrdenesProvider"
import { socket } from "@/socket"
import { Orden as OrdenType } from "@/lib/types/pedidos"
import { actualizarEstadoEntregado } from "@/lib/ordenes/actions"


jest.mock("@/lib/ordenes/actions", () => ({
  actualizarEstadoEntregado: jest.fn().mockResolvedValue(undefined),
}))

jest.mock("@/socket", () => ({
  __esModule: true,
  socket: {
    emit: jest.fn(),
  },
}))

describe("OrdenMozo", () => {
  const mockSetNotificaciones = jest.fn()

  const orden: OrdenType = {
    _id: "060720251200",
    estado: "Listo",
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

  it("muestra los detalles de una orden", () => {
    render(
      <OrdenesContext.Provider value={{ setNotificaciones: mockSetNotificaciones, ordenes: [] }}>
        <Orden orden={orden} i={0} />
      </OrdenesContext.Provider>
    )

    expect(screen.getByText("Orden 060720251200")).toBeInTheDocument()
    expect(screen.getByText("Hamburguesa")).toBeInTheDocument()
    expect(screen.getByText("Papas")).toBeInTheDocument()
  })

  it("permite marcar como entregado", async () => {
    render(
      <OrdenesContext.Provider value={{ setNotificaciones: mockSetNotificaciones, ordenes: [] }}>
        <Orden orden={orden} i={0} />
      </OrdenesContext.Provider>
    )

    const button = screen.getByText("Marcar como entregado")
    await fireEvent.click(button)

    await waitFor(() => {
      expect(socket.emit).toHaveBeenCalledWith("pedido-entregado", {
        message: expect.any(String),
      })
    })

    expect(actualizarEstadoEntregado).toHaveBeenCalledWith({
      id: orden._id,
      horaTerminado: expect.any(String),
    })
  })
})
