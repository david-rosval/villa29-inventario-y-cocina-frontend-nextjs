// src/components/layouts/Return.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import Return from "./Return"

// Mock explícito de next/navigation
const pushMock = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe("Return", () => {
  beforeEach(() => {
    pushMock.mockClear()
  })

  it("should render and navigate on button click", () => {
    render(<Return />)

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(pushMock).toHaveBeenCalledWith("/panel-de-control/ordenes")
  })
})
