import { Dialog } from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction } from 'react'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUsers } from '@/hooks/useUsers'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  userId: string
}

export const UserDeleteModal = ({ open, setOpen, userId }: Props) => {
  const queryCLient = useQueryClient()
  const { deleteUser } = useUsers()
  const handleModal = () => {
    setOpen(!open)
  }

  const { mutateAsync: deleteUserAsync, isPending } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryCLient.invalidateQueries()
    }
  })

  const deleteUserHandler = async () => {
    const isDeleted = await deleteUserAsync(userId)
    if (isDeleted) {
      toast.success('Usuario eliminado exitosamente')
      setOpen(false)
    } else {
      toast.error('Error al eliminar el usuario')
    }
  }
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={handleModal}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Eliminar usuario</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este usuario?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className=''>
            <Button
              className='mt-3 bg-red-500 hover:bg-red-700'
              onClick={deleteUserHandler}
              disabled={isPending}>
              {isPending && <Loader2 className='animate-spin' />}
              Eliminar Usuario
            </Button>
            <Button
              className='mt-3 bg-blue-500 hover:bg-blue-700'
              onClick={() => setOpen(false)}
              disabled={isPending}>
              {isPending && <Loader2 className='animate-spin' />} Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
