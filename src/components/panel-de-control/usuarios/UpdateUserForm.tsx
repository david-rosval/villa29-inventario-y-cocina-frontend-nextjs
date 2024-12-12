"use client"

import { updateSchema } from "@/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
 } from "@/components/ui/select"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
 } from "@/components/ui/form"
import { useContext } from "react"
import { UsuarioSeleccionadoContext } from "./UsuarioSeleccionadoProvider"
import { DialogClose } from "@/components/ui/dialog"
import { revalidateAndRedirect, updateUser } from "@/lib/usuarios/actions"
import { toast } from "sonner"
import { Table } from "@tanstack/react-table"
import { Usuario } from "./UsuariosDataTable"

export default function UpdateUserForm({ table }: { table: Table<Usuario>}) {
  const { usuarioSeleccionado } = useContext(UsuarioSeleccionadoContext)

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      nombre: usuarioSeleccionado[0]?.nombre ?? "",
      apellido: usuarioSeleccionado[0]?.apellido ?? "",
      email: usuarioSeleccionado[0]?.email ?? "",
      rol: usuarioSeleccionado[0]?.rol ?? undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof updateSchema>) {
    try {
      console.log(values)
      const userToEdit = {
        id: usuarioSeleccionado[0].id,
        updatedUser: { ...values }
      }
      const usuarioActualizado = await updateUser(userToEdit)
      console.log("Usuario actualizado correctamente", usuarioActualizado)
      toast("Operación exitosa", {
        description: `El usuario se actualizó correctamente`
      })
      table.toggleAllPageRowsSelected(false)
      await revalidateAndRedirect()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Fallo en la operación", {
        description: "No se ha podido actualizar el usuario"
      })
    }
  }

  return (
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
        <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="ej. John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apellido"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="ej. Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="ej. johndoe@villa29.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol que desempeña</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Cocinero">Cocinero</SelectItem>
                  <SelectItem value="Mozo/Cajero">Mozo/Cajero</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <DialogClose asChild>
          <Button className="w-full mt-9" type="submit">Guardar cambios</Button>
        </DialogClose>
      </form>
    </Form>
  )
}
