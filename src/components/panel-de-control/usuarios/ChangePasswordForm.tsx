"use client"

import { changePasswordSchema } from "@/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
 } from "@/components/ui/form"
import { PasswordInput } from "@/components/user/password-input"
import { UsuarioSeleccionadoContext } from "./UsuarioSeleccionadoProvider"
import { useContext } from "react"
import { revalidateAndRedirect, updateUserPassword } from "@/lib/usuarios/actions"
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog"
import { Table } from "@tanstack/react-table"
import { Usuario } from "./UsuariosDataTable"

export default function ChangePasswordForm({ table }: { table: Table<Usuario>}) {
  const { usuarioSeleccionado } = useContext(UsuarioSeleccionadoContext)

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: ""
    },
  })

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    try {
      console.log(values)
      const { password, confirmPassword } = values
      const input = {
        id: usuarioSeleccionado[0].id,
        password: password,
        newPassword: confirmPassword
      }
      const usuarioConClaveActualizada = await updateUserPassword(input)
      console.log("Contraseña de usuario actualizada correctamente", usuarioConClaveActualizada)
      toast("Operación exitosa", {
        description: `La contraseña de cambió correctamente`
      })
      table.toggleAllPageRowsSelected(false)
      await revalidateAndRedirect()
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Fallo en la operación", {
        description: "No se ha podido cambiar la contraseña"
      })
    }
  }

  return (
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
        <div className="flex flex-col gap-4">

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña actual</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Mínimo 6 caracteres" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Debe ser diferente la actual" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Reescribe la nueva contraseña" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    
        </div>
        <DialogClose asChild>
          <Button className="w-full" type="submit">Guardar cambios</Button>
        </DialogClose>
      </form>
    </Form>
  )
}
