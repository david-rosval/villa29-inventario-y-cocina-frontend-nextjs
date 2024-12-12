import { z } from 'zod'

export const registerSchema = z.object({
  nombre: z.string({ required_error: 'El nombre es requerido' }).min(1, { message: "El campo nombre no puede estar vacío" }),
  apellido: z.string({ required_error: 'El apellido es requerido' }).min(1, { message: "El campo apellido no puede estar vacío" }),
  email: z.string({ required_error: 'El email es requerido' }).min(1, { message: "El campo email no puede estar vacío" }).email({ message: 'El email no es válido' }),
  password: z.string({ required_error: 'La contraseña es requerida' }).min(1, { message: "El campo contraseña no puede estar vacío" }).min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rol: z.enum(['Administrador', 'Cocinero', 'Mozo/Cajero'], { required_error: 'El rol es requerido' })
})

export const loginSchema = z.object({
  email: z.string({ required_error: 'El email es requerido' }).min(1, { message: "El campo email no puede estar vacío" }).email({ message: 'El email no es válido' }),
  password: z.string({ required_error: 'La contraseña es requerida' }).min(1, { message: "El campo contraseña no puede estar vacío" }).min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export const updateSchema = z.object({
  nombre: z.string({ required_error: 'El nombre es requerido' }).min(1, { message: "El campo nombre no puede estar vacío" }),
  apellido: z.string({ required_error: 'El apellido es requerido' }).min(1, { message: "El campo apellido no puede estar vacío" }),
  email: z.string({ required_error: 'El email es requerido' }).min(1, { message: "El campo email no puede estar vacío" }).email({ message: 'El email no es válido' }),
  rol: z.enum(['Administrador', 'Cocinero', 'Mozo/Cajero'], { required_error: 'El rol es requerido' })
})

export const changePasswordSchema = z.object({
  password: z.string({ required_error: 'La contraseña es requerida' }).min(1, { message: "El campo contraseña no puede estar vacío" }).min(6, 'La contraseña debe tener al menos 6 caracteres'),
  newPassword: z.string({ required_error: 'La nueva contraseña es requerida' }).min(1, { message: "El campo contraseña no puede estar vacío" }).min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string({ required_error: 'La confirmación de la nueva contraseña es requerida' }).min(1, { message: "El campo contraseña no puede estar vacío" }).min(6, 'La confirmación de la nueva contraseña debe tener al menos 6 caracteres')
}).superRefine((data, ctx) => {
  if (data.newPassword === data.password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['newPassword'],
      message: 'La nueva contraseña no debe ser igual a la contraseña actual.',
    });
  }

  if (data.newPassword !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Escribe la misma contraseña en ambos campos.',
    });
  }
});