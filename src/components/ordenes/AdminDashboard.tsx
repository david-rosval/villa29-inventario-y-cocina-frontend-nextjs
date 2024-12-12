
import { getOrdenes } from "@/lib/ordenes/actions"

import { dashboardInfo } from "@/lib/utils"
import Ingresos from "../dashboard/Ingresos"
import PromedioEntrega from "../dashboard/PromedioEntrega"
import GananciasTotales from "../dashboard/GananciasTotales"
import TotalEntregados from "../dashboard/TotalEntregados"
import CrecimientoMensual from "../dashboard/CrecimientoMensual"
import TopProductos from "../dashboard/TopProductos"
import TopCategorias from "../dashboard/TopCategorias"
//import { Card } from "../ui/card"

export default async function AdminDashboard() {
  const ordenes = await getOrdenes()

  const { gananciaMensual, gananciaDiaria, entregaPromedio, gananciaTotal, totalPedidos, entregados, crecimientoMensual, topProductos, topCategorias } = dashboardInfo(ordenes)
  
  return (
    <div className="flex flex-col lg:p-16 lg:pt-8 p-10 pt-5 w-full gap-5 lg:gap-6">
      <h1 className="text-3xl font-semibold">Reportes</h1>
      <div className="lg:grid lg:grid-cols-2 flex flex-col gap-3 overflow-auto">
        <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2 flex flex-col gap-3">
          <PromedioEntrega entregaPromedio={entregaPromedio} />
          <GananciasTotales gananciaTotal={gananciaTotal} />
          <TotalEntregados entregados={entregados} totalPedidos={totalPedidos} />
          <CrecimientoMensual crecimientoMensual={crecimientoMensual} />
        </div>
        <Ingresos diario={gananciaDiaria} mensual={gananciaMensual} />
        <TopProductos topProductos={topProductos} /> 
        <TopCategorias topCategorias={topCategorias} />
      </div>
    </div>
    
  )
}

