/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function obtenerFechaHoraLima() {
  const fecha = new Date();

  // Formatear la fecha en "dd/mm/yyyy"
  const formatoFecha = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  }).format(fecha);

  // Formatear la hora en "HH:MM" formato 24 horas
  const formatoHora = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
  }).format(fecha);

  return [formatoFecha, formatoHora];
}

export function fixPrice(price: number) {
  return parseFloat(price.toFixed(2))
} 

export function convertirFormatoFechaYyyyMmDd(fecha: string): string {
  const [dia, mes, año] = fecha.split("/");
  return `${año}-${mes}-${dia}`;
}

export function calcularDiferenciaEntreHoras(hora1: string, hora2: string): string {
  // Separar horas y minutos de cada parámetro
  const [h1, m1] = hora1.split(":").map(Number);
  const [h2, m2] = hora2.split(":").map(Number);

  // Convertir ambas horas a minutos
  const minutos1 = h1 * 60 + m1;
  const minutos2 = h2 * 60 + m2;

  // Calcular la diferencia absoluta en minutos
  const diferenciaMinutos = Math.abs(minutos1 - minutos2);

  // Calcular las horas y minutos de la diferencia
  const horas = Math.floor(diferenciaMinutos / 60);
  const minutos = diferenciaMinutos % 60;

  // Formatear el resultado para que siempre tenga dos dígitos en minutos
  return `${horas}:${minutos.toString().padStart(2, "0")}`;
}

export function calcularPromedioDeTiempo(horas: string[]): string {
  let totalMinutos = 0;

  // Convertir cada hora a minutos y sumar al total
  for (const hora of horas) {
    const [h, m] = hora.split(":").map(Number);
    totalMinutos += h * 60 + m;
  }

  // Calcular el promedio en minutos
  const promedioMinutos = Math.floor(totalMinutos / horas.length);

  // Convertir el promedio a horas y minutos
  const horasPromedio = Math.floor(promedioMinutos / 60);
  const minutosPromedio = promedioMinutos % 60;

  // Formatear el resultado para que siempre tenga dos dígitos en minutos
  return `${horasPromedio}:${minutosPromedio.toString().padStart(2, "0")}`;
}

export function obtenerDetallesFecha(fecha: string): { dia: number; mes: string[]; year: number } {
  const [dia, mes, year] = fecha.split("/").map(Number);

  // Definir los nombres de los meses en español e inglés
  const meses = [
    ["Enero", "January"],
    ["Febrero", "February"],
    ["Marzo", "March"],
    ["Abril", "April"],
    ["Mayo", "May"],
    ["Junio", "June"],
    ["Julio", "July"],
    ["Agosto", "August"],
    ["Septiembre", "September"],
    ["Octubre", "October"],
    ["Noviembre", "November"],
    ["Diciembre", "December"],
  ];

  // Devolver el objeto con el día, mes y año
  return {
    dia,
    mes: meses[mes - 1], // -1 porque los arrays empiezan en 0
    year,
  };
}

export function obtenerPedidosHoyOrdenadosParaMozo(pedidos: any[]) {
  const hoy = new Date();
  const dia = hoy.getDate().toString().padStart(2, '0');
  const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
  const año = hoy.getFullYear();
  const fechaHoy = `${dia}/${mes}/${año}`;

  // Filtrar los pedidos de hoy
  const pedidosHoy = pedidos.filter(pedido => pedido.fecha === fechaHoy);

  // Ordenar los pedidos según los criterios dados
  return pedidosHoy.sort((a: { estado: string; horaTerminado?: string; horaAsignado: string }, b: { estado: string; horaTerminado?: string; horaAsignado: string }) => {
    // Primero, ordenar por estado: "Listo", "En preparación", luego "Entregado"
    const estadoPrioridad = { "Listo": 1, "En preparación": 2, "Entregado": 3 };
    const prioridadA = estadoPrioridad[a.estado as keyof typeof estadoPrioridad];
    const prioridadB = estadoPrioridad[b.estado as keyof typeof estadoPrioridad];

    if (prioridadA !== prioridadB) {
      return prioridadA - prioridadB;
    }

    // Si ambos son "Entregado", ordenar por horaTerminado en forma descendente
    if (a.estado === "Entregado" && b.estado === "Entregado") {
      return b.horaTerminado!.localeCompare(a.horaTerminado!);
    }

    // Si ambos son "En preparación" o "Listo", ordenar por horaAsignado en forma ascendente
    if (a.estado !== "Entregado" && b.estado !== "Entregado") {
      return a.horaAsignado.localeCompare(b.horaAsignado);
    }

    return 0; // Si no se cumplen las condiciones anteriores, los pedidos son iguales en prioridad
  });
}

export function obtenerPedidosHoyOrdenadosParaCocina(pedidos: any[]) {
  const hoy = new Date();
  const dia = hoy.getDate().toString().padStart(2, '0');
  const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
  const año = hoy.getFullYear();
  const fechaHoy = `${dia}/${mes}/${año}`;

  // Filtrar los pedidos de hoy
  const pedidosHoy = pedidos.filter(pedido => pedido.fecha === fechaHoy);

  // Ordenar los pedidos según los criterios dados
  return pedidosHoy.sort((a, b) => {
    // Primero, ordenar por estado: "En preparación", "Listo", luego "Entregado"
    const estadoPrioridad = { "En preparación": 1, "Listo": 2, "Entregado": 3 };
    const prioridadA = estadoPrioridad[a.estado as keyof typeof estadoPrioridad];
    const prioridadB = estadoPrioridad[b.estado as keyof typeof estadoPrioridad];

    if (prioridadA !== prioridadB) {
      return prioridadA - prioridadB;
    }

    // Si ambos están "Entregado", ordenar por horaTerminado en forma descendente
    if (a.estado === "Entregado" && b.estado === "Entregado") {
      return b.horaTerminado!.localeCompare(a.horaTerminado!);
    }

    // Si ambos están "Listo", ordenar por horaAsignado en forma ascendente
    if (a.estado === "Listo" && b.estado === "Listo") {
      return a.horaAsignado.localeCompare(b.horaAsignado);
    }

    // Si ambos están "En preparación", ordenar por horaAsignado en forma descendente
    if (a.estado === "En preparación" && b.estado === "En preparación") {
      return b.horaAsignado.localeCompare(a.horaAsignado);
    }

    return 0; // Si no se cumplen las condiciones anteriores, los pedidos son iguales en prioridad
  });
}


type GananciaMensual = {
  mes: string;
  ganancia: number;
}

type DashboardInfo = {
  gananciaMensual: GananciaMensual[]
  gananciaDiaria: IngresoDiario[]
  entregaPromedio: string
  gananciaTotal: number
  totalPedidos: number
  entregados: number
  crecimientoMensual: number
  topProductos: TopMenuItem[]
  topCategorias: CategoriaGanancia[]
}

type IngresoDiario = {
  dia: string;
  ingreso: number;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dashboardInfo(pedidos: any[]): DashboardInfo {
  // cantidad total de pedidos
  const totalPedidos = pedidos.length;

  // cantidad de pedidos entregados
  const entregados = pedidos.filter(pedido => pedido.estado === "Entregado").length;

  // Meses en formato string
  const meses: string[] = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];



  // Filtrar los pedidos que tienen ambos campos
  const pedidosEntregados = pedidos.filter(
    (pedido) => pedido.horaTerminado 
  );

  // Objeto donde guardaremos la suma de las ganancias por mes
  const gananciaPorMes: { [key: string]: number } = {};

  // Objeto donde guardaremos la suma de los ingresos por día
  const ingresoPorDia: { [key: string]: number } = {};


  // para calculo de cresimiento mensual
  const ingresosPorMesCrecMensual: { [mes: string]: number } = {};


  let crecimientoMensual

  // Recorremos todos los pedidos
  pedidos.forEach(pedido => {
    // Extraemos el mes del pedido (formato dd/mm/yyyy)
    const fechaCompleta = pedido.fecha
    const fecha = fechaCompleta.split('/');

    const [, mm, yyyy] = fecha.map(Number);
    const keyMes = `${yyyy}-${mm.toString().padStart(2, '0')}`; // Formato "yyyy-mm"

    const mes = parseInt(fecha[1]) - 1;  // Restamos 1 porque el índice de los meses comienza en 0
    
    // Sumamos el precioTotal al mes correspondiente
    if (gananciaPorMes[meses[mes]]) {
      gananciaPorMes[meses[mes]] += pedido.precioTotal;
    } else {
      gananciaPorMes[meses[mes]] = pedido.precioTotal;
    }

    // Sumamos el precioTotal al día correspondiente
    if (ingresoPorDia[fechaCompleta]) {
      ingresoPorDia[fechaCompleta] += pedido.precioTotal;
    } else {
      ingresoPorDia[fechaCompleta] = pedido.precioTotal;
    }

    if (!ingresosPorMesCrecMensual[keyMes]) {
      ingresosPorMesCrecMensual[keyMes] = 0;
    }
    ingresosPorMesCrecMensual[keyMes] += pedido.precioTotal;
  });

  // Convertimos el objeto de ganancias en un arreglo de objetos con mes y gananciaMensual
  const gananciaMensual: Array<GananciaMensual> = Object.keys(gananciaPorMes).map(mes => {
    return {
      mes: mes,
      ganancia: gananciaPorMes[mes]
    };
  });

  // Convertimos el objeto de ingresos en un arreglo de objetos con dia e ingreso
  const gananciaDiaria: IngresoDiario[] = Object.keys(ingresoPorDia).map(dia => {
    return {
      dia: dia,
      ingreso: ingresoPorDia[dia]
    };
  });

  // Calcular las diferencias en horas para cada pedido válido
  const tiempos = pedidosEntregados.map((ped) => {
    return calcularDiferenciaEntreHoras(ped.horaTerminado as string, ped.horaAsignado as string);
  });

  // Calcular el promedio de tiempos
  const entregaPromedio = calcularPromedioDeTiempo(tiempos);

  // Calcular la ganancia total
  const gananciaTotal =  pedidos.reduce((total, pedido) => total + pedido.precioTotal, 0);

  // Ordenar los meses en orden cronológico
  const mesesOrdenados = Object.keys(ingresosPorMesCrecMensual).sort();

  // Calcular el ingreso del mes actual y el mes anterior más cercano
  const ingresoMesActual = ingresosPorMesCrecMensual[mesesOrdenados[mesesOrdenados.length - 1]];
  let ingresoMesAnteriorMasCercano = 0;

  // Buscar el ingreso del mes anterior más cercano que no sea el mes actual
  for (let i = mesesOrdenados.length - 2; i >= 0; i--) {
    const mesAnterior = mesesOrdenados[i];
    if (ingresosPorMesCrecMensual[mesAnterior]) {
      ingresoMesAnteriorMasCercano = ingresosPorMesCrecMensual[mesAnterior];
      break;
    }
  }

  if (mesesOrdenados.length < 2 || ingresoMesAnteriorMasCercano === 0) {
    crecimientoMensual = 0;
  } else {
    crecimientoMensual = ((ingresoMesActual - ingresoMesAnteriorMasCercano) / ingresoMesAnteriorMasCercano) * 100;
  }

  const topProductos = obtenerTopMenuItems(pedidos);

  const topCategorias = calcularGananciasPorCategoria(pedidos);

  return { 
    gananciaMensual, 
    gananciaDiaria, 
    entregaPromedio, 
    gananciaTotal, 
    totalPedidos, 
    entregados, 
    crecimientoMensual, 
    topProductos, 
    topCategorias 
  };
}

type TopMenuItem = {
  nombre: string;
  totalCantidad: number;
  totalGanancia: number;
};

function obtenerTopMenuItems(pedidos: any[]): TopMenuItem[] {
  const menuItemMap: Map<string, TopMenuItem> = new Map();

  // Recorrer los pedidos y acumular cantidad y ganancia por item
  pedidos.forEach((pedido) => {
    pedido.pedidos.forEach(({ menuItem, cantidad }: { menuItem: { nombre: string; precio: number }, cantidad: number }) => {
      const { nombre, precio } = menuItem;
      const totalGanancia = cantidad * precio;

      if (menuItemMap.has(nombre)) {
        const item = menuItemMap.get(nombre)!;
        item.totalCantidad += cantidad;
        item.totalGanancia += totalGanancia;
      } else {
        menuItemMap.set(nombre, {
          nombre,
          totalCantidad: cantidad,
          totalGanancia,
        });
      }
    });
  });

  // Convertir el Map a un arreglo y ordenar por la cantidad de pedidos
  const topMenuItems = Array.from(menuItemMap.values())
    .sort((a, b) => b.totalCantidad - a.totalCantidad)
    .slice(0, 10);

  return topMenuItems;
}

interface CategoriaGanancia {
  categoria: string;
  gananciaTotal: number;
}

function calcularGananciasPorCategoria(ordenes: any[]): CategoriaGanancia[] {
  const gananciasPorCategoria: Record<string, number> = {};

  ordenes.forEach((orden) => {
    orden.pedidos.forEach((pedido: { menuItem: { categoria: string; precio: number }; cantidad: number }) => {
      const categoria = pedido.menuItem.categoria;
      const ganancia = pedido.menuItem.precio * pedido.cantidad;

      if (gananciasPorCategoria[categoria]) {
      gananciasPorCategoria[categoria] += ganancia;
      } else {
      gananciasPorCategoria[categoria] = ganancia;
      }
    });
  });

  return Object.entries(gananciasPorCategoria).map(([categoria, gananciaTotal]) => ({
    categoria,
    gananciaTotal,
  }));
}

type GananciaPorCategoria = {
  categoria: string;
  gananciaTotal: number;
};

type ChartConfig = {
  [key: string]: {
    label: string;
    color?: string;
  };
};

export function generarChartConfig(datos: GananciaPorCategoria[]): ChartConfig {
  return datos.reduce<ChartConfig>(
    (config, { categoria }) => {
      // Convertir la categoría a formato camelCase para usar como clave
      const clave = categoria
        .replace(/ /g, "") // Eliminar espacios
        .replace(/[ÁÉÍÓÚáéíóú]/g, (match) => {
          // Reemplazar caracteres acentuados
          const map: Record<string, string> = {
            á: "a",
            é: "e",
            í: "i",
            ó: "o",
            ú: "u",
            Á: "A",
            É: "E",
            Í: "I",
            Ó: "O",
            Ú: "U",
          };
          return map[match];
        })
        .replace(/^[A-Z]/, (match) => match.toLowerCase()); // Convertir la primera letra a minúscula

      config[clave] = {
        label: categoria,
        color: "hsl(var(--primary))",
      };
      return config;
    },
    {
      gananciaTotal: {
        label: "Ganancia",
      },
    }
  );
}