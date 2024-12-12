import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UpdateUserForm from "./UpdateUserForm"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ChangePasswordForm from "./ChangePasswordForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table } from "@tanstack/react-table"
import { Usuario } from "./UsuariosDataTable"

export default function EditarUsuarioDialog({
  children,
  table
}: {
  children: React.ReactNode
  table: Table<Usuario>
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar</DialogTitle>
          <DialogDescription>
            Elige entre cambiar información del usuario o actualizar la contraseña.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="account" className="">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Usuario</TabsTrigger>
            <TabsTrigger value="password">Contraseña</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Información de usuario</CardTitle>
                <CardDescription>
                  Realiza los cambios de usuario necesarios. Presiona guardar cambios cuando termines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateUserForm table={table} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Cambiar contraseña</CardTitle>
                <CardDescription>
                  Actualiza la contraseña del usuario. Presiona guardar cambios cuando termines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChangePasswordForm table={table} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>


      </DialogContent>
    </Dialog>
  )
}
