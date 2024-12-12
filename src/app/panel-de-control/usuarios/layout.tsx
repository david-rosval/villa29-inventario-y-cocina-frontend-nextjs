import UsuarioSeleccionadoProvider from '@/components/panel-de-control/usuarios/UsuarioSeleccionadoProvider'
import React from 'react'

export default function UsuariosLayout({
  children
}: { children: React.ReactNode}) {
  return (
    <UsuarioSeleccionadoProvider>
      {children}
    </UsuarioSeleccionadoProvider>
  )
}
