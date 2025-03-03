'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { DatePicker } from '../DatePicker'

const formSchema = z.object({
  names: z.string().min(10, { message: 'Los nombres son obligatorios' }),
  lastnames: z.string().min(10, { message: 'Los apellidos son obligatorios' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  phone: z.string().min(10, { message: 'El teléfono es obligatorio' }),
  role: z.string().min(10, { message: 'El rol es obligatorio' }),
  birthday: z.string().min(10, { message: 'La fecha de nacimiento es obligatoria' }),
  age: z.number()
})

export function CreateUserModal() {
  const [open, setOpen] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [newUser, setNewUser] = useState({
    names: '',
    lastnames: '',
    email: '',
    phone: '',
    role: '',
    age: '',
    birthday: ''
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
    console.log(values)
  }
  // const addUser = useUserStore((state) => state.addUser)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // addUser(newUser)
    setOpen(false)
    setNewUser({
      names: '',
      lastnames: '',
      email: '',
      phone: '',
      role: '',
      age: '',
      birthday: ''
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Crear usuario</Button>
      </DialogTrigger>
      <DialogContent className='w-[90rem]'>
        <DialogHeader>
          <DialogTitle>Crear nuevo usuario</DialogTitle>
          <DialogDescription>Completa los campos para agregar un nuevo usuario</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=''>
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
                          onClick={() => setOpenDatePicker(true)}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          {field.value ? (
                            new Date(field.value).toLocaleDateString('es-CL')
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
                        onChange={field.onChange}
                        setOpenDatePicker={setOpenDatePicker}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type='submit'
            className='ml-auto'>
            Crear Usuario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
