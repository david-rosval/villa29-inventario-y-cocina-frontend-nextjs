export const useRouter = jest.fn(() => ({
  push: jest.fn(),
}))

export const usePathname = jest.fn(() => "/panel-de-control/ordenes");
