// se muestran todas las ordenes

"use client"


import MozoOrdenes from '@/components/ordenes/MozoOrdenes'
import CocinaOrdenes from '@/components/ordenes/CocinaOrdenes'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/components/ordenes/UserProvider'
import axios from 'axios'
import { socket } from '@/socket'
import OrdenesProvider from '@/components/ordenes/OrdenesProvider'



function Ordenes() {
  const [ordenes, setOrdenes] = useState([])
  
  // socket.io client initialization
  const [, setIsConnected] = useState(false)
  const [, setTransport] = useState('N/A')

  const [notificaciones, setNotificaciones] = useState<Array<string>>([])

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name)
      })
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    socket.on('pedido-listo', () => {
      setNotificaciones((notificaciones) => [...notificaciones, '¡Un pedido está listo!'])
    })

    socket.on('nuevo-pedido', () => {
      setNotificaciones((notificaciones) => [...notificaciones, '¡Nuevo pedido!'])
    })

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('pedido-listo')
      socket.off('nuevo-pedido')
    }
  }, [])

  useEffect(() => {
    async function getOrdenes() {
      try {
        const response = await axios.get('/api/pedidos')
        //console.log(response.data)
        setOrdenes(response.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.log(error.response)
      }
    }
    getOrdenes()
    return
  }, [notificaciones])
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = useContext(UserContext)
 
  return (
    <>
      <OrdenesProvider state={{ ordenes, setNotificaciones }}>

        {user?.rol === 'Mozo/Cajero' && (
          <MozoOrdenes />
        )}
        {user?.rol === 'Cocinero' && (
          <CocinaOrdenes />
        )}
        {user?.rol === 'Administrador' && (
          <div>
            <h1>Dashboard</h1>
          </div>
        )}
      </OrdenesProvider>
    </>
  )
}

export default Ordenes