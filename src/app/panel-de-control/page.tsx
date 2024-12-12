"use client"

import UserSideBar from '@/components/layouts/UserSideBar'
import { UserContext } from '@/components/ordenes/UserProvider'
import PanelDeControlComponent from '@/components/panel-de-control/PanelDeControl'
import React, { useContext } from 'react'

export default function PanelDeControl() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { toggleSideBar }: any = useContext(UserContext)

  return (
    <>
      {toggleSideBar ? (
        <div className='pt-[4.5rem]'>
          <UserSideBar toggle={toggleSideBar} />
        </div>
      ) : (
        <div className='h-full mt-[4.5rem] flex flex-col justify-center items-center p-8 lg:pt-12  gap-10'>
          <div className=''>
            <h1 className='text-4xl font-bold text-center'>Bienvenido al <span className='text-[#9c46ff]'>Panel de control</span> de Villa 29</h1>
            <p className='text-center mt-3 text-[#919191] font-medium'>Administra la comunicación con cocina para la preparación y entrega de los pedidos</p>
          </div>
          <div className='max-w-[1000px]'>
            <PanelDeControlComponent />
          </div>
        </div>
      )}
    </>
  )
}
