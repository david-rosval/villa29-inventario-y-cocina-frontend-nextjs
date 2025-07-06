// src/__mocks__/socket.ts
export const socket = {
  connected: true,
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
  io: {
    engine: {
      transport: { name: "polling" },
      on: jest.fn(),
    },
  },
}