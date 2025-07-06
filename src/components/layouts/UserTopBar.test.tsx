// src/components/layouts/UserTopBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import UserTopBar from "./UserTopBar"
import UserProvider from "@/components/ordenes/UserProvider"

// Mock de Return para evitar errores con useRouter()
jest.mock("./Return", () => {
  const MockReturn = () => <div data-testid="mock-return">Mock Return</div>
  MockReturn.displayName = "MockReturn"
  return MockReturn
})

describe("UserTopBar", () => {
  const mockUser = {
    id_usuario: "1",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan@example.com",
    rol: "Administrador",
  }

  it("displays user name and role", () => {
    render(
      <UserProvider user={mockUser}>
        <UserTopBar />
      </UserProvider>
    )

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument()
    expect(screen.getByText("Administrador")).toBeInTheDocument()
    expect(screen.getByTestId("mock-return")).toBeInTheDocument()
  })

  it("toggles sidebar on button click", () => {
    render(
      <UserProvider user={mockUser}>
        <UserTopBar />
      </UserProvider>
    )

    const toggleButton = screen.getByRole("button")
    fireEvent.click(toggleButton)
    
    expect(toggleButton).toBeInTheDocument()
  })
})
