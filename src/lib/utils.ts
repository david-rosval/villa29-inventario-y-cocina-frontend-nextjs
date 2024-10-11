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