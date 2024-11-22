"use client"

import Link from 'next/link'
import { useContext } from 'react'
import { Button } from '../ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Orden from './OrdenMozo'
import { OrdenesContext } from './OrdenesProvider'
import { UserContext } from './UserProvider'
import UserSideBar from '../layouts/UserSideBar'
import { obtenerFechaHoraLima, obtenerPedidosHoyOrdenadosParaMozo } from '@/lib/utils'

function MozoOrdenes() {
  const { ordenes } = useContext(OrdenesContext)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { toggleSideBar }: any = useContext(UserContext)
  return (
    <>
      {toggleSideBar ? (
        <div className='pt-[4.5rem]'>
          <UserSideBar toggle={toggleSideBar} />
        </div>
      ) : (
        <div className='p-8 pb-10 mt-[4.5rem] h-full'>
          <div className='flex md:justify-between md:flex-row md:gap-0 gap-5 flex-col mb-5'>
            <div>
              <h1 className='text-3xl font-bold pb-2'>Órdenes</h1>
              <p>{obtenerFechaHoraLima()[0]}</p>
            </div>
            <Link href={"/ordenes/nueva-orden"}>
              <Button className='flex h-12 md:w-48 w-full relative'>
                <p className='w-full'>Crear Orden</p>
                <PlusIcon className="h-5 w-5 absolute right-3" />
              </Button>
            </Link>
          </div>
          <div className='mt-8 w-full grid lg:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8 bg-local '>
            { obtenerPedidosHoyOrdenadosParaMozo(ordenes).length === 0 && (
              <div className='flex flex-col items-center justify-center w-full h-96'>
                <p className='text-2xl font-semibold'>No hay órdenes para mostrar</p>
              </div>
            )}
            {obtenerPedidosHoyOrdenadosParaMozo(ordenes).map((orden, index: number) => (
              <Orden key={index} orden={orden} i={index} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default MozoOrdenes