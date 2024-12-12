// formulario para crear una nueva orden
"use client"

import Menu from "@/components/ordenes/Menu"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fixPrice, obtenerFechaHoraLima } from "@/lib/utils"
import { PlusIcon, MinusIcon, ExclamationTriangleIcon, Pencil2Icon } from "@radix-ui/react-icons"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import type { Item } from '@/lib/types/pedidos'
import { useRouter } from "next/navigation"
import { socket } from "@/socket"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UserContext } from "@/components/ordenes/UserProvider"
import UserSideBar from "@/components/layouts/UserSideBar"



export default function NuevaOrden() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { toggleSideBar }: any = useContext(UserContext)

  const router = useRouter()
  const nuevoIdOrden = 99

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [menu, setMenu] = useState<Array<any>>([])

  const [tiempo, setTiempo] = useState(obtenerFechaHoraLima())
  
  const [ordenList, setOrdenList] = useState<Item[]>([])

  const [errorVacio, setErrorVacio] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toggleOrden, setToggleOrden] = useState(false)
  
  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await axios.get('/api/menu')
        setMenu(response.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.log(error.response)
      }
    }
    fetchMenu()
    return
  }, [])
  
  useEffect(() => {
    return setTiempo(obtenerFechaHoraLima())
  }, [ordenList])

  useEffect(() => {
    if (errorVacio) {
      const timeoutError = setTimeout(() => {
        setErrorVacio(false)
      }, 4000)
      return () => clearTimeout(timeoutError)
    }
    return
  }, [errorVacio])
  

  const handleEnviarACocina = async () => {
    const orden = {
      fecha: obtenerFechaHoraLima()[0],
      horaAsignado: obtenerFechaHoraLima()[1],
      pedidos: ordenList.map(orden => { 
        const pedido = {
          menuItem: orden._id,
          cantidad: orden.cantidad
        }
        return pedido
      }),
      precioTotal: ordenList.reduce((acc, item) => acc + (item.cantidad * item.precioUnit), 0)
    }

    if (!orden.pedidos.length) {
      setErrorVacio(true)
      return
    }

    try {
      const response = await axios.post('/api/pedidos', orden)
      console.log(response.status)
      socket.emit('asignar-pedido', { message: 'MOZO: nuevo pedido asignado a cocina' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log(error.response)
    } 
    router.push('/panel-de-control/ordenes')
  }

  return (
    <>
      {toggleSideBar ? (
        <div className='pt-[4.5rem]'>
          <UserSideBar toggle={toggleSideBar} />
        </div>
      ) : (
        <div className=" h-dvh lg:flex pt-[4.5rem] relative bg-gray-200">
        {/* Orden */}
        {!toggleOrden ? (
          <>
          <div className="hidden bg-secondary lg:w-[30vw] lg:min-w-[25vw] w-full p-3 lg:flex flex-col  h-full">
            {/* header */}
            <div className="flex justify-between text-xl font-semibold border-b-2 border-primary pb-2">
              <p>Orden: #{nuevoIdOrden}</p>
              <p>Fecha: {tiempo[0]}</p>
            </div>
            {/* Items */}
            <div className="pb-3">
              <div className="flex justify-around items-center   text-center py-2 font-semibold ">
                <p className="w-full">Nombre</p>
                <p className="w-full">Cantidad</p>
                <p className="w-full">P. Unitario</p>
                <p className="w-full">Total</p>
              </div>
              <ScrollArea className="h-[55vh] max-h-[50vh] my-3 w-full ">
                {ordenList.length ? ordenList.map((item, index) => (
                  <OrdenItem key={index} item={item} ordenList={ordenList} setOrdenList={setOrdenList} />
                )) : (
                  <p className="text-center font-semibold">Agrega pedidos</p>
                )}
              </ScrollArea>
            </div>
            {/* Resumen */}
            <div className=" border-t-2 border-primary flex flex-col h-full pt-4 ">
              <h2 className="text-lg font-bold">Resumen</h2>
              <div className="flex items-center w-full py-4 justify-around">
                <div className="flex w-1/2 gap-8">
                  <div>
                    <p>Subtotal:</p>
                    <p>Descuentos:</p>
                  </div>
                  <div>
                    <p>S/.{fixPrice(ordenList.reduce((acc, item) => acc + (item.cantidad * item.precioUnit), 0))}</p>
                    <p>S/.{0}</p>
                  </div>
                </div>
                <div className="w-1/2 text-lg font-bold uppercase text-right">
                  <p>Total: S/.{fixPrice(ordenList.reduce((acc, item) => acc + (item.cantidad * item.precioUnit), 0))}</p>
                </div>
              </div>
              <div className="h-full flex items-end gap-6">
          
                <Button onClick={handleEnviarACocina} className="w-full py-3 font-semibold">Enviar</Button>
              </div>
            </div>
          </div>
          <Menu ordenList={ordenList} setOrdenList={setOrdenList} menu={menu} />
          {errorVacio && (
            <Alert variant="destructive" className="m-5 absolute bottom-0 right-0 w-[600px] bg-secondary">
              <ExclamationTriangleIcon  className="w-4 h-4" />
              <AlertTitle>Orden vacía</AlertTitle>
              <AlertDescription>
                No has seleccionado ningún item del menú
              </AlertDescription>
            </Alert>
          )}
          </>
          
        ) : (
          <div className="bg-secondary w-full p-3 flex lg:hidden flex-col justify-around h-full">
            <div className="flex justify-between text-xl font-semibold border-b-2 border-primary pb-2">
              <p>Orden: #{nuevoIdOrden}</p>
              <p>Fecha: {tiempo[0]}</p>
            </div>
            {/* Items */}
            <div className="">
              <div className="flex justify-around items-center  text-center py-2 font-semibold ">
                <p className="w-full">Nombre</p>
                <p className="w-full">Cantidad</p>
                <p className="w-full">P. Unitario</p>
                <p className="w-full">Total</p>
              </div>
              <ScrollArea className="h-[60vh] w-full">
                {ordenList.length ? ordenList.map((item, index) => (
                  <OrdenItem key={index} item={item} ordenList={ordenList} setOrdenList={setOrdenList} />
                )) : (
                  <p className="text-center font-semibold">Agrega pedidos</p>
                )}
              </ScrollArea>
            </div>
            {/* Resumen */}
            <div className=" border-t-2 border-primary flex flex-col justify-between gap-3 pt-8 w-full">
              <div className="flex flex-col  w-full h-full justify-around pr-24">
                <div className="flex w-1/2 gap-8">
                  <div>
                    <p>Subtotal:</p>
                    <p>Descuentos:</p>
                  </div>
                  <div>
                    <p>S/.{fixPrice(ordenList.reduce((acc, item) => acc + (item.cantidad * item.precioUnit), 0))}</p>
                    <p>S/.{0}</p>
                  </div>
                </div>
                <div className="w-1/2 text-xl pt-2 font-bold uppercase">
                  <p>Total: S/.{fixPrice(ordenList.reduce((acc, item) => acc + (item.cantidad * item.precioUnit), 0))}</p>
                </div>
              </div>
              <div className="flex justify-end gap-6">
          
                <Button onClick={handleEnviarACocina} className="w-full py-8 text-xl font-semibold uppercase mr-32">Enviar</Button>
              </div>
            </div>
          </div>
        )}
        {/* Toggle */}
        <Button variant={toggleOrden ? 'default' : 'secondary'} onClick={() => setToggleOrden(!toggleOrden)} className={`absolute bottom-0 right-0 size-24 rounded-full m-5 lg:hidden border-none p-6 flex items-center justify-center ${!toggleOrden && 'border shadow-lg'}`}>

          <Pencil2Icon className={`size-full ${toggleOrden ? "text-secondary" : "text-primary"}`}  />
        </Button>
      </div>
      )}
    
      
    </>
  ) 
}

function OrdenItem({item, ordenList, setOrdenList}: {item: Item, ordenList: Item[], setOrdenList: (value: Item[]) => void}) {

  const handlePlusButton = () => {
    const newOrdenList = ordenList.map((orden) => {
      if (orden.id === item.id) {
        return {
          ...orden,
          cantidad: item.cantidad + 1
        }
      }
      return orden
    })
    setOrdenList(newOrdenList)
  }
  
  const handleMinusButton = () => {
    if (item.cantidad === 1) {
      setOrdenList(ordenList.filter((orden) => orden.id !== item.id))
    } else {
      const newOrdenList = ordenList.map((orden) => {
        if (orden.id === item.id) {
          return {
            ...orden,
            cantidad: item.cantidad - 1
          }
        }
        return orden
      })
      setOrdenList(newOrdenList)
    }
  }

  return (
    <div className="flex justify-around text-center py-2">
      <p className="truncate w-full">{item.nombre}</p>
      <div className="w-full flex justify-center gap-2 items-center">
        <Button 
          variant="outline" 
          onClick={handleMinusButton} 
          className="w-8 rounded-full h-8 p-2"
        >
          <MinusIcon className="size-full" />
        </Button>
          <p>
            {item.cantidad}
          </p>
        <Button 
          variant="outline" 
          onClick={handlePlusButton} 
          className="w-8 rounded-full h-8 p-2"
        >
          <PlusIcon className="size-full" />
        </Button>
      </div>
      <p className="w-full">S/.{item.precioUnit}</p>
      <p className="w-full font-semibold">S/.{fixPrice(item.cantidad * item.precioUnit)}</p>
    </div>
  )
}
