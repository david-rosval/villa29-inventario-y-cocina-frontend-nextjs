/* eslint-disable @typescript-eslint/no-unused-vars */
import { Item, MenuItem } from "@/lib/types/pedidos"

export default function NuevaOrdenMobile({
  ordenList, 
  setOrdenList, 
  tiempo, 
  handleEnviarACocina, 
  menu
}: { 
  ordenList: Item[]
  setOrdenList: (value: Item[]) => void
  tiempo: string
  handleEnviarACocina: () => void
  menu: MenuItem[] 
}) {
  return (
    <div className="lg:hidden h-full w-full relative bg-green-400 flex justify-center items-center">
      <div></div>
    </div>
  )
}
