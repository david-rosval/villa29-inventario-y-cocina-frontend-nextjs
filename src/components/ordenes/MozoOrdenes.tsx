import Link from 'next/link'
import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '../ui/scroll-area'
import Orden from './OrdenMozo'
import { OrdenesContext } from './OrdenesProvider'

function MozoOrdenes() {
  const { ordenes } = useContext(OrdenesContext)
  return (
    <div className='p-8 '>
      {/* Contenido superior */}
      <div className='flex justify-between mb-5'>
        <h1 className='text-3xl font-bold'>Todas las órdenes</h1>
        {/* Botón crear orden */}
        <Link href={"/ordenes/nueva-orden"}>
          <Button className='flex gap-3 h-12 w-48'>
            <p className='w-full'>Crear Orden</p>
            <PlusIcon className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <ScrollArea className="w-full h-[700px]">

      <div className='mt-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-8 bg-local '>
        {ordenes.sort((a,b) => b.estado.localeCompare(a.estado)).map((orden, index: number) => (
          <Orden key={index} orden={orden} i={index} />
        ))}
      </div>
      </ScrollArea>
    </div>
  )
}

export default MozoOrdenes