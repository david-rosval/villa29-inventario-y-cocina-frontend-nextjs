"use server"

import { Pedido } from '@/models/mongodb';
import axios, { AxiosResponse } from 'axios';
import mongoose from 'mongoose';
import connectDb from '../db/mongodb';

export async function getMenu() {
  try {
    const response: AxiosResponse = await axios.get('/api/menu')
    //console.log(response)
    return response.data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.log(error.response)
  }
}

export const actualizarEstadoEntregado = async ({ id , horaTerminado }: { id: string, horaTerminado: string }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID no válido");
  }

  try {
    await connectDb()
    await Pedido.updateOne(
      { _id: id },
      {
        $set: {
          estado: 'Entregado',
          horaTerminado,
        },
      }
    );
    console.log("Pedido actualizado correctamente");
  } catch (error) {
    console.error("Error actualizando el pedido:", error);
  }
  
}


export async function getOrdenes(): Promise<Array<typeof Pedido>> {

  try {
    await connectDb()
    const pedidos = await Pedido.find().populate('pedidos.menuItem'); // Popula el campo menuItem para obtener detalles completos del menú
    return pedidos;
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    throw new Error("No se pudieron obtener los pedidos");
  }
}