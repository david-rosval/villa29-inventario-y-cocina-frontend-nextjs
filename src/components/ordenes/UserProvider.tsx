"use client"

import { createContext } from "react"

type UserContextType = {
  user: {
    id_usuario: string
    nombre: string
    apellido: string
    email: string
    rol: string
  }
 
}

export const UserContext = createContext<UserContextType | null>(null)

export default function UserProvider({
  children,
  user
}: {
  children: React.ReactNode
  user: {
    id_usuario: string
    nombre: string
    apellido: string
    email: string
    rol: string
  }
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
