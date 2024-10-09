"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import {  ArrowLeftIcon } from "@radix-ui/react-icons"

function UserTopBar() {
  const router = useRouter()
  return (
    <div className="bg-primary py-3 px-5 flex justify-end">
      
      {/* Right */}
      <div className="flex gap-8 items-center pr-8">
        {/* User Info */}
        <div className="text-right">
          <p className="text-gray-50 text-lg">{"Pablito Gaa"}</p>
          <p className="text-gray-400 text-sm">{"Rol de pablito"}</p>
        </div>
        {/* Return */}
        <div>
          <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserTopBar