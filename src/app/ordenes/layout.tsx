import Return from "@/components/layouts/Return"
import UserSideBar from "@/components/layouts/UserSideBar"
import UserProvider from "@/components/ordenes/UserProvider"
import { getUser } from "@/lib/auth/actions"

export default async function OrdenesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const user: {
    id_usuario: string
    nombre: string
    apellido: string
    email: string
    rol: string
  } = await getUser()

  return (
    <div className="h-screen bg-slate-100 flex">
      <UserSideBar />
      <div className="flex flex-col w-full h-full">

        {/* User top bar */}
        <div className="bg-primary py-3 px-5 flex justify-end">
          <div className="flex gap-8 items-center pr-8">
            {/* User Info */}
            <div className="text-right">
              <p className="text-gray-50 text-lg">{user?.nombre} {user?.apellido}</p>
              <p className="text-gray-400 text-sm">{user?.rol}</p>
            </div>
            {/* Return */}
            <Return />
          </div>
        </div>
        
        <div className="bg-gray-100 size-full">
          <UserProvider user={user}>
            {children}
          </UserProvider>
        </div>
      </div> 
    </div>          
  )
}