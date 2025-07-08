"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { logout } from "@/lib/auth/actions"
import { useContext } from "react"
import { UserContext } from "../ordenes/UserProvider"
import { Home, LayoutDashboard, ListOrdered, LogOut, Users } from "lucide-react"


function UserSideBar({ toggle }: { toggle?: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, setToggleSideBar }: any = useContext(UserContext)


  const pathname = usePathname()

  return (
    <div className={`bg-primary text-secondary w-60 pr-3 pt-5 ${!toggle && "hidden"} lg:block fixed z-20 left-0 h-full ${toggle && "block w-full z-20"}`}>
      <div className="w-full flex justify-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden">
          <Link 
            href={"/"} 
          >
            <Image 
              src="https://raw.githubusercontent.com/david-rosval/villa29-images-menu/refs/heads/main/logo-restobar.webp" 
              alt="Logo" 
              fill
            />
          </Link>
        </div>

      </div>
      <nav className="flex flex-col gap-3 mt-10 ">
        <Link 
          href={"/panel-de-control"} 
        >
          <Button 
            onClick={() => setToggleSideBar(false)}
            variant="outline"
            className={`${pathname === "/panel-de-control" ? 'bg-secondary text-primary hover:bg-secondary hover:text-primary' : 'bg-primary text-secondary hover:bg-primary hover:text-secondary'} w-full rounded-none rounded-r-full flex justify-start gap-3 border-none min-h-14`}
          >
            <Home className="h-5 w-5" />
            <p className="text-lg">Inicio</p>
          </Button>
        </Link> 

        <Link 
          href={"/panel-de-control/ordenes"} 
        >
          <Button 
            onClick={() => setToggleSideBar(false)}
            variant="outline"
            className={`${pathname === "/panel-de-control/ordenes" ? 'bg-secondary text-primary hover:bg-secondary hover:text-primary' : 'bg-primary text-secondary hover:bg-primary hover:text-secondary'} w-full rounded-none rounded-r-full flex justify-start gap-3 border-none min-h-14`}
          >
            <ListOrdered className="h-5 w-5" />
            <p className="text-lg">Órdenes</p>
          </Button>
        </Link> 

        {user?.rol === 'Administrador' && (
          <>
            <Link 
              href={"/panel-de-control/dashboard"} 
            >
              <Button 
                onClick={() => setToggleSideBar(false)}
                variant="outline"
                className={`${pathname === "/panel-de-control/dashboard" ? 'bg-secondary text-primary hover:bg-secondary hover:text-primary' : 'bg-primary text-secondary hover:bg-primary hover:text-secondary'} w-full rounded-none rounded-r-full flex justify-start gap-3 border-none min-h-14`}
              >
                <LayoutDashboard className="h-5 w-5" />
                <p className="text-lg">Dashboard</p>
              </Button>
            </Link> 
            <Link 
              href={"/panel-de-control/usuarios"} 
            >
              <Button 
                onClick={() => setToggleSideBar(false)}
                variant="outline"
                className={`${pathname === "/panel-de-control/usuarios" ? 'bg-secondary text-primary hover:bg-secondary hover:text-primary' : 'bg-primary text-secondary hover:bg-primary hover:text-secondary'} w-full rounded-none rounded-r-full flex justify-start gap-3 border-none min-h-14`}
              >
                <Users className="h-5 w-5" />
                <p className="text-lg">Usuarios</p>
              </Button>
            </Link> 
          </>
        )}


        <Button 
          variant="outline"
          className={`bg-primary text-secondary w-full rounded-none rounded-r-full flex justify-start gap-3 border-none min-h-14 hover:bg-primary hover:text-secondary`}
          onClick={() => {
            setToggleSideBar(false)
            logout()
          }}
          aria-label="Cerrar sesión"
        >
          <LogOut className="h-5 w-5" />
          <p className="text-lg">Cerrar sesión</p>
        </Button>
      </nav>
      
    </div>
  )
}

export default UserSideBar 