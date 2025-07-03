"use client"

import { loginSchema } from "@/schemas/auth.schema"
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
import { authenticate } from "@/lib/auth/actions"
import { PasswordInput } from "../user/password-input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await authenticate(values)
    if (!result.success) {
      toast.error(result.message)
      return
    }
    toast.success("Sesión iniciada")
    router.push('/panel-de-control')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  >
        <div className="space-y-7">
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="ej. johndoe@ejemplo.com" {...field} />
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
                  <PasswordInput placeholder="ej. johndoe123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-8" type="submit">Iniciar Sesión</Button>
        <div className="mt-2">
          {/* {errors.map((err, i) => (
            <FormMessage key={i}>{err}</FormMessage>
          ))} */}
        </div>
      </form>
    </Form>
         
  )
}

export default LoginForm