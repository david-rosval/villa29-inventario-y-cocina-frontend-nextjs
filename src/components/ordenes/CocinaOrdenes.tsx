"use client"

import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import Orden from './OrdenCocina'
import { OrdenesContext } from './OrdenesProvider'

function CocinaOrdenes() {
  const [filtro, setFiltro] = useState('Todos')
  const { ordenes } = useContext(OrdenesContext)
  return (
    <div className='p-8'>
      {/* Contenido superior */}
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Todas las órdenes</h1>
        {/* Botones */}
        <div className='flex gap-5'>
          <Button onClick={() => setFiltro('Todos')} className={`h-10 ${filtro === 'Todos' && 'bg-secondary text-primary hover:bg-secondary hover:text-primary'}`}>
            <p className=''>Todos</p>
          </Button>
          <Button onClick={() => setFiltro('Listo')} className={`h-10 ${filtro === 'Listo' && 'bg-green-500 text-secondary hover:bg-green-500 hover:text-secondary'}`}>
            <p className=''>Listos</p>
          </Button>
          <Button onClick={() => setFiltro('En preparación')} className={`h-10 ${filtro === 'En preparación' && 'bg-yellow-500 text-secondary hover:bg-yellow-500 hover:text-secondary'}`}>
            <p className=''>En preparación</p>
          </Button>
        </div>
        
      </div>
      <ScrollArea className="w-full h-[700px]">
        {filtro === 'Todos' ? (
          <div className='mt-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-8 bg-local '>
            {ordenes.sort((a,b) => a.estado.localeCompare(b.estado)).map((orden, index: number) => (
              <Orden key={index} orden={orden} i={index} />
            ))}
          </div>
        ) : (
          <div className='mt-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-8 bg-local '>
            {ordenes.filter(orden => orden.estado === filtro).sort((a,b) => a.estado.localeCompare(b.estado)).map((orden, index: number) => (
              <Orden key={index} orden={orden} i={index} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default CocinaOrdenes