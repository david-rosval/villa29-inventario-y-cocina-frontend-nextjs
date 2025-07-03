// 👇 Mocks primero, antes de importar Menu
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// 👇 Mocks persistentes fuera del scope del test
const mockFlipNext = jest.fn();
const mockFlipPrev = jest.fn();


// ✅ Mock react-pageflip
jest.mock("react-pageflip", () => {
  const MockFlipBook = React.forwardRef<unknown, { children: React.ReactNode }>(
    (props, ref) => {
      React.useImperativeHandle(ref, () => ({
        pageFlip: () => ({
          flipNext: mockFlipNext,
          flipPrev: mockFlipPrev,
        }),
      }));
      return <div data-testid="mock-flipbook">{props.children}</div>;
    }
  );
  MockFlipBook.displayName = "MockFlipBook";
  return {
    __esModule: true,
    default: MockFlipBook,
  };
});

// 👇 Importa el componente solo después de los mocks
import Menu from "./Menu";

describe("Menu component", () => {
  beforeEach(() => {
    mockFlipNext.mockClear();
    mockFlipPrev.mockClear();
  });

  it("renders the main title", () => {
    render(<Menu />);
    expect(screen.getByRole("heading", { name: /carta/i })).toBeInTheDocument();
  });

  it("renders the flipbook with all pages", () => {
    render(<Menu />);
    expect(screen.getByAltText("Cover")).toBeInTheDocument();
    for (let i = 2; i <= 7; i++) {
      expect(screen.getByAltText(`Page ${i}`)).toBeInTheDocument();
    }
    expect(screen.getByAltText("Back Cover")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<Menu />);
    expect(
      screen.getByRole("button", { name: /página anterior/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /página siguiente/i })
    ).toBeInTheDocument();
  });

  it("calls flipNext on next button click", () => {
    render(<Menu />);
    fireEvent.click(screen.getByRole("button", { name: /página siguiente/i }));
    expect(mockFlipNext).toHaveBeenCalled();
  });

  it("calls flipPrev on previous button click", () => {
    render(<Menu />);
    fireEvent.click(screen.getByRole("button", { name: /página anterior/i }));
    expect(mockFlipPrev).toHaveBeenCalled();
  });
});
