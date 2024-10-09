"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { HomeIcon, ListBulletIcon, ExitIcon } from "@radix-ui/react-icons"
import { usePathname } from "next/navigation"
import Image from "next/image"


function UserSideBar() {
  const pathname = usePathname()
  return (
    <div className="bg-primary h-full text-secondary w-60 pr-3 pt-5 ">
      <div className="w-full flex justify-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden">
          <Image 
            src="/logo-restobar.jpg" 
            alt="Logo" 
            fill
          />
        </div>

      </div>
      <nav className="flex flex-col gap-3 mt-10 ">
        <Link 
          href={"/"} 
        >
          <Button 
            variant="outline"
            className={`${pathname === "/" ? 'bg-secondary text-primary hover:bg-secondary hover:text-primary' : 'bg-primary text-secondary hover:bg-primary hover:text-secondary'} w-full rounded-none rounded-r-full flex justify-start gap-3 border-none min-h-14`}
          >
            <HomeIcon className="h-5 w-5" />
            <p className="text-lg">Inicio</p>
          </Button>
        </Link> 

        <Link 
          href={"/ordenes/"} 
        >
          <Button 
            variant="outline"
            className={`${pathname === "/ordenes" ? 'bg-secondary text-primary hover:bg-secondary hover:text-primary' : 'bg-primary text-secondary hover:bg-primary hover:text-secondary'} w-full rounded-none rounded-r-full flex justify-start gap-3 border-none min-h-14`}
          >
            <ListBulletIcon className="h-5 w-5" />
            <p className="text-lg">Órdenes</p>
          </Button>
        </Link> 
        <Button 
          variant="outline"
          className={`bg-primary text-secondary w-full rounded-none rounded-r-full flex justify-start gap-3 border-none min-h-14 hover:bg-primary hover:text-secondary`}
        >
          <ExitIcon className="h-5 w-5" />
          <p className="text-lg">Cerrar sesión</p>
        </Button>
      </nav>
      
    </div>
  )
}

export default UserSideBar 