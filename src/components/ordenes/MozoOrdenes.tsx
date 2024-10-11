import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '../ui/scroll-area'
import Orden from './OrdenMozo'
import type { Orden as OrdenType } from '@/lib/types/pedidos'

function MozoOrdenes({ ordenes }: { ordenes: Array<OrdenType> }) {
  return (
    <div className='p-8 '>
      {/* Contenido superior */}
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Todas las órdenes</h1>
        {/* Botón crear orden */}
        <Link href={"/ordenes/nueva-orden"}>
          <Button className='flex gap-3 h-12 w-48'>
            <p className='w-full'>Crear Orden</p>
            <PlusIcon className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <ScrollArea className="w-full h-[calc(100vh-200px)]">

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