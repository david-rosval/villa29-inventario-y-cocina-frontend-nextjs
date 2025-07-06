// src/components/ordenes/__tests__/MozoOrdenes.test.tsx

import { render, screen, fireEvent } from "@testing-library/react"
import MozoOrdenes from "./MozoOrdenes"
import { OrdenesContext } from "./OrdenesProvider"
import { UserContext, UserContextType } from "./UserProvider"
import { obtenerFechaHoraLima } from "@/lib/utils"

jest.mock("next/link", () => {
  const MockedNextLink = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  MockedNextLink.displayName = "MockedNextLink";
  return MockedNextLink;
})
jest.mock("../layouts/UserSideBar", () => {
  const MockedUserSideBar = () => <div>Mocked UserSideBar</div>
  MockedUserSideBar.displayName = "MockedUserSideBar"
  return MockedUserSideBar
})

jest.mock("@/socket", () => ({
  __esModule: true,
  ...jest.requireActual("@/__mocks__/socket"),
}))

jest.mock("./OrdenMozo", () => {
  const MockedOrdenMozo = ({ orden }: { orden: { _id: string } }) => <div>Mocked Orden #{orden._id}</div>
  MockedOrdenMozo.displayName = "MockedOrdenMozo"
  return MockedOrdenMozo
})

const fechaActual = obtenerFechaHoraLima()[0]

describe("MozoOrdenes", () => {
  const ordenesMock = [
    {
      _id: "123",
      estado: "Listo",
      fecha: fechaActual,
      horaAsignado: "12:00",
      pedidos: [],
      precioTotal: 100,
    },
    {
      _id: "456",
      estado: "Entregado",
      fecha: fechaActual,
      horaAsignado: "13:00",
      pedidos: [],
      precioTotal: 200,
    },
  ]

  const userMock: UserContextType = {
    user: {
      id_usuario: "1",
      nombre: "Juan",
      apellido: "Pérez",
      email: "juanp@exampl.com",
      rol: "Mozo/Cajero",
    },
    toggleSideBar: false,
    setToggleSideBar: jest.fn(),
  }

  it("renderiza correctamente título y botones de filtro", () => {
    render(
      <UserContext.Provider value={userMock}>
        <OrdenesContext.Provider value={{ ordenes: ordenesMock, setNotificaciones: jest.fn() }}>
          <MozoOrdenes />
        </OrdenesContext.Provider>
      </UserContext.Provider>
    )

    expect(screen.getByText("Órdenes")).toBeInTheDocument()
    expect(screen.getByText(fechaActual)).toBeInTheDocument()
    expect(screen.getByText("Todos")).toBeInTheDocument()
    expect(screen.getByText("Listos")).toBeInTheDocument()
    expect(screen.getByText("Asignados")).toBeInTheDocument()
    expect(screen.getByText("Entregado")).toBeInTheDocument()
    expect(screen.getByText("Crear Orden")).toBeInTheDocument()
  })

  it("muestra órdenes filtradas según estado seleccionado", () => {
    render(
      <UserContext.Provider value={userMock}>
        <OrdenesContext.Provider value={{ ordenes: ordenesMock, setNotificaciones: jest.fn() }}>
          <MozoOrdenes />
        </OrdenesContext.Provider>
      </UserContext.Provider>
    )

    expect(screen.getByText("Mocked Orden #123")).toBeInTheDocument()
    expect(screen.getByText("Mocked Orden #456")).toBeInTheDocument()

    fireEvent.click(screen.getByText("Listos"))
    expect(screen.getByText("Mocked Orden #123")).toBeInTheDocument()
    expect(screen.queryByText("Mocked Orden #456")).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Entregado"))
    expect(screen.getByText("Mocked Orden #456")).toBeInTheDocument()
    expect(screen.queryByText("Mocked Orden #123")).not.toBeInTheDocument()
  })

  it("muestra mensaje si no hay órdenes", () => {
    render(
      <UserContext.Provider value={userMock}>
        <OrdenesContext.Provider value={{ ordenes: [], setNotificaciones: jest.fn() }}>
          <MozoOrdenes />
        </OrdenesContext.Provider>
      </UserContext.Provider>
    )

    expect(screen.getByText("No hay órdenes para mostrar")).toBeInTheDocument()
  })
})
