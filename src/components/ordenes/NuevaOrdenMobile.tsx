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
      <div>ADSFSSSSSSSSSSSSSSSSSSLOR Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptas totam quis tenetur, non, est sed aliquid quisquam placeat facere consequuntur! Repudiandae voluptates, fugiat eius nesciunt modi cupiditate illo nobis.</div>
    </div>
  )
}
