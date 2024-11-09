"use client"

import type { Orden } from "@/lib/types/pedidos"
import { Button } from "../ui/button"
import axios from "axios"
import { socket } from "@/socket"
import { OrdenesContext } from "./OrdenesProvider"
import { useContext } from "react"
import { ScrollArea } from "../ui/scroll-area"

function Orden({ orden, i }: { orden: Orden, i: number }) {
  const { setNotificaciones } = useContext(OrdenesContext)

  const handleCambiarEstadoListo = async () => {
    try {
      const response = await axios.put('/api/pedidos', { id: orden._id, estado: orden.estado })
      console.log(response.status)
      socket.emit('pedido-listo', { message: 'COCINA: pedido listo para que el mozo lo retire' })
      setNotificaciones(prev => [...prev, 'COCINA: pedido listo para que el mozo lo retire'])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex flex-col border-2 rounded-lg">
        <div className="flex justify-between border px-2">
          <p className="uppercase font-semibold">Orden {i+1}</p>
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
        <div className="p-2 border flex items-center">
          <div className="w-2/3 pr-3">
            <p>Estado: <span className={`${orden.estado === 'Listo' ? 'text-green-500 font-semibold text-lg' : orden.estado === 'En preparación' ? 'text-yellow-500 font-semibold text-lg' : 'font-semibold text-lg'}`}>{orden.estado}</span></p>
          </div>
          {orden.estado === "En preparación" ? (
            <Button onClick={handleCambiarEstadoListo} className="w-1/3 text-wrap h-full leading-tight text-lg">Pedido Listo</Button>
          ) : (
            <Button disabled className={`w-1/3 text-wrap h-full leading-tight ${orden.estado === 'Listo' ? 'bg-green-500' : '' } text-secondary text-xl`}>{orden.estado === 'Listo' ? 'Listo' : 'Entregado'}</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orden