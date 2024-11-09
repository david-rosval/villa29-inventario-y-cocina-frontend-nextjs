import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NumberTicker from "../ui/number-ticker";

export default function PromedioEntrega({ entregaPromedio }: { entregaPromedio: string }) {
  return (
    <Card>
      <CardHeader className="h-1/3">
        <CardTitle>
          Tiempo promedio de entrega  
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-2/3 ">
        <div className="">
          <p className="text-xl font-bold">
            <span className="text-4xl">
              <NumberTicker value={parseInt(entregaPromedio.split(':')[1])} />
            </span>
          min</p>
        </div>
      </CardContent>
    </Card>
  )
}
