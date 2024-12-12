import UserSideBar from "@/components/layouts/UserSideBar"
import UserTopBar from "@/components/layouts/UserTopBar"
import UserProvider from "@/components/ordenes/UserProvider"
import { getUser } from "@/lib/auth/actions"
import { User } from "@/lib/types/user"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Villa 29 • Panel de Control",
};

export default async function PanelDeControlLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <div className="bg-slate-100 flex h-dvh">
      <UserProvider user={user as User}>
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