import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// ✅ Define primero los mocks dentro de una función para evitar hoisting
const toastSuccessMock = jest.fn();
const toastErrorMock = jest.fn();
const pushMock = jest.fn();

// ✅ Mock de sonner con función
jest.mock("sonner", () => {
  return {
    toast: {
      success: (...args: unknown[]) => toastSuccessMock(...args),
      error: (...args: unknown[]) => toastErrorMock(...args),
    },
  };
});

// ✅ Mock de next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// ✅ Mock de authenticate
jest.mock("@/lib/auth/actions", () => ({
  authenticate: jest.fn(),
}));

import LoginForm from "./LoginForm";
import { authenticate } from "@/lib/auth/actions";

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders email and password inputs and submit button", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it("submits form and redirects on successful login", async () => {
    (authenticate as jest.Mock).mockResolvedValueOnce({
      success: true,
      message: "Inicio de sesión exitoso",
    });

    render(<LoginForm />);

    await userEvent.type(
      screen.getByLabelText(/correo electrónico/i),
      "test@example.com"
    );
    await userEvent.type(
      screen.getByLabelText(/contraseña/i),
      "securepassword"
    );
    await userEvent.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    await waitFor(() => {
      expect(authenticate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "securepassword",
      });
      expect(toastSuccessMock).toHaveBeenCalledWith("Sesión iniciada");
      expect(pushMock).toHaveBeenCalledWith("/panel-de-control");
    });
  });

  it("shows error toast on failed login", async () => {
    (authenticate as jest.Mock).mockResolvedValueOnce({
      success: false,
      message: "Credenciales inválidas",
    });

    render(<LoginForm />);

    await userEvent.type(
      screen.getByLabelText(/correo electrónico/i),
      "wrong@example.com"
    );
    await userEvent.type(
      screen.getByLabelText(/contraseña/i),
      "wrongpass"
    );
    await userEvent.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Credenciales inválidas");
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
