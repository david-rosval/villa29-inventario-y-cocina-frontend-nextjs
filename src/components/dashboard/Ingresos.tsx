"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useState } from "react"
import { obtenerDetallesFecha } from "@/lib/utils"

const chartConfig = {
  views: {
    label: "Ingresos (S/.)",
  },
  diario: {
    label: "Diario",
    color: "(var(--chart-1)",
  },
  mensual: {
    label: "Mensual",
    color: "var(--chart-2)",
  },

} satisfies ChartConfig

export default function Ingresos({diario, mensual}: {
  diario: Array<{
    dia: string
    ingreso: number
  }>
  mensual: Array<{
    mes: string
    ganancia: number
  }>
}) {
  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("diario")
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Ingresos</CardTitle>
          <CardDescription>
            Mostrando el total de ingresos en los últimos meses
          </CardDescription>
        </div>
        <div className="flex">
          {["diario", "mensual"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
              key={chart}
              data-active={activeChart === chart}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-4"
              onClick={() => setActiveChart(chart)}
              >
                <span className="font-semibold leading-none">
                  {chartConfig[chart].label}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={activeChart === "diario" ? diario : mensual}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={activeChart === "diario" ? "dia" : "mes"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                if (activeChart === "diario") {
                  const { dia, mes } = obtenerDetallesFecha(value)
                  return `${dia} ${mes[0].slice(0, 3)}`
                } else {
                  return value
                }
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    if (activeChart === "diario") {
                      const { dia, mes, year } = obtenerDetallesFecha(value)
                      return `${mes[0].slice(0, 3)} ${dia}, ${year}`
                    } else {
                      return value
                    }
                  }}
                />
              }
            />
            <Bar dataKey={activeChart === 'diario' ? 'ingreso' : 'ganancia'} fill={`var(--color-${activeChart})`}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
