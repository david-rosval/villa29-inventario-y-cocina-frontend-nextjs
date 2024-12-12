"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"
import { Usuario } from "./UsuariosDataTable"

type UsuarioSeleccionadoContextType = {
  usuarioSeleccionado: Array<Usuario>
  setUsuarioSeleccionado: Dispatch<SetStateAction<Array<Usuario>>>
}

export const UsuarioSeleccionadoContext = createContext<UsuarioSeleccionadoContextType>({
  usuarioSeleccionado: [],
  setUsuarioSeleccionado: () => {}
})

export default function UsuarioSeleccionadoProvider({ 
  children 
}: { children: React.ReactNode }) {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Array<Usuario>>([])

  return (
    <UsuarioSeleccionadoContext.Provider 
      value={{ usuarioSeleccionado, setUsuarioSeleccionado }}
    >
      {children}
    </UsuarioSeleccionadoContext.Provider>
  )
}
