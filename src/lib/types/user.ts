export type User = {
  id_usuario: string
  nombre: string
  apellido: string
  email: string
  rol: 'Administrador' | 'Cocinero' | 'Mozo/Cajero'
}