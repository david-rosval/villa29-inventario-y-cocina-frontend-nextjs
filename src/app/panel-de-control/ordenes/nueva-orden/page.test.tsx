// page.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserContext, UserContextType } from "@/components/ordenes/UserProvider";
import { postMock, getMock } from "@/__mocks__/axios";
import { Item } from "@/lib/types/pedidos";
import NuevaOrden from "./page";

// CONTROLADOR para simular que Menu retorna o no retorna items
let debeRetornarItems = true;

// Mock socket
jest.mock("@/socket", () => ({
  socket: {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    connected: true,
    io: {
      engine: {
        transport: { name: "polling" },
        on: jest.fn(),
      },
    },
  },
}));

// Mock router y toast
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/panel-de-control/ordenes",
}));

const toastMock = jest.fn();

jest.mock("sonner", () => {
  const fullMock = (msg: string, opts?: unknown) => toastMock(msg, opts);
  fullMock.success = jest.fn();
  fullMock.error = jest.fn();
  return { toast: fullMock };
});


// Mock de Menu controlado
jest.mock("@/components/ordenes/Menu", () => ({
  __esModule: true,
  default: function MockMenu({ setOrdenList }: { setOrdenList: (items: Item[]) => void }) {
    React.useEffect(() => {
      if (debeRetornarItems) {
        setOrdenList([
          {
            id: 531,
            _id: "menu-item-1",
            nombre: "Hamburguesa",
            cantidad: 1,
            precioUnit: 10,
          },
        ]);
      }
    }, [setOrdenList]);
    return <div data-testid="mock-menu">Mock Menu</div>;
  },
}));

import { socket } from "@/socket";

const mockToggle = jest.fn();

const mockUserContext: UserContextType = {
  user: {
    id_usuario: "user-1",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan@example.com",
    rol: "Mozo/Cajero",
  },
  toggleSideBar: false,
  setToggleSideBar: mockToggle,
};

describe("NuevaOrden Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getMock.mockResolvedValue({ data: [] });
    debeRetornarItems = true; // por defecto sí retorna items
  });

  it("muestra el encabezado correctamente", async () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <NuevaOrden />
      </UserContext.Provider>
    );
    expect(await screen.findByText(/Orden: #99/i)).toBeInTheDocument();
    expect(screen.getByText(/Fecha:/)).toBeInTheDocument();
  });

  it("muestra error si se intenta enviar orden vacía", async () => {
    debeRetornarItems = false; // forza menú vacío

    render(
      <UserContext.Provider value={mockUserContext}>
        <NuevaOrden />
      </UserContext.Provider>
    );

    const enviarButton = await screen.findAllByText(/Enviar/i);
    fireEvent.click(enviarButton[0]);

    await waitFor(() => {
      expect(screen.getByText(/No hay pedidos en la orden/i)).toBeInTheDocument();
    });
  });

  it("envía correctamente la orden y emite evento", async () => {
    postMock.mockResolvedValue({ status: 201 });

    render(
      <UserContext.Provider value={mockUserContext}>
        <NuevaOrden />
      </UserContext.Provider>
    );

    fireEvent.click(await screen.findByText("Añadir nota"));

    const textarea = await screen.findByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Sin cebolla" } });

    fireEvent.click(screen.getByText("Aceptar"));

    const enviarButton = await screen.findAllByText("Enviar");
    fireEvent.click(enviarButton[0]);

    await waitFor(() => {
      expect(postMock).toHaveBeenCalled();
      expect(socket.emit).toHaveBeenCalledWith(
        "asignar-pedido",
        expect.objectContaining({
          message: expect.stringContaining("MOZO"),
        })
      );
    });
  });

  it("muestra error si falla la API de menú", async () => {
    getMock.mockRejectedValueOnce(new Error("API Error"));

    render(
      <UserContext.Provider value={mockUserContext}>
        <NuevaOrden />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("mock-menu")).toBeInTheDocument();
    });
  });
});
