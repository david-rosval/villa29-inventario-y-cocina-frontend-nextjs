"use client"

import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import Orden from './OrdenCocina'
import { OrdenesContext } from './OrdenesProvider'
import { obtenerFechaHoraLima, obtenerPedidosHoyOrdenadosParaCocina } from '@/lib/utils'

function CocinaOrdenes() {
  const [filtro, setFiltro] = useState('En preparación')
  const { ordenes } = useContext(OrdenesContext)
  return (
    <div className='p-8 mt-[4.5rem]'>
      {/* Contenido superior */}
      <div className='flex justify-between'>
        <div>
          <h1 className='text-3xl font-bold pb-2'>Órdenes</h1>
          <p>{obtenerFechaHoraLima()[0]}</p>
        </div>
        {/* Botones */}
        <div className='flex gap-5'>
          <Button onClick={() => setFiltro('Todos')} className={`h-10 ${filtro === 'Todos' && 'bg-secondary text-primary hover:bg-secondary hover:text-primary'}`}>
            <p className=''>Todos</p>
          </Button>
          <Button onClick={() => setFiltro('Listo')} className={`h-10 ${filtro === 'Listo' && 'bg-green-500 text-secondary hover:bg-green-500 hover:text-secondary'}`}>
            <p className=''>Listos</p>
          </Button>
          <Button onClick={() => setFiltro('En preparación')} className={`h-10 ${filtro === 'En preparación' && 'bg-yellow-500 text-secondary hover:bg-yellow-500 hover:text-secondary'}`}>
            <p className=''>Asignados</p>
          </Button>
          <Button onClick={() => setFiltro('Entregado')} className={`h-10 ${filtro === 'Entregado' && 'bg-secondary text-primary hover:bg-secondary hover:text-primary'}`}>
            <p className=''>Entregado</p>
          </Button>
        </div>
        
      </div>
      <ScrollArea className="w-full h-[75vh] mt-5">
        { obtenerPedidosHoyOrdenadosParaCocina(ordenes).length === 0 && (
          <div className='flex flex-col items-center justify-center w-full h-96'>
            <p className='text-2xl font-semibold'>No hay órdenes para mostrar</p>
          </div>
        )}
        {filtro === 'Todos' ? (
          <div className='mt-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-8 bg-local '>
            {obtenerPedidosHoyOrdenadosParaCocina(ordenes).map((orden, index: number) => (
              <Orden key={index} orden={orden} i={index} />
            ))}
          </div>
        ) : (
          <div className='mt-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-8 bg-local '>
            {obtenerPedidosHoyOrdenadosParaCocina(ordenes.filter(orden => orden.estado === filtro)).map((orden, index: number) => (
              <Orden key={index} orden={orden} i={index} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default CocinaOrdenes