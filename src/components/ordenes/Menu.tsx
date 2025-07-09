"use client"

import { Button } from "../ui/button"
import { useState } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { ScrollArea } from "../ui/scroll-area"
import type { Item, MenuItem } from '@/lib/types/pedidos'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Menu({ordenList, setOrdenList, menu}: { ordenList: Item[], setOrdenList: (value: Item[]) => void, menu: MenuItem[] }) {
 
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

  const categoriasDuplicados = menu?.map(item => item.categoria)
  const categorias = categoriasDuplicados?.filter((item, index) => categoriasDuplicados.indexOf(item) === index);


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
      _id: item._id,
      id: item.id,
      nombre: item.nombre,
      precioUnit: item.precio,
      cantidad: 1
    }])
  }

  return (
    <div className="w-full lg:flex flex-col p-8">
      {/* categorías */}
      <div className="flex flex-col">
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="py-6" variant={categoriaSeleccionada === '' ? "default" : "destructive" }>{categoriaSeleccionada === '' ? "Seleccionar categoría" : categoriaSeleccionada }</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filtrar por categoría</DialogTitle>
              <DialogDescription>
                Elige la categoría
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 py-4 border-b">
              {categorias?.map((categoria, i) => (
                <Button 
                  variant={categoriaSeleccionada === categoria ? 'destructive' : 'secondary'}
                  key={i} 
                  onClick={() => setCategoriaSeleccionada(categoria)} 
                  className={`py-5  ${categoriaSeleccionada === categoria && 'bg-red-500 text-secondary hover:bg-red-500 hover:text-secondary'}`}
                >
                  {categoria}
                </Button>
              ))}
            </div>
            <DialogFooter>
              <div className="flex justify-around gap-4 w-full">
                <DialogClose asChild>
                  <Button className="w-1/2" variant="outline" type="button" onClick={() => setCategoriaSeleccionada("")}>
                    Limpiar filtro
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className="w-1/2" type="button" >
                    Aplicar cambios
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

         
      </div>
      {/* productos de la categoría seleccionada */}
      <ScrollArea className="w-full h-[70vh] mt-5">
        {!categoriaSeleccionada ? (
          <div className='mt-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8 bg-local '>
          {menu?.map((item, i) => (
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
      <div className="bg-secondary shadow-lg w-[200px]">
        
        <div className="relative h-[200px] w-[200px] flex justify-center items-center overflow-hidden">
          <Image 
            src={item ? `https://raw.githubusercontent.com/david-rosval/villa29-images-menu/refs/heads/main/${item.img}` : '/logo-restobar.jpg'} 
            alt={item? item.img : 'villa29'} 
            fill

          />
        </div>
        <div className="flex justify-between items-center px-3 py-2">
          <div>
            <p className="text-lg font-semibold text-wrap leading-none mb-3">{item.nombre}</p>
            <p className="text-opacity-50 text-lg text-wrap">S/. { item.precio.toFixed(2) }</p>
          </div>
          
          <Button variant="outline" size="icon" onClick={() => handleFunction(item)} className="rounded-full" aria-label={`Order ${item.nombre}`}>
              <PlusIcon className="h-6 w-6" />
            </Button> 
        </div>
      
      </div>
    </div>
  )
}
