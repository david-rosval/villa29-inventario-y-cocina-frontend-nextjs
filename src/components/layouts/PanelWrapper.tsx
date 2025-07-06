"use client"

import { User } from "@/lib/types/user"
import UserProvider from "@/components/ordenes/UserProvider"
import UserSideBar from "@/components/layouts/UserSideBar"
import UserTopBar from "@/components/layouts/UserTopBar"

export default function PanelWrapper({ user, children }: { user: User, children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 flex h-dvh">
      <UserProvider user={user}>
        <UserSideBar />
        <div className="lg:ml-60 w-full">        
            <div className="bg-gray-100 w-full relative">
              <UserTopBar />
              {children}
            </div>
        </div> 
      </UserProvider>
    </div>          
  )
}
