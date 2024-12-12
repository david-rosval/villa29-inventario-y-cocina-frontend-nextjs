// se muestran todas las ordenes

"use client"

import MozoOrdenes from '@/components/ordenes/MozoOrdenes'
import CocinaOrdenes from '@/components/ordenes/CocinaOrdenes'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/components/ordenes/UserProvider'
import axios from 'axios'
import { socket } from '@/socket'
import OrdenesProvider from '@/components/ordenes/OrdenesProvider'
import { toast } from 'sonner'

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
      toast("¡Un pedido está listo!", {
        description: "Pedido listo para ser retirado por el mozo"
      })
    })

    socket.on('nuevo-pedido', () => {
      setNotificaciones((notificaciones) => [...notificaciones, '¡Nuevo pedido!'])
      toast("¡Nuevo pedido!", {
        description: "Un nuevo pedido ha sido enviado"
      })
    })

    socket.on('pedido-entregado', () => {
      setNotificaciones((notificaciones) => [...notificaciones, 'Pedido entregado!'])
      toast("Pedido entregado!", {
        description: "El pedido ha sido entregado al cliente"
      })
    })

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('pedido-listo')
      socket.off('nuevo-pedido')
      socket.off('pedido-entregado')
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

        {(user?.rol === 'Mozo/Cajero' || user?.rol === 'Administrador') && (
          <MozoOrdenes />
        )}
        {user?.rol === 'Cocinero' && (
          <CocinaOrdenes />
        )}
      </OrdenesProvider>
    </>
  )
}

export default Ordenes