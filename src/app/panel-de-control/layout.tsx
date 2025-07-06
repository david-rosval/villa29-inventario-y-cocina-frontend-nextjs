import PanelWrapper from "@/components/layouts/PanelWrapper"
import { getUser } from "@/lib/auth/actions"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export default async function PanelDeControlLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  if (!user) {
    toast.error("No tienes permiso para acceder a esta página")
    redirect("/auth/login")
  }

  return (
    <PanelWrapper user={user}>
      {children}
    </PanelWrapper>
  )
}