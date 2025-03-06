import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import { useUserAuthStore } from '@/store/userAuthStore'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { calcularEdad, cn } from '@/utils/calculate'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { DatePicker } from '../DatePicker'

const formSchema = z.object({
  names: z.string().min(6, { message: 'Los nombres son obligatorios' }),
  lastnames: z.string().min(6, { message: 'Los apellidos son obligatorios' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  phone: z.string().min(10, { message: 'El teléfono es obligatorio' }),
  birthday: z.string().min(10, { message: 'La fecha de nacimiento es obligatoria' }),
  age: z.number().min(1, { message: 'La edad es obligatoria' })
})

const formSchemaPass = z.object({
  oldPass: z.string().min(6, { message: 'Los nombres son obligatorios' }),
  newPass: z.string().min(6, { message: 'Los apellidos son obligatorios' })
})

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
export const ProfileEdit = ({ open, setOpen }: Props) => {
  const user = useUserAuthStore((state) => state.user)
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: '',
      lastnames: '',
      email: '',
      phone: '+56',
      age: 0,
      birthday: ''
    }
  })
  const formPass = useForm<z.infer<typeof formSchemaPass>>({
    resolver: zodResolver(formSchemaPass),
    defaultValues: {
      oldPass: '',
      newPass: ''
    }
  })

  const handleModal = () => {
    setOpen(!open)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }
  const onSubmitPass = async (values: z.infer<typeof formSchemaPass>) => {
    console.log(values)
  }
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={handleModal}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>{`${user?.names} ${user?.lastnames}`}</DialogTitle>
            <DialogDescription>Completa los campos para editar tu perfil</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid md:grid-cols-2 xs:grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name='names'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombres</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='nombres del usuario'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastnames'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='apellidos del usuario'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='correo del usuario'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefono</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='+56912345678'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='birthday'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de nacimiento</FormLabel>
                      <Popover open={openDatePicker}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              onClick={() => setOpenDatePicker(!openDatePicker)}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}>
                              {field.value ? (
                                new Date(field.value).toLocaleDateString('es-CL', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className='w-full p-0'
                          align='center'>
                          <DatePicker
                            onChange={(date) => {
                              field.onChange(date)
                              form.setValue('age', calcularEdad(date))
                            }}
                            setOpenDatePicker={setOpenDatePicker}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='age'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edad</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='0'
                          disabled={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className=''>
                <Button
                  className='mt-3 bg-green-500  hover:bg-green-700'
                  //   disabled={isPending}
                >
                  {/* {isPending && <Loader2 className='animate-spin' />} */}
                  Actualizar Usuario
                </Button>
                <Button
                  className='mt-3  bg-blue-500  hover:bg-blue-700'
                  onClick={() => setOpen(false)}
                  //   disabled={isPending}
                >
                  {/* {isPending && <Loader2 className='animate-spin' />} */}
                  Cancelar
                </Button>
              </DialogFooter>
            </form>
          </Form>
          <Form {...formPass}>
            <form onSubmit={formPass.handleSubmit(onSubmitPass)}>
              <div className='grid md:grid-cols-2 xs:grid-cols-1 gap-4'>
                <FormField
                  control={formPass.control}
                  name='oldPass'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña actual</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='contraseña actual'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formPass.control}
                  name='newPass'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nueva contraseña</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='nueva contraseña'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
