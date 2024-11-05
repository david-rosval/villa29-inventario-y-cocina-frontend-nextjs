"use client"

import { useContext } from "react"
import { UserContext } from "../ordenes/UserProvider"
import Return from "./Return"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"

export default  function UserTopBar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, toggleSideBar, setToggleSideBar  }: any = useContext(UserContext)
  
  return (
    <div className={`w-full bg-primary py-3 lg:px-5 flex justify-between lg:justify-end items-center h-[4.5rem] fixed top-0 z-10 lg:pr-60`}>
      <Button onClick={() => setToggleSideBar(!toggleSideBar)} size="icon" className="lg:hidden ml-5">
        <HamburgerMenuIcon className="size-8" />
      </Button>
      <div className="flex gap-8 items-center pr-6">
        {/* User Info */}
        <div className="text-right">
          <p className="text-gray-50 text-lg">{user?.nombre} {user?.apellido}</p>
          <p className="text-gray-400 text-sm">{user?.rol}</p>
        </div>
        {/* Return */}
        <Return />
       
      </div>
    </div>
  )
}
