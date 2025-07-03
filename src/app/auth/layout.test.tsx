import { render, screen } from "@testing-library/react";
import AuthLayout from "./layout";
import "@testing-library/jest-dom";

describe("AuthLayout", () => {
  beforeEach(() => {
    render(
      <AuthLayout>
        <div data-testid="auth-children">Contenido del formulario</div>
      </AuthLayout>
    );
  });

  it("muestra el logo correctamente", () => {
    const logo = screen.getByAltText("Logo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe("IMG");
  });

  it("renderiza el título del formulario", () => {
    const title = screen.getByRole("heading", {
      name: /inicio de sesión/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("renderiza correctamente los children", () => {
    expect(screen.getByTestId("auth-children")).toBeInTheDocument();
    expect(screen.getByText(/contenido del formulario/i)).toBeInTheDocument();
  });

  it("renderiza las elipses decorativas (superior e inferior)", () => {
    const elipses = screen.getAllByRole("presentation");
    expect(elipses.length).toBeGreaterThanOrEqual(2);
  });
});
