import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NumberTicker from "../ui/number-ticker";

export default function TotalEntregados({ entregados, totalPedidos }: { entregados: number, totalPedidos: number }) {
  return (
    <Card className="">
      <CardHeader className="h-1/3">
        <CardTitle>
          Pedidos entregados  
        </CardTitle>
      </CardHeader>
      <CardContent className=" flex justify-center items-center h-2/3 ">
        <div className="">
          <p className="text-3xl font-semibold text-primary/40">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={entregados} />
            </span>
            /{totalPedidos}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
