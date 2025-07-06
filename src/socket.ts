"use client"

import { io } from 'socket.io-client'

const socketServerUrl = (process.env.NEXT_PUBLIC_MODE && process.env.NEXT_PUBLIC_MODE === 'dev') ? process.env.NEXT_PUBLIC_SOCKET_SERVER_URL_DEV : process.env.NEXT_PUBLIC_SOCKET_SERVER_URL_PROD;

export const socket = io(socketServerUrl, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 5000,
  transports: ['websocket'], // asegura uso de websocket puro
  withCredentials: true
})
