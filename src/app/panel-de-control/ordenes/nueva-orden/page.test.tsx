import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NuevaOrden from './page';
import { UserContext } from '@/components/ordenes/UserProvider';
import axios from 'axios';

jest.mock('axios');

const mockSocket = { emit: jest.fn() };
jest.mock('@/lib/socket', () => mockSocket);

const mockUserContext = {
  user: {
    id_usuario: '1',
    nombre: 'Test User',
    apellido: 'User',
    email: 'test@example.com',
    rol: 'Mozo',
  },
  toggleSideBar: false,
  setToggleSideBar: jest.fn(),
};

describe('NuevaOrden Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page correctly', () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <NuevaOrden />
      </UserContext.Provider>
    );

    expect(screen.getByText('Órdenes')).toBeInTheDocument();
  });

  it('fetches menu items on mount', async () => {
    const mockMenu = [{ _id: '1', nombre: 'Item 1', precioUnit: 10 }];
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockMenu });

    render(
      <UserContext.Provider value={mockUserContext}>
        <NuevaOrden />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });

  it('handles empty order list error', async () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <NuevaOrden />
      </UserContext.Provider>
    );

    const submitButton = screen.getByText('Enviar a Cocina');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('La orden está vacía')).toBeInTheDocument();
    });
  });

  it('submits the order successfully', async () => {
    const mockMenu = [{ _id: '1', nombre: 'Item 1', precioUnit: 10 }];
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockMenu });
    jest.spyOn(axios, 'post').mockResolvedValueOnce({ status: 200 });

    render(
      <UserContext.Provider value={mockUserContext}>
        <NuevaOrden />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const submitButton = screen.getByText('Enviar a Cocina');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSocket.emit).toHaveBeenCalledWith('asignar-pedido', expect.any(Object));
    });
  });

  it('handles API errors gracefully', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('API Error'));

    render(
      <UserContext.Provider value={mockUserContext}>
        <NuevaOrden />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error al cargar el menú')).toBeInTheDocument();
    });
  });
});
