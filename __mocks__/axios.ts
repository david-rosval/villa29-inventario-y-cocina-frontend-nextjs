import type { AxiosError } from "axios";

export const postMock = jest.fn();
export const getMock = jest.fn();

export const isAxiosError = (error: unknown): error is AxiosError => {
  return !!(error && typeof error === "object" && "isAxiosError" in error);
};

const axiosMock = {
  create: jest.fn(() => ({
    post: postMock,
    get: getMock,
  })),
  post: postMock,
  get: getMock,
};

export default axiosMock;
