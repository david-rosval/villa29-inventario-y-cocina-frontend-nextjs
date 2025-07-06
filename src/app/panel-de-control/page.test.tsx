import { render, screen } from "@testing-library/react"
import PanelDeControl from "./page"
import { UserContext } from "@/components/ordenes/UserProvider"
import type { UserContextType } from "@/components/ordenes/UserProvider"

// Mock del componente PanelDeControlComponent
jest.mock("@/components/panel-de-control/PanelDeControlComponent", () => ({
  __esModule: true,
  default: () => <div>Mocked PanelDeControlComponent</div>,
}))

// Mock del componente UserSideBar
jest.mock("@/components/layouts/UserSideBar", () => ({
  __esModule: true,
  default: ({ toggle }: { toggle: boolean }) => (
    <div>Mocked UserSideBar (toggle: {String(toggle)})</div>
  ),
}))

describe("PanelDeControl (page.tsx)", () => {
  const baseUser = {
    id_usuario: "1",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan@example.com",
    rol: "Administrador",
  }

  it("renders welcome message and PanelDeControlComponent when toggleSideBar is false", () => {
    const mockContextValue: UserContextType = {
      user: baseUser,
      toggleSideBar: false,
      setToggleSideBar: jest.fn(),
    }

    render(
      <UserContext.Provider value={mockContextValue}>
        <PanelDeControl />
      </UserContext.Provider>
    )

    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent === "Bienvenido al Panel de control de Villa 29"
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(/Administra la comunicación con cocina/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText("Mocked PanelDeControlComponent")
    ).toBeInTheDocument()
  })

  it("renders UserSideBar when toggleSideBar is true", () => {
    const mockContextValue: UserContextType = {
      user: baseUser,
      toggleSideBar: true,
      setToggleSideBar: jest.fn(),
    }

    render(
      <UserContext.Provider value={mockContextValue}>
        <PanelDeControl />
      </UserContext.Provider>
    )

    expect(
      screen.getByText("Mocked UserSideBar (toggle: true)")
    ).toBeInTheDocument()
  })
})
