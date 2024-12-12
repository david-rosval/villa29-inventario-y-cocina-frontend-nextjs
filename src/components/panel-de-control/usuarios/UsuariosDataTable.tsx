"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Plus, Trash2, UserRoundPen } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AgregarUsuarioDialog from "./AgregarUsuarioDialog"
import EditarUsuarioDialog from "./EditarUsuarioDialog"
import EliminarUsuarioDialog from "./EliminarUsuarioDialog"
import { UsuarioSeleccionadoContext } from "./UsuarioSeleccionadoProvider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

export type Usuario = {
  id: string
  nombre: string
  apellido: string
  email: string
  rol: 'Administrador' | 'Cocinero' | 'Mozo/Cajero' | undefined
}

export default function UsuariosDataTable({ usuarios }: { usuarios: Usuario[] }) {

  const { usuarioSeleccionado, setUsuarioSeleccionado } = React.useContext(UsuarioSeleccionadoContext)
  
  const data: Usuario[] | [] = usuarios

  const columns: ColumnDef<Usuario>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
            
          }}
          aria-label="Seleccionar todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
          }}
          aria-label="Seleccionar fila"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="size-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize truncate lg:max-w-none max-w-16 ml-3">{row.getValue("nombre")}</div>
      ),
    },
    {
      accessorKey: "apellido",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Apellido
            <ArrowUpDown className="size-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize truncate lg:max-w-none max-w-16">{row.getValue("apellido")}</div>
      ),
    },
  
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="size-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase truncate lg:max-w-none max-w-20">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "rol",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rol
            <ArrowUpDown className="size-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="truncate lg:max-w-none max-w-16">{row.getValue("rol")}</div>
      ),
    },
    
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  
  React.useEffect(() => {
    setUsuarioSeleccionado(table.getFilteredSelectedRowModel().rows.map(row => row.original))
  }, [rowSelection, setUsuarioSeleccionado, table])
  
  return (
    <div className="w-full">

      <div className="flex items-center py-4 w-full gap-3">

        <TooltipProvider>
          <Tooltip>
            <AgregarUsuarioDialog>
              <TooltipTrigger 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-9 h-9 bg-primary text-primary-foreground shadow hover:bg-primary/90 "
              >
                <Plus />
              </TooltipTrigger>
            </AgregarUsuarioDialog>
            <TooltipContent>
              <p>Agregar un nuevo usuario</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex-1">
          <Input
            placeholder="Buscar por email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <EliminarUsuarioDialog>
              <TooltipTrigger
                disabled={(usuarioSeleccionado.length <= 0) ? true : false}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-9 h-9 bg-red-500 hover:bg-red-500/90 shadow-sm"
              >
                <Trash2 className="max-size-16 stroke-white " />
              </TooltipTrigger>
            </EliminarUsuarioDialog>
            <TooltipContent>
              <p>Eliminar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <EditarUsuarioDialog table={table}>
              <TooltipTrigger 
                disabled={(usuarioSeleccionado.length > 1 || usuarioSeleccionado.length <= 0) ? true : false}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-9 h-9 bg-blue-600 hover:bg-blue-600/90 shadow-sm"
              >
                <UserRoundPen className="max-size-16 stroke-white" />
              </TooltipTrigger>
            </EditarUsuarioDialog>
            <TooltipContent>
              <p>Editar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>
      <Separator />

      <div className="w-full flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="mb-2">
              Columnas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-10"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} columna(s) seleccionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
