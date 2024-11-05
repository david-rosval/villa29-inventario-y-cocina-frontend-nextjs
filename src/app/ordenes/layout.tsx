import UserSideBar from "@/components/layouts/UserSideBar"
import UserTopBar from "@/components/layouts/UserTopBar"
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
    <div className="bg-slate-100 flex h-dvh">
      <UserSideBar />
      <div className="lg:ml-60 w-full">        
        <UserProvider user={user}>
          <div className="bg-gray-100 w-full relative">
            <UserTopBar />
            {children}
          </div>
        </UserProvider>
      </div> 
    </div>          
  )
}