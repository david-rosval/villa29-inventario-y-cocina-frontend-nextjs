import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NumberTicker from "../ui/number-ticker";

export default function CrecimientoMensual({ crecimientoMensual }: { crecimientoMensual: number }) {
  return (
    <Card className="">
      <CardHeader className="h-1/3">
        <CardTitle>
          Crecimiento mensual  
        </CardTitle>
      </CardHeader>
      <CardContent className=" flex justify-center items-center h-2/3 ">
        <div className="">
          <p className="text-xl font-semibold text-primary/60">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={crecimientoMensual} decimalPlaces={2} />
            </span>%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
