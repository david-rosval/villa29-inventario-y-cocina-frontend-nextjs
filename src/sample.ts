type Pedido = {
  nombre: string;
  cantidad: number;
};

export type Orden = {
  id:number
  fecha: string;
  hora: string;
  pedidos: Pedido[];
  estado: string;
  tiempoTranscurrido: string;
};

export const ordenes: Orden[] = [
  {
    id: 1,
    fecha: "06/10/24",
    hora: "19:40",
    pedidos: [
      {
        nombre: "Hamburguesa",
        cantidad: 2
      },
      {
        nombre: "Alita Bbq",
        cantidad: 1
      },
      {
        nombre: "Chilcano",
        cantidad: 1
      },
      {
        nombre: "Jarra Maracuya",
        cantidad: 1
      },
    ],
    estado: "Listo",
    tiempoTranscurrido: "38min"
  },
  {
    id: 2,
    fecha: "07/10/24",
    hora: "20:15",
    pedidos: [
      {
      nombre: "Pizza",
      cantidad: 1
      },
      {
      nombre: "Cerveza",
      cantidad: 2
      }
    ],
    estado: "En preparación",
    tiempoTranscurrido: "15min"
    },
    {
      id: 3,
    fecha: "08/10/24",
    hora: "18:30",
    pedidos: [
      {
      nombre: "Ensalada",
      cantidad: 1
      },
      {
      nombre: "Limonada",
      cantidad: 1
      }
    ],
    estado: "Listo",
    tiempoTranscurrido: "25min"
    },
    {
      id: 4,
    fecha: "09/10/24",
    hora: "21:00",
    pedidos: [
      {
      nombre: "Tacos",
      cantidad: 3
      },
      {
      nombre: "Refresco",
      cantidad: 2
      }
    ],
    estado: "En preparación",
    tiempoTranscurrido: "10min"
    },
    {
      id: 5,
    fecha: "10/10/24",
    hora: "19:45",
    pedidos: [
      {
      nombre: "Sushi",
      cantidad: 2
      },
      {
      nombre: "Té Verde",
      cantidad: 1
      }
    ],
    estado: "Listo",
    tiempoTranscurrido: "30min"
    }
]

export const menu = [
  {
    id: 1,
    nombre: 'Hamburguesa 1',
    precio: 14,
    categoria: 'Hamburguesas'
    ,img: 'imagen'
  },
  {
    id: 2,
    nombre: 'Hamburguesa 2',
    precio: 16,
    categoria: 'Hamburguesas',img: 'imagen'
  },
  {
    id: 3,
    nombre: 'Hamburguesa 3',
    precio: 18,
    categoria: 'Hamburguesas',img: 'imagen'
  },
  {
    id: 4,
    nombre: 'Alitas 1',
    precio: 10,
    categoria: 'Alitas',img: 'imagen'
  },
  {
    id: 5,
    nombre: 'Alitas 2',
    precio: 12,
    categoria: 'Alitas',img: 'imagen'
  },
  {
    id: 6,
    nombre: 'Alitas 3',
    precio: 14,
    categoria: 'Alitas',img: 'imagen'
  },
  {
    id: 7,
    nombre: 'Salchipapa 1',
    precio: 8,
    categoria: 'Salchipapas',img: 'imagen'
  },
  {
    id: 8,
    nombre: 'Salchipapa 2',
    precio: 10,
    categoria: 'Salchipapas',img: 'imagen'
  },
  {
    id: 9,
    nombre: 'Salchipapa 3',
    precio: 12,
    categoria: 'Salchipapas',img: 'imagen'
  },
  {
    id: 10,
    nombre: 'Plato 1',
    precio: 15,
    categoria: 'Platos a la carta',img: 'imagen'
  },
  {
    id: 11,
    nombre: 'Plato 2',
    precio: 15,
    categoria: 'Platos a la carta',img: 'imagen'
  },
  {
    id: 12,
    nombre: 'Piqueo 1',
    precio: 12,
    categoria: 'Piqueos',img: 'imagen'
  },
  {
    id: 13,
    nombre: 'Piqueo 2',
    precio: 10,
    categoria: 'Piqueos',img: 'imagen'
  },
  {
    id: 15,
    nombre: 'Cerveza 1',
    precio: 16,
    categoria: 'Cervezas',img: 'imagen'
  },
  {
    id: 16,
    nombre: 'Cerveza 2',
    precio: 20,
    categoria: 'Cervezas',img: 'imagen'
  },
  {
    id: 17,
    nombre: 'Coctel 1',
    precio: 19,
    categoria: 'Cocteles',img: 'imagen'
  },
  

]