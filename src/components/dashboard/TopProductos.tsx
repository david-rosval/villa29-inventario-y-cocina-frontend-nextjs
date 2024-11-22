import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

/*
<div key={index}>
  <div  className="flex justify-between">
    <p>{producto.nombre}</p>
    <p>S/. {producto.totalGanancia.toFixed(2)}</p>
  </div>
  <div>
    <p>{producto.totalCantidad} unidades vendidas</p>
  </div>
</div>
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TopProductos({ topProductos }: { topProductos: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Top productos
        </CardTitle>
        <CardDescription>
          En esta tabla se muestra el Top 10 de los productos más vendidos
        </CardDescription>
      </CardHeader>
      <CardContent>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Top</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead className="text-center">Cantidad vendida</TableHead>
          <TableHead className="text-right">Ganancia total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topProductos.map((producto, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium ">{i+1}</TableCell>
            <TableCell className="truncate">{producto.nombre}</TableCell>
            <TableCell className="text-center">{producto.totalCantidad}</TableCell>
            <TableCell className="text-right">S/.{producto.totalGanancia.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
      </CardContent>
    </Card>
  )
}
