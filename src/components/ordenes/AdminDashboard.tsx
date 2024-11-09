
import { getOrdenes } from "@/lib/ordenes/actions"

import { dashboardInfo } from "@/lib/utils"
import Ingresos from "../dashboard/Ingresos"
import PromedioEntrega from "../dashboard/PromedioEntrega"
import GananciasTotales from "../dashboard/GananciasTotales"
import TotalEntregados from "../dashboard/TotalEntregados"

export default async function AdminDashboard() {
  const ordenes = await getOrdenes()

  const { gananciaMensual, gananciaDiaria, entregaPromedio, gananciaTotal, totalPedidos, entregados } = dashboardInfo(ordenes)
  
  return (
    <div className="flex flex-col p-16 w-full gap-5">
      <h1 className="text-3xl font-semibold">Reportes</h1>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid grid-cols-3 grid-rows-2 gap-3">
          <PromedioEntrega entregaPromedio={entregaPromedio} />
          <GananciasTotales gananciaTotal={gananciaTotal} />
          <TotalEntregados entregados={entregados} totalPedidos={totalPedidos} />
        </div>
        <Ingresos diario={gananciaDiaria} mensual={gananciaMensual} />
      </div>
    </div>
    
  )
}

