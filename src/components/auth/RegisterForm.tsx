"use client"

import { registerSchema } from "@/schemas/auth.schema"
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
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select"
import { PasswordInput } from "../user/password-input"
import { registerUser, revalidateAndRedirect } from "@/lib/usuarios/actions"
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog"

export default function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      rol: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      console.log("Registrando usuario")
      const nuevoUsuario = { newUser: {...values } }
      const  usuarioRegistrado = await registerUser(nuevoUsuario)
      console.log("Usuario registrado con éxito")
      console.log(usuarioRegistrado)
      toast("Operación exitosa", {
        description: `El usuario ha sido registrado correctamente`
      })
      await revalidateAndRedirect()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      toast("Fallo en la operación", {
        description: "No se ha podido registrar el usuario"
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="ej. villa29" {...field} />
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
        <DialogClose asChild>
          <Button className="w-full" type="submit">Registrar</Button>
        </DialogClose>
      </form>
    </Form>
  )
}
