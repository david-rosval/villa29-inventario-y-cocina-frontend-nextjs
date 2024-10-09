"use client"

import UserSideBar from "@/components/layouts/UserSideBar"
import UserTopBar from "@/components/layouts/UserTopBar"

export default function OrdenesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-slate-100 flex">
      <UserSideBar />
      <div className="flex flex-col w-full h-full">
        <UserTopBar />
        
        <div className="bg-gray-100 size-full">
          {children}
        </div>
      </div> 
    </div>          
  )
}