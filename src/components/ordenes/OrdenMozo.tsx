import type { Orden } from "@/lib/types/pedidos"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { actualizarEstadoEntregado } from "@/lib/ordenes/actions"
import { obtenerFechaHoraLima } from "@/lib/utils"
import { socket } from "@/socket"
import { useContext } from "react"
import { OrdenesContext } from "./OrdenesProvider"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Orden({ orden, i }: { orden: Orden, i: number }) {
  const { setNotificaciones } = useContext(OrdenesContext)

  const handleCambiarEstadoEntregado = async () => {
    try {
      await actualizarEstadoEntregado({ id: orden._id, horaTerminado: obtenerFechaHoraLima()[1] })
      socket.emit('pedido-entregado', { message: 'MOZO: pedido entregado al cliente' })
      setNotificaciones(prev => [...prev, 'MOZO: pedido entregado al cliente'])
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
   
    <div className={`flex flex-col border-2 ${orden.estado === 'Listo' && 'border-green-300 border-4'} rounded-lg`}>
      <div className="flex justify-between border px-2">
        <p className="uppercase font-semibold">Orden {`${orden.fecha.replace(/\//g, '')}${orden.horaAsignado.replace(/:/g, '')}`}</p>
        <p>{orden.fecha} {orden.horaAsignado}</p>
      </div>
      <div className="flex justify-between border px-2 bg-gray-200">
        <p>Nombre</p>
        <p>Cantidad</p>
      </div>
      <ScrollArea className="h-36">
        {orden.pedidos.map((pedido, index: number) => (
          <div key={index} className="flex justify-between border px-2">
            <p className="truncate">{pedido.menuItem.nombre}</p>
            <p>{pedido.cantidad}</p>
          </div>
        ))}
      </ScrollArea>
      <div className="p-2 border flex flex-col gap-2 items-center">
        <div className=" px-3">
          <p>Estado: <span className={`${orden.estado === 'Listo' ? 'text-green-500 font-semibold text-lg' : orden.estado === 'En preparación' ? 'text-yellow-500 font-semibold text-lg' : 'font-semibold text-lg'}`}>{orden.estado}</span></p> 

        </div>
        {orden.estado === "En preparación" || orden.estado === "Entregado" ? (
          <Button disabled className="w-full text-wrap h-full leading-tight py-3 ">
            {orden.estado === 'En preparación' ? 'En preparación' : 'Pedido entregado'}
          </Button>
        ) : (
          <Button onClick={handleCambiarEstadoEntregado} className="w-full text-wrap h-full leading-tight py-3 ">Marcar como entregado</Button>
        )}
      </div>
    </div>
    
  )
}

export default Orden