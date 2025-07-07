"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { generarChartConfig } from "@/lib/utils"


//satisfies ChartConfig 



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TopCategorias({ topCategorias }: { topCategorias: any[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartConfig = generarChartConfig(topCategorias) satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas según Categorías de productos</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} data-testid="chart-container">
          <BarChart
            accessibilityLayer
            data={topCategorias}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="categoria"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) =>
                value
              }
              orientation="left"
              width={100}
              
            />
            <XAxis dataKey="gananciaTotal" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="gananciaTotal" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
