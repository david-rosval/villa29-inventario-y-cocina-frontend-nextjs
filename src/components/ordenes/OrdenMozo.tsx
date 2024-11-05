import type { Orden } from "@/lib/types/pedidos"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"


function Orden({ orden, i }: { orden: Orden, i: number }) {
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
        <div className="p-2 h-16 border flex items-center">
          <div className="w-2/3 pr-3">
            <p>Estado: <span className={`${orden.estado === 'Listo' ? 'text-green-500 font-semibold text-lg' : 'text-yellow-500 font-semibold text-lg'}`}>{orden.estado}</span></p>
            
          </div>
          {orden.estado === "En preparación" ? (
            <Button disabled className="w-1/3 text-wrap h-full leading-tight">Entregado</Button>
          ) : (
            <Button className="w-1/3 text-wrap h-full leading-tight">Entregado</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orden