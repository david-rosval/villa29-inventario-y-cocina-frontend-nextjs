// se muestran todas las ordenes

"use client"

/* import { useEffect, useState } from 'react'
import { io } from 'socket.io-client' */
import { ordenes } from '@/sample'
import MozoOrdenes from '@/components/ordenes/MozoOrdenes'
import CocinaOrdenes from '@/components/ordenes/CocinaOrdenes'


function Ordenes() {
  /* const [, setSocket] = useState<unknown>(undefined)

  useEffect(() => {
    const ws = io('http://localhost:1234')
    setSocket(ws)
  }, []) */
  
 
  return (
    /* <MozoOrdenes ordenes={ordenes}/> */
    <CocinaOrdenes ordenes={ordenes}/>
  )
}

export default Ordenes