import type { Orden } from "@/lib/types/pedidos"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { actualizarEstadoEntregado } from "@/lib/ordenes/actions"
import { obtenerFechaHoraLima } from "@/lib/utils"
import { socket } from "@/socket"
import { useContext, useState } from "react"
import { OrdenesContext } from "./OrdenesProvider"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Orden({ orden, i }: { orden: Orden, i: number }) {
  const { setNotificaciones } = useContext(OrdenesContext)
  const [mostrarNota, setMostrarNota] = useState(false)
  const [nota] = useState(orden.nota ?? "")

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
   
    <>
      {/* Modal para ver la nota */}
      {mostrarNota && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 max-w-lg p-6 bg-[#ABA6A6] rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-bold uppercase">Orden #{orden._id}</h2>
            <h3 className="mb-8 text-2xl font-semibold uppercase">Nota</h3>
            <textarea
              value={nota}
              className="w-full h-72 p-2 mb-6 border resize-none rounded-md bg-[#E0D8D8] focus:outline-none focus:ring-2 focus:ring-black shadow-lg whitespace-pre-wrap"
              placeholder="Sin notas"
              disabled
            ></textarea>
            <div className="flex justify-center">
              <button
                onClick={() => setMostrarNota(false)} // Cierra el modal
                className="w-1/3 py-2 text-white bg-[#8E8E8E] rounded-md hover:bg-[#8A8A8A] shadow-lg"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

    <div className={`flex flex-col border-2 ${orden.estado === 'Listo' && 'border-green-300 border-4'} rounded-lg lg:max-w-[400px]`}>
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

    <div className="flex justify-center py-6 items-center">
      <div className="flex items-center">
        <button
          onClick={() => setMostrarNota(true)}
          className="flex items-center px-4 gap-3 py-2 text-white bg-[#8E8E8E] rounded-md hover:bg-[#8A8A8A] shadow-md"
        >
          <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          Ver nota
        </button>
      </div>
    </div>
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
    </>
    
  )
}

export default Orden