'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { calcularEdad, cn } from '@/utils/calculate'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { DatePicker } from '../DatePicker'
import { useRolesStore } from '@/store/useRolesStore'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { useUsers } from '@/hooks/useUsers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useUserAuthStore } from '@/store/userAuthStore'
import { sendOtpMail } from '@/utils/emails'

const formSchema = z.object({
  names: z.string().min(6, { message: 'Los nombres son obligatorios' }),
  lastnames: z.string().min(6, { message: 'Los apellidos son obligatorios' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  phone: z.string().min(10, { message: 'El teléfono es obligatorio' }),
  role: z.string().min(10, { message: 'El permiso es obligatorio' }),
  birthday: z.string().min(10, { message: 'La fecha de nacimiento es obligatoria' }),
  age: z.number().min(1, { message: 'La edad es obligatoria' })
})

export function UserCreateModal() {
  const role = useUserAuthStore((state) => state.user?.role)
  const queryCLient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [sendMail, setSendMail] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const roles = useRolesStore((state) => state.roles)
  const { postUser } = useUsers()

  const { mutateAsync: postUserAsync, isPending } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: postUser,
    onSuccess: () => {
      queryCLient.invalidateQueries()
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: '',
      lastnames: '',
      email: '',
      phone: '+56',
      role: '',
      age: 0,
      birthday: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newUser = {
      names: values.names.toLowerCase(),
      lastnames: values.lastnames.toLowerCase(),
      email: values.email.toLowerCase(),
      age: values.age,
      birthday: values.birthday,
      phone: values.phone,
      role_id: values.role
    }
    const isPosted = await postUserAsync(newUser)

    if (isPosted) {
      toast.success('Usuario creado exitosamente')
      setSendMail(true)
      const { succes } = await sendOtpMail(
        `${newUser.names} ${newUser.lastnames}`,
        newUser.email,
        '05:00',
        isPosted.otp.code,
        isPosted.otp.token
      )
      if (succes) {
        toast.success('Se envió el código de verificación')
      } else {
        toast.error('Error al enviar el código de verificación')
      }
      setSendMail(false)
      form.reset()
      setOpen(false)
    } else {
      toast.error('Error al crear el usuario')
    }
  }

  const handleModal = () => {
    setOpen(!open)
    form.reset()
  }
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={handleModal}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='max-w-[15rem] w-full'
            disabled={role?.includes('user')}>
            Crear usuario
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Crear nuevo usuario</DialogTitle>
            <DialogDescription>Completa los campos para agregar un nuevo usuario</DialogDescription>
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
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Acceso de usuario</FormLabel>
                      <FormControl>
                        <Select onValueChange={(value) => field.onChange(value)}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Selecciona un permiso' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Accesos</SelectLabel>
                              {roles.map((role) => (
                                <SelectItem
                                  key={role.id}
                                  value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className=''>
                <Button
                  className='mt-3 bg-green-500 hover:bg-green-700'
                  disabled={isPending || sendMail}>
                  {(isPending || sendMail) && <Loader2 className='animate-spin' />}
                  Crear Usuario
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
