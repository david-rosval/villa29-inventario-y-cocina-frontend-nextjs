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
    nombre: "Clásica",
    precio: 10.90,
    categoria: "Hamburguesas",
    img: "clasica.webp"
  },
  {
    id: 2,
    nombre: "Chesse Burger",
    precio: 12.90,
    categoria: "Hamburguesas",
    img: "chesse-burger.webp"
  },
  {
    id: 3,
    nombre: "A lo Pobre",
    precio: 13.90,
    categoria: "Hamburguesas",
    img: "a-lo-pobre.webp"
  },
  {
    id: 4,
    nombre: "Crujiente",
    precio: 13.90,
    categoria: "Hamburguesas",
    img: "crujiente.webp"
  },
  {
    id: 5,
    nombre: "Royal",
    precio: 14.90,
    categoria: "Hamburguesas",
    img: "royal.webp"
  },
  {
    id: 6,
    nombre: "Parrillero",
    precio: 16.90,
    categoria: "Hamburguesas",
    img: "parrillero.webp"
  },
  {
    id: 7,
    nombre: "Alitas BBQ",
    precio: 16.00,
    categoria: "Alitas",
    img: "alitas-bbq.webp"
  },
  {
    id: 8,
    nombre: "Alitas Crujientes",
    precio: 16.00,
    categoria: "Alitas",
    img: "alitas-crujientes.webp"
  },
  {
    id: 9,
    nombre: "Alitas Búfalo",
    precio: 18.00,
    categoria: "Alitas",
    img: "alitas-bufalo.webp"
  },
  {
    id: 10,
    nombre: "Alitas Acevichadas",
    precio: 18.00,
    categoria: "Alitas",
    img: "alitas-acevichadas.webp"
  },
  {
    id: 11,
    nombre: "Alitas a la Maracuyá",
    precio: 17.00,
    categoria: "Alitas",
    img: "alitas-a-la-maracuya.webp"
  },
  {
    id: 12,
    nombre: "Alitas Oriental",
    precio: 17.00,
    categoria: "Alitas",
    img: "alitas-oriental.webp"
  },
  {
    id: 13,
    nombre: "Clásica",
    precio: 10.90,
    categoria: "Salchipapas",
    img: "salchipapa-clasica.webp"
  },
  {
    id: 14,
    nombre: "Mixta",
    precio: 12.90,
    categoria: "Salchipapas",
    img: "salchipapa-mixta.webp"
  },
  {
    id: 15,
    nombre: "Sachi-Villa 29",
    precio: 14.00,
    categoria: "Salchipapas",
    img: "sachi-villa-29.webp"
  },
  {
    id: 16,
    nombre: "Tequeños de Queso",
    precio: 9.90,
    categoria: "Piqueos",
    img: "tequenos-de-queso.webp"
  },
  {
    id: 17,
    nombre: "Trilogía 1",
    precio: 30.00,
    categoria: "Piqueos",
    img: "trilogia-1.webp"
  },
  {
    id: 18,
    nombre: "Trilogía 2",
    precio: 30.00,
    categoria: "Piqueos",
    img: "trilogia-2.webp"
  },
  {
    id: 19,
    nombre: "Carne de Cerdo Marinado",
    precio: 16.00,
    categoria: "Platos a la Carta",
    img: "carne-de-cerdo-marinado.webp"
  },
  {
    id: 20,
    nombre: "Pollo a la Plancha",
    precio: 16.00,
    categoria: "Platos a la Carta",
    img: "pollo-a-la-plancha.webp"
  },
  {
    id: 21,
    nombre: "Lomo Saltado",
    precio: 18.00,
    categoria: "Platos a la Carta",
    img: "lomo-saltado.webp"
  },
  {
    id: 22,
    nombre: "Bisteck a lo Pobre",
    precio: 18.00,
    categoria: "Platos a la Carta",
    img: "bisteck-a-lo-pobre.webp"
  },
  {
    id: 23,
    nombre: "Hot Dog Frankfurt",
    precio: 2.50,
    categoria: "Adicionales",
    img: "hot-dog-frankfurt.webp"
  },
  {
    id: 24,
    nombre: "Huevo",
    precio: 2.00,
    categoria: "Adicionales",
    img: "huevo.webp"
  },
  {
    id: 25,
    nombre: "Cabanossi",
    precio: 1.50,
    categoria: "Adicionales",
    img: "cabanossi.webp"
  },
  {
    id: 26,
    nombre: "Tocino",
    precio: 1.50,
    categoria: "Adicionales",
    img: "tocino.webp"
  },
  {
    id: 27,
    nombre: "Queso",
    precio: 1.50,
    categoria: "Adicionales",
    img: "queso.webp"
  },
  {
    id: 28,
    nombre: "Jamón",
    precio: 1.50,
    categoria: "Adicionales",
    img: "jamon.webp"
  },
  {
    id: 29,
    nombre: "La Ruleta Villa 29",
    precio: 35.00,
    categoria: "Juegos",
    img: "ruleta-villa-29.webp"
  }
]

