"use client"

import { createContext, useState } from "react"

export type UserContextType = {
  user: {
    id_usuario: string
    nombre: string
    apellido: string
    email: string
    rol: string
  }
  toggleSideBar: boolean
  setToggleSideBar: (toggle: boolean) => void
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
  const [toggleSideBar, setToggleSideBar] = useState(false)
  return (
    <UserContext.Provider value={{ user, toggleSideBar, setToggleSideBar  }}>{children}</UserContext.Provider>
  )
}
