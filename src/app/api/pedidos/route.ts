import connectDb from "@/lib/db/mongodb";
import {Pedido} from "@/models/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb()
    const pedidosQuery = Pedido.find().populate('pedidos.menuItem')
    const pedidos = await pedidosQuery.exec()
    console.log(pedidos);
    return NextResponse.json(pedidos)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('error obteniendo los pedidos',error)
  }
}

export async function POST(request: Request) {
  try {
    const res = await request.json()
    await connectDb()
    const pedido = await Pedido.create(res)
    return NextResponse.json(pedido)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return NextResponse.json(error)
  }
  
}

export async function PUT(request: Request) {
  try {
    const { id, estado } = await request.json()
    if (estado === 'En preparación') {
      await connectDb()
      const updatePedidoQuery = Pedido.findByIdAndUpdate(id, { estado: 'Listo' }, { new: true })
      const updatePedido = await updatePedidoQuery.exec()
      return NextResponse.json(updatePedido)
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return NextResponse.json(error)
  }
}