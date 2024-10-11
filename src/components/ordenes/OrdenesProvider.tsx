"use client"

import type { Orden as OrdenType } from '@/lib/types/pedidos'
import { createContext, Dispatch, SetStateAction } from 'react'

type OrdenContextType = {
  ordenes: Array<OrdenType>
  setNotificaciones: Dispatch<SetStateAction<Array<string>>>
}

export const OrdenesContext = createContext<OrdenContextType>({
  ordenes: [],
  setNotificaciones: () => {}
})

export default function OrdenesProvider({ 
  children, 
  state
}: { 
  children: React.ReactNode, 
  state: OrdenContextType
}) {
  return (
    <OrdenesContext.Provider value={state}>
      {children}
    </OrdenesContext.Provider>
  )
}