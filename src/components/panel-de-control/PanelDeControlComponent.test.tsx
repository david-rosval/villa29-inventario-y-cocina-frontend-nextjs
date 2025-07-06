import { render, screen } from "@testing-library/react"
import PanelDeControlComponent from "./PanelDeControlComponent"
import UserProvider, { UserContextType } from "@/components/ordenes/UserProvider"

describe("PanelDeControlComponent", () => {
  const adminUser: UserContextType["user"] = {
    id_usuario: "1",
    nombre: "Admin",
    apellido: "User",
    email: "admin@example.com",
    rol: "Administrador",
  }

  const normalUser: UserContextType["user"] = {
    id_usuario: "2",
    nombre: "Empleado",
    apellido: "User",
    email: "user@example.com",
    rol: "Empleado",
  }

  it("renders all features for Administrador", () => {
    render(
      <UserProvider user={adminUser}>
        <PanelDeControlComponent />
      </UserProvider>
    )

    expect(screen.getByText("Ordenes")).toBeInTheDocument()
    expect(screen.getByText("Usuarios")).toBeInTheDocument()
    expect(screen.getByText("Crear Orden")).toBeInTheDocument()
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("renders limited features for non-Administrador", () => {
    render(
      <UserProvider user={normalUser}>
        <PanelDeControlComponent />
      </UserProvider>
    )

    expect(screen.getByText("Ordenes")).toBeInTheDocument()
    expect(screen.getByText("Crear Orden")).toBeInTheDocument()
    expect(screen.queryByText("Usuarios")).not.toBeInTheDocument()
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument()
  })

  it("has a link to manage orders", () => {
    render(
      <UserProvider user={adminUser}>
        <PanelDeControlComponent />
      </UserProvider>
    )

    const link = screen.getByRole("link", { name: /Gestionar ordenes/i })
    expect(link).toHaveAttribute("href", "/panel-de-control/ordenes")
  })
})
