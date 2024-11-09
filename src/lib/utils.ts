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

  // Recorremos todos los pedidos
  pedidos.forEach(pedido => {
    // Extraemos el mes del pedido (formato dd/mm/yyyy)
    const fechaCompleta = pedido.fecha
    const fecha = fechaCompleta.split('/');


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

  return { gananciaMensual, gananciaDiaria, entregaPromedio, gananciaTotal, totalPedidos, entregados };
}

