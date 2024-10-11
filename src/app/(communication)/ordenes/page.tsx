// se muestran todas las ordenes

"use client"


import MozoOrdenes from '@/components/ordenes/MozoOrdenes'
import CocinaOrdenes from '@/components/ordenes/CocinaOrdenes'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/components/ordenes/UserProvider'
import axios from 'axios'


function Ordenes() {
  const [ordenes, setOrdenes] = useState([])

  useEffect(() => {
    async function getOrdenes() {
      try {
        const response = await axios.get('/api/pedidos')
        console.log(response.data)
        setOrdenes(response.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.log(error.response)
      }
    }
    getOrdenes()
    return
  }, [])
  

  /* const [, setSocket] = useState<unknown>(undefined)

  useEffect(() => {
    const ws = io('http://localhost:1234')
    setSocket(ws)
  }, []) */
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = useContext(UserContext)
 
  return (
    <>
      {user?.rol === 'Mozo/Cajero' && (
        <MozoOrdenes ordenes={ordenes} />
      )}
      {user?.rol === 'Cocinero' && (
        <CocinaOrdenes ordenes={ordenes} />
      )}
      {user?.rol === 'Administrador' && (
        <div>
          <h1>Dashboard</h1>
        </div>
      )}
    </>
  )
}

export default Ordenes