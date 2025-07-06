// src/components/ordenes/__tests__/CocinaOrdenes.test.tsx

import { render, screen, fireEvent } from "@testing-library/react"
import CocinaOrdenes from "./CocinaOrdenes"
import { OrdenesContext } from "./OrdenesProvider"
import { obtenerFechaHoraLima } from "@/lib/utils"

jest.mock("./OrdenCocina", () => {
  const MockOrdenCocina = ({ orden }: { orden: { _id: string } }) => <div>Mocked OrdenCocina #{orden._id}</div>
  MockOrdenCocina.displayName = "MockOrdenCocina"
  return MockOrdenCocina
})

describe("CocinaOrdenes", () => {
  const fechaActual = obtenerFechaHoraLima()[0]
  const ordenesMock = [
    {
      _id: "111",
      estado: "En preparación",
      fecha: fechaActual,
      horaAsignado: "12:00",
      pedidos: [],
      precioTotal: 30,
    },
    {
      _id: "222",
      estado: "Listo",
      fecha: fechaActual,
      horaAsignado: "13:00",
      pedidos: [],
      precioTotal: 50,
    },
  ]

  it("renderiza órdenes filtradas y permite cambiar el filtro", () => {
    render(
      <OrdenesContext.Provider value={{ ordenes: ordenesMock, setNotificaciones: jest.fn() }}>
        <CocinaOrdenes />
      </OrdenesContext.Provider>
    )

    expect(screen.getByText("Órdenes")).toBeInTheDocument()
    expect(screen.getByText(fechaActual)).toBeInTheDocument()
    expect(screen.getByText("Mocked OrdenCocina #111")).toBeInTheDocument()
    expect(screen.queryByText("Mocked OrdenCocina #222")).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Listos"))
    expect(screen.getByText("Mocked OrdenCocina #222")).toBeInTheDocument()
    expect(screen.queryByText("Mocked OrdenCocina #111")).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Todos"))
    expect(screen.getByText("Mocked OrdenCocina #111")).toBeInTheDocument()
    expect(screen.getByText("Mocked OrdenCocina #222")).toBeInTheDocument()
  })

  it("muestra mensaje si no hay órdenes", () => {
    render(
      <OrdenesContext.Provider value={{ ordenes: [], setNotificaciones: jest.fn() }}>
        <CocinaOrdenes />
      </OrdenesContext.Provider>
    )

    expect(screen.getByText("No hay órdenes para mostrar")).toBeInTheDocument()
  })
})
