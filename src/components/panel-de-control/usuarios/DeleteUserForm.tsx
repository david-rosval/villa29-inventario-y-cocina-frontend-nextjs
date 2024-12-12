"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useContext } from "react"
import { UsuarioSeleccionadoContext } from "./UsuarioSeleccionadoProvider"
import { deleteUser, revalidateAndRedirect } from "@/lib/usuarios/actions"
import { toast } from "sonner"
import { DialogClose } from "@/components/ui/dialog"

export default function DeleteUserForm() {
  const { usuarioSeleccionado } = useContext(UsuarioSeleccionadoContext)
  
  const form = useForm()

  async function onSubmit() {
    try {
      const idsParaEliminar = usuarioSeleccionado.map(usuario => usuario.id)
      console.log("Eliminando usuario(s)")
      const resultado = await deleteUser({ ids: idsParaEliminar })

      if (!resultado) {
        throw new Error("Error eliminando usuario")
      }

      console.log("Usuario(s) eliminado(s) con éxito")
      toast("Operación exitosa", {
        description: `El usuario ha sido eliminado correctamente`
      })
      await revalidateAndRedirect()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Fallo en la operación", {
        description: "No se ha podido eliminar el usuario"
      })
    } 
  }

  return (
    <Form {...form}>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DialogClose asChild>
          <Button className="w-full" type="submit">Sí, eliminar usuario(s)</Button>
        </DialogClose>
      </form>
    </Form>
  )
}
