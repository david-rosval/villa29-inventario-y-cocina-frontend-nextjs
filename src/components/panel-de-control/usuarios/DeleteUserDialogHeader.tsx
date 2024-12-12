"use client"

import { useContext } from "react"
import { UsuarioSeleccionadoContext } from "./UsuarioSeleccionadoProvider"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function DeleteUserDialogHeader() {
  const { usuarioSeleccionado } = useContext(UsuarioSeleccionadoContext)
  return (
    <DialogHeader>
      <DialogTitle>¿Desea eliminar {usuarioSeleccionado.length} usuario(s)?</DialogTitle>
      <DialogDescription>
        <div>
          <p>Una vez eliminado(s), el/los usuario(s):</p>
          <ul className="list-disc list-inside">
            {usuarioSeleccionado.map(usuario => (
              <li key={usuario.email}>{usuario.nombre} {usuario.apellido}</li>
            ))}
          </ul>
          <p>no podrá(n) ser recuperado(s).</p>
        </div>
      </DialogDescription>
    </DialogHeader>
  )
}
