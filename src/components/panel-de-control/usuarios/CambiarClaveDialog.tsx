import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ChangePasswordForm from "./ChangePasswordForm"

export default function CambiarClaveDialog({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar contraseña</DialogTitle>
          <DialogDescription>
            <p>Ten en cuenta que:</p>
            <ul className="list-disc list-inside">
              <li>La contraseña debe tener como mínimo 6 caracteres</li>
              <li>La nueva contraseña debe ser diferente a la actual</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <ChangePasswordForm />
      </DialogContent>
    </Dialog>
  )
}
