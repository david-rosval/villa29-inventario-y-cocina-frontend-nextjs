import { render, screen } from "@testing-library/react"
import PanelWrapper from "./PanelWrapper"
import "@testing-library/jest-dom"

const mockUser = {
  id_usuario: "1",
  nombre: "Test",
  apellido: "User",
  email: "test@example.com",
  rol: "Administrador" as const,
}

jest.mock("@/components/layouts/UserSideBar", () => {
  const MockUserSideBar = () => <div data-testid="UserSideBar" />;
  MockUserSideBar.displayName = "MockUserSideBar";
  return MockUserSideBar;
});
jest.mock("@/components/layouts/UserTopBar", () => {
  const MockUserTopBar = () => <div data-testid="UserTopBar" />;
  MockUserTopBar.displayName = "MockUserTopBar";
  return MockUserTopBar;
});

test("renders children and layout", async () => {
  render(
    <PanelWrapper user={mockUser}>
      <div data-testid="ChildContent">Contenido</div>
    </PanelWrapper>
  )

  expect(await screen.findByTestId("UserSideBar")).toBeInTheDocument()
  expect(await screen.findByTestId("UserTopBar")).toBeInTheDocument()
  expect(await screen.findByTestId("ChildContent")).toBeInTheDocument()
})
