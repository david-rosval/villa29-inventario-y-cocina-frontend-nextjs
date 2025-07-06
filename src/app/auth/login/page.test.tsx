import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./page";

// Mock del componente LoginForm
jest.mock("@/components/auth/LoginForm", () => {
  const MockLoginForm = () => (
    <div data-testid="login-form">LoginForm Rendered</div>
  );
  MockLoginForm.displayName = "MockLoginForm";
  return MockLoginForm;
});

describe("Login Page", () => {
  it("renders the LoginForm component", () => {
    render(<Login />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});
