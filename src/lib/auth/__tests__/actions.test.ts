import { authenticate, logout, getUser } from "../actions"
import { redirect } from "next/navigation"
import { User } from "../../types/user"

jest.mock("axios")
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}))

// Mocks persistentes para cookies
const setMock = jest.fn()
const deleteMock = jest.fn()
const getCookieMock = jest.fn(() => ({ value: "fake-token" }))

const cookiesMock = {
  set: setMock,
  delete: deleteMock,
  get: getCookieMock,
}

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => cookiesMock),
}))

// Mocks de axios
import axios from "axios"
const { post: postMock, get: getMock } = axios as unknown as {
  post: jest.Mock,
  get: jest.Mock,
}

describe("auth actions", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("authenticate", () => {
    it("should authenticate successfully and set cookie", async () => {
      postMock.mockResolvedValueOnce({
        data: { token: "test-token" },
      })

      const result = await authenticate({
        email: "test@example.com",
        password: "password123",
      })

      expect(result).toEqual({
        success: true,
        message: "Inicio de sesión exitoso",
      })

      expect(setMock).toHaveBeenCalledWith("token", "test-token")
    })

    it("should return error on failed login", async () => {
      postMock.mockRejectedValueOnce({
        isAxiosError: true,
        response: { data: { error: "Credenciales inválidas" } },
      })

      const result = await authenticate({
        email: "wrong@example.com",
        password: "wrongpass",
      })

      expect(result).toEqual({
        success: false,
        message: "Credenciales inválidas",
      })
    })
  })

  describe("logout", () => {
    it("should delete token cookie and redirect", async () => {
      await logout()
      expect(deleteMock).toHaveBeenCalledWith("token")
      expect(redirect).toHaveBeenCalledWith("/")
    })
  })

  describe("getUser", () => {
    it("should return user on valid token", async () => {
      const mockUser: User = {
        id_usuario: "123",
        email: "test@example.com",
        rol: "Administrador",
        nombre: "Test User",
        apellido: "Apellido",
      }

      getMock.mockResolvedValueOnce({ data: mockUser })

      const result = await getUser()
      expect(result).toEqual(mockUser)
    })

    it("should return undefined on error", async () => {
      getMock.mockRejectedValueOnce(new Error("Unauthorized"))

      const result = await getUser()
      expect(result).toBeUndefined()
    })
  })
})
