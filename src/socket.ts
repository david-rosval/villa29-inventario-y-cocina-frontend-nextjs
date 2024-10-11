"use client"

import { io } from 'socket.io-client'

export const socket = io(process.env.NEXT_PUBLIC_WS_SERVER_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 5000
})