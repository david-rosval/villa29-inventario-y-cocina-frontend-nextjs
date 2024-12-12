
import AdminDashboard from "@/components/ordenes/AdminDashboard"
import { getUser } from "@/lib/auth/actions"


export default async function Dashboard() {

  const user = await getUser()

  return (
    <div className="h-dvh pt-[4.5rem] flex">
      {(user?.rol === 'Administrador') ? (
        <AdminDashboard />
      ) : (
        <div className="size-full flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-red-500 text-4xl">Ups! No tienes acceso esta página</h2>
            <p className="mt-5">Necesitas permisos de administrador para poder ingresar</p>
          </div>
        </div>
      )}
    </div>
  )
}


