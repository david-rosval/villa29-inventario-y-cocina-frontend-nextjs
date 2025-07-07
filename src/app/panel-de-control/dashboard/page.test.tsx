import { render, screen } from "@testing-library/react"

// Mock del Server Component y funciones
jest.mock("@/components/ordenes/AdminDashboard", () => {
  const MockAdminDashboard = () => (
    <div data-testid="admin-dashboard">Admin Dashboard Mock</div>
  )
  MockAdminDashboard.displayName = "MockAdminDashboard"
  return MockAdminDashboard
})
jest.mock("@/lib/auth/actions", () => ({
  getUser: jest.fn(),
}))

import { getUser } from "@/lib/auth/actions"
import Dashboard from "./page"

describe("Dashboard Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("muestra AdminDashboard si el usuario es administrador", async () => {
    ;(getUser as jest.Mock).mockResolvedValue({ rol: "Administrador" })

    render(await Dashboard())

    expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument()
  })

  it("muestra mensaje de acceso denegado si no es administrador", async () => {
    ;(getUser as jest.Mock).mockResolvedValue({ rol: "Cocinero" })

    render(await Dashboard())

    expect(
      screen.getByText("Ups! No tienes acceso esta página")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Necesitas permisos de administrador para poder ingresar")
    ).toBeInTheDocument()
  })

  it("muestra mensaje de acceso denegado si getUser retorna undefined", async () => {
    ;(getUser as jest.Mock).mockResolvedValue(undefined)

    render(await Dashboard())

    expect(
      screen.getByText("Ups! No tienes acceso esta página")
    ).toBeInTheDocument()
  })
})
