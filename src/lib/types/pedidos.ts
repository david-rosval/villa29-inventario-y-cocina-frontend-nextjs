export type Item = {
  _id: string
  id: number
  nombre: string
  precioUnit: number
  cantidad: number
}

export type Orden = {
  estado: string
  fecha: string
  horaAsignado: string
  pedidos: Array<{
    cantidad: number
    menuItem: {
      categoria: string
      id: number
      img: string
      nombre: string
      precion: number
      _id:string
    }
    _id: string
  }>
  precioTotal: number
  _id:string
}