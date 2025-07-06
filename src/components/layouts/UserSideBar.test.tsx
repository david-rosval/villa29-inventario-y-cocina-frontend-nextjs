import { render, screen, fireEvent } from "@testing-library/react"
import UserSideBar from "@/components/layouts/UserSideBar"
import UserProvider from "@/components/ordenes/UserProvider"
import { mockUser } from "@/test-utils/mockUser"
import { logout } from "@/lib/auth/actions"

jest.mock("next/navigation", () => ({
  usePathname: () => "/panel-de-control", // simula ruta activa
}))

jest.mock("@/lib/auth/actions", () => ({
  logout: jest.fn(),
}))

describe("UserSideBar", () => {
  it("renders all links and highlights active path", () => {
    render(
      <UserProvider user={mockUser}>
        <UserSideBar />
      </UserProvider>
    )

    expect(screen.getByText("Inicio")).toBeInTheDocument()
    expect(screen.getByText("Órdenes")).toBeInTheDocument()
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Usuarios")).toBeInTheDocument()
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument()

    expect(screen.getByText("Inicio").closest("button")).toHaveClass("bg-secondary")
  })

  it("calls logout when 'Cerrar sesión' is clicked", () => {
    render(
      <UserProvider user={mockUser}>
        <UserSideBar />
      </UserProvider>
    )
    const logoutBtn = screen.getByText("Cerrar sesión")
    fireEvent.click(logoutBtn)
    expect(logout).toHaveBeenCalled()
  })
})
