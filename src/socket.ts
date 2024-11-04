"use client"

import { io } from 'socket.io-client'

const socketServerUrl = (process.env.NEXT_PUBLIC_MODE && process.env.NEXT_PUBLIC_MODE === 'dev') ? process.env.NEXT_PUBLIC_SOCKET_SERVER_URL_DEV : process.env.NEXT_PUBLIC_SOCKET_SERVER_URL_PROD;

export const socket = io(socketServerUrl)
