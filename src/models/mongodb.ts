import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
})

const pedidoSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true,
  },
  horaAsignado: {
    type: String,
    required: true,
  },
  pedidos: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
  estado: {
    type: String,
    required: false,
    default: 'En preparación',
  },
  horaTerminado: {
    type: String,
    required: false,
  },
  precioTotal: {
    type: Number,
    required: true,
  }
})

export const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema) 

export const Pedido = mongoose.models.Pedido || mongoose.model('Pedido', pedidoSchema) 

