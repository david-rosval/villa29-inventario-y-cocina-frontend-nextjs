import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import DeleteUserForm from "./DeleteUserForm"
import DeleteUserDialogHeader from "./DeleteUserDialogHeader"

export default function EliminarUsuarioDialog({
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
        <DeleteUserDialogHeader />
        <DeleteUserForm />
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" variant="secondary">No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
