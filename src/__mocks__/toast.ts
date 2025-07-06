export const toastSuccessMock = jest.fn();
export const toastErrorMock = jest.fn();

jest.mock("sonner", () => {
  return {
    toast: {
      success: (...args: unknown[]) => toastSuccessMock(...args),
      error: (...args: unknown[]) => toastErrorMock(...args),
    },
  };
});
