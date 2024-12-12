"use server"

import UsuariosDataTable from '@/components/panel-de-control/usuarios/UsuariosDataTable'
import { getAllUsers } from '@/lib/usuarios/actions'

export default async function Usuarios() {
  const usuarios = await getAllUsers()
  if (!usuarios) {
    return <div>Ups! No se pudo obtener la lista de usuarios</div>
  }
  return (
    <div className='h-dvh px-8 pt-[4.5rem] lg:px-20'>
      <h1 className='text-3xl font-bold mt-8'>Usuarios</h1> 
      <UsuariosDataTable usuarios={usuarios.map(user => {
        const { id_usuario, nombre, apellido, email, rol } = user
        return {
          id: id_usuario,
          nombre,
          apellido,
          email,
          rol,
        }
      })} />
    </div>
  )
}
