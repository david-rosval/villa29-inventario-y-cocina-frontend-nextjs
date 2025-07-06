// src/components/ordenes/__tests__/OrdenesProvider.test.tsx
import { render, screen } from "@testing-library/react"
import OrdenesProvider, { OrdenesContext } from "./OrdenesProvider"
import { Orden } from "@/lib/types/pedidos"

describe("OrdenesProvider", () => {
  const mockOrdenes: Orden[] = [
    {
      _id: "1",
      estado: "pendiente",
      fecha: "2025-07-06",
      horaAsignado: "12:00",
      pedidos: [],
      precioTotal: 100,
    },
  ]

  const mockState = {
    ordenes: mockOrdenes,
    setNotificaciones: jest.fn(),
  }

  it("renders children and provides context", () => {
    render(
      <OrdenesProvider state={mockState}>
        <OrdenesContext.Consumer>
          {(context) => (
            <>
              <div>{context.ordenes[0].estado}</div>
              <button onClick={() => context.setNotificaciones(["test"])}>Notify</button>
            </>
          )}
        </OrdenesContext.Consumer>
      </OrdenesProvider>
    )

    expect(screen.getByText("pendiente")).toBeInTheDocument()
    screen.getByRole("button").click()
    expect(mockState.setNotificaciones).toHaveBeenCalledWith(["test"])
  })
})
