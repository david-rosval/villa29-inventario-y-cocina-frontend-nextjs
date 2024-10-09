"use client"

import { menu } from "@/sample"
import { Button } from "../ui/button"
import { useState } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

type Item = {
  id: number
  nombre: string
  precioUnit: number
  cantidad: number
}

type MenuItem = {
  id: number
  nombre: string
  precio: number
  categoria: string
  img: string
}

export default function Menu({ordenList, setOrdenList}: { ordenList: Item[], setOrdenList: (value: Item[]) => void }) {

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')


  const categoriasDuplicados = menu.map(item => item.categoria)
  const categorias = categoriasDuplicados.filter((item, index) => categoriasDuplicados.indexOf(item) === index);


  const handleAddItemButton = (item: MenuItem) => {
    console.log('click')
    if (ordenList.some(orden => orden.id === item.id)) {
      setOrdenList(ordenList.map(orden => {
        if (orden.id === item.id) {
          return {
            ...orden,
            cantidad: orden.cantidad + 1
          }
        }
        return orden
      }))
      return
    }
    setOrdenList([...ordenList, {
      id: item.id,
      nombre: item.nombre,
      precioUnit: item.precio,
      cantidad: 1
    }])
  }

  return (
    <div className="w-full bg-gray-400 flex flex-col p-8">
      {/* categorías */}
      <div className="flex justify-between gap-2 pb-3 border-b-2 border-primary">
        <ScrollArea className="w-full h-14 whitespace-nowrap">
          {categorias.map((categoria, i) => (
            <Button 
              key={i} 
              onClick={() => setCategoriaSeleccionada(categoria)} 
              className={`mx-2 w-1/5 h-10 ${categoriaSeleccionada === categoria && 'bg-red-500 text-secondary hover:bg-red-500 hover:text-secondary'}`}
            >
              {categoria}
            </Button>
          ))}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      {/* productos de la categoría seleccionada */}
      <ScrollArea className="w-full h-[calc(100vh-210px)]">
        {!categoriaSeleccionada ? (
          <div className='mt-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8 bg-local '>
          {menu.map((item, i) => (
            <MenuItemCard key={i} item={item} handleFunction={handleAddItemButton} />
          ))}
        </div>
        ) : (
          <div className='mt-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8 bg-local '>
          {menu.filter(item => item.categoria === categoriaSeleccionada).map((item, i) => (
            <MenuItemCard key={i} item={item} handleFunction={handleAddItemButton} />
          ))}
        </div>
        )} 
      </ScrollArea>
    </div>
  )
}

function MenuItemCard({ item, handleFunction }: { item: MenuItem, handleFunction: (item: MenuItem) => void }) {
  return (
    <div className="bg-transparent flex justify-center">
      <div className="bg-secondary shadow-lg ">
        
        <div className="relative h-48 w-48 overflow-hidden">
          <Image 
            src={'/logo-restobar.jpg'} 
            alt="Producto" 
            fill
          />
        </div>
        <div className="flex justify-between items-center px-3 py-2">
          <p>{item.nombre}</p>
          
          <Button variant="outline" size="icon" onClick={() => handleFunction(item)} className="rounded-full">
              <PlusIcon className="h-6 w-6" />
            </Button>
        </div>
      
      </div>
    </div>
  )
}