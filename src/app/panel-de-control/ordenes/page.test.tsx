import { render, screen, waitFor } from "@testing-library/react"
import Ordenes from "./page"
import UserProvider, { UserContextType } from "@/components/ordenes/UserProvider"
import { getMock } from "@/__mocks__/axios"
import { socket } from "@/socket"

// Mocks
jest.mock("@/socket", () => ({
  __esModule: true,
  ...jest.requireActual("@/__mocks__/socket"),
}))
jest.mock("axios", () => ({
  __esModule: true,
  ...jest.requireActual("@/__mocks__/axios"),
}))
jest.mock("@/components/ordenes/MozoOrdenes", () => {
  const MockMozoOrdenes = () => <div>Mocked MozoOrdenes</div>
  MockMozoOrdenes.displayName = "MockMozoOrdenes"
  return MockMozoOrdenes
})
jest.mock("@/components/ordenes/CocinaOrdenes", () => {
  const MockCocinaOrdenes = () => <div>Mocked CocinaOrdenes</div>
  MockCocinaOrdenes.displayName = "MockCocinaOrdenes"
  return MockCocinaOrdenes
})

describe("Ordenes Page", () => {
  const mozoUser: UserContextType["user"] = {
    id_usuario: "1",
    nombre: "Mozo",
    apellido: "Uno",
    email: "mozo@villa.com",
    rol: "Mozo/Cajero",
  }

  beforeEach(() => {
    jest.clearAllMocks()
    getMock.mockResolvedValue({ data: [] })

    // Simular socket conectado
    socket.connected = true
  })

  it("renderiza MozoOrdenes para rol Mozo/Cajero", async () => {
    render(
      <UserProvider user={mozoUser}>
        <Ordenes />
      </UserProvider>
    )

    await waitFor(() => {
      expect(screen.getByText("Mocked MozoOrdenes")).toBeInTheDocument()
    })
  })

  it("renderiza CocinaOrdenes para rol Cocinero", async () => {
    const cocinaUser: UserContextType["user"] = {
      id_usuario: "2",
      nombre: "Cocinero",
      apellido: "Dos",
      email: "cocina@villa.com",
      rol: "Cocinero",
    }

    render(
      <UserProvider user={cocinaUser}>
        <Ordenes />
      </UserProvider>
    )

    await waitFor(() => {
      expect(screen.getByText("Mocked CocinaOrdenes")).toBeInTheDocument()
    })
  })

  it("llama a axios.get una vez al montar el componente", async () => {
    render(
      <UserProvider user={mozoUser}>
        <Ordenes />
      </UserProvider>
    )

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith("/api/pedidos")
    })
  })

  it("registra y ejecuta eventos socket correctamente", async () => {
    const handlers: Record<string, () => void> = {}

    const mockOn = (event: string, listener: () => void) => {
      handlers[event] = listener
      return socket
    }

    // Sobrescribir socket.on con la función mockeada
    // @ts-expect-error forzamos asignación válida para test
    socket.on = mockOn

    render(
      <UserProvider user={mozoUser}>
        <Ordenes />
      </UserProvider>
    )

    await waitFor(() => {
      expect(handlers["pedido-listo"]).toBeDefined()
      expect(handlers["nuevo-pedido"]).toBeDefined()
      expect(handlers["pedido-entregado"]).toBeDefined()
    })

    // Simular eventos recibidos del servidor
    handlers["pedido-listo"]?.()
    handlers["nuevo-pedido"]?.()
    handlers["pedido-entregado"]?.()

    // Debido al batching de React, solo se vuelve a ejecutar getOrdenes() una vez
    await waitFor(() => {
      expect(getMock).toHaveBeenCalledTimes(2) // mount + 1 render por cambio de estado
    })
  })
})
