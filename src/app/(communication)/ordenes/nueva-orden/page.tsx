// formulario para crear una nueva orden
"use client"

import Menu from "@/components/ordenes/Menu"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateCurentDate } from "@/lib/utils"
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons"
import { useState } from "react"

type Item = {
  id: number
  nombre: string
  precioUnit: number
  cantidad: number
}

export default function NuevaOrden() {
  const nuevoIdOrden = 99
  
  const [ordenList, setOrdenList] = useState<Item[]>([])

  const handleEnviarACocina = () => {
    console.log('Enviar a cocina', ordenList)
  }

  return (
    <div className=" h-full flex">
      {/* Orden */}
      <div className="bg-secondary lg:max-w-[600px] w-full p-3 flex flex-col pb-8">
        <div className="flex justify-between text-xl font-semibold border-b-2 border-primary pb-2">
          <p>Orden: #{nuevoIdOrden}</p>
          <p>Fecha: {generateCurentDate()}</p>
        </div>
        {/* Items */}
        <div className="h-full">
          <div className="flex justify-around text-center py-2">
            <p className="w-full">Nombre</p>
            <p className="w-full">Cantidad</p>
            <p className="w-full">P. Unitario</p>
            <p className="w-full">Total</p>
          </div>
          <ScrollArea className="h-[calc(100vh-450px)] w-full">
            {ordenList.length ? ordenList.map((item, index) => (
              <OrdenItem key={index} item={item} ordenList={ordenList} setOrdenList={setOrdenList} />
            )) : (
              <p className="text-center font-semibold">Agrega pedidos</p>
            )}
          </ScrollArea>
        </div>
        {/* Resumen */}
        <div className="h-[250px] border-t-2 border-primary pt-10 flex flex-col justify-between">
          <div className="flex w-full h-full justify-around">
            <div className="flex w-1/2 gap-8 h-full">
              <div>
                <p>Subtotal:</p>
                <p>Descuentos:</p>
              </div>
              <div>
                <p>S/.{ordenList.reduce((acc, item) => acc + (item.cantidad * item.precioUnit), 0)}</p>
                <p>S/.{0}</p>
              </div>
            </div>
            <div className="w-1/2 text-2xl font-bold uppercase text-right">
              <p>Total: S/.{ordenList.reduce((acc, item) => acc + (item.cantidad * item.precioUnit), 0)}</p>
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <Button className="w-full h-10">Guardar</Button>
            <Button className="w-full h-10">Imprimir</Button>
            <Button onClick={handleEnviarACocina} className="w-full h-10">Enviar</Button>
          </div>
        </div>
      </div>
      {/* Menú */}
      <Menu ordenList={ordenList} setOrdenList={setOrdenList} />
      
    </div>
  ) 
}

function OrdenItem({item, ordenList, setOrdenList}: {item: Item, ordenList: Item[], setOrdenList: (value: Item[]) => void}) {

  const handlePlusButton = () => {
    const newOrdenList = ordenList.map((orden) => {
      if (orden.id === item.id) {
        return {
          ...orden,
          cantidad: item.cantidad + 1
        }
      }
      return orden
    })
    setOrdenList(newOrdenList)
  }
  
  const handleMinusButton = () => {
    if (item.cantidad === 1) {
      setOrdenList(ordenList.filter((orden) => orden.id !== item.id))
    } else {
      const newOrdenList = ordenList.map((orden) => {
        if (orden.id === item.id) {
          return {
            ...orden,
            cantidad: item.cantidad - 1
          }
        }
        return orden
      })
      setOrdenList(newOrdenList)
    }
  }

  return (
    <div className="flex justify-around text-center py-2">
      <p className="w-full">{item.nombre}</p>
      <div className="w-full flex justify-center gap-2 items-center">
        <Button 
          variant="outline" 
          onClick={handleMinusButton} 
          className="w-8 rounded-full h-8 p-2"
        >
          <MinusIcon className="size-full" />
        </Button>
          <p>
            {item.cantidad}
          </p>
        <Button 
          variant="outline" 
          onClick={handlePlusButton} 
          className="w-8 rounded-full h-8 p-2"
        >
          <PlusIcon className="size-full" />
        </Button>
      </div>
      <p className="w-full">S/.{item.precioUnit}</p>
      <p className="w-full font-semibold">S/.{item.cantidad * item.precioUnit}</p>
    </div>
  )
}
