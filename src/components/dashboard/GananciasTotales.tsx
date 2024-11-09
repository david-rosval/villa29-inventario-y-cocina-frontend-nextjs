import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import NumberTicker from "../ui/number-ticker";

export default function GananciasTotales({ gananciaTotal }: { gananciaTotal: number }) {
  return (
    <Card className="">
      <CardHeader className="h-1/3">
        <CardTitle>
          Ganancias totales  
        </CardTitle>
      </CardHeader>
      <CardContent className=" flex justify-center items-center h-2/3 ">
        <div className="">
          <p className="text-xl font-semibold text-primary/60">
            S/. <span className="text-4xl font-bold text-primary">
              <NumberTicker value={gananciaTotal} decimalPlaces={2} />
              
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
