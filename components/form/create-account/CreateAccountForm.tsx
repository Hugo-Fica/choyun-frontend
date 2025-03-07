'use client'

import { DatePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useUsers } from '@/hooks/useUsers'
import { calcularEdad, cn } from '@/utils/calculate'
import { sendOtpMail } from '@/utils/emails'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CalendarIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  names: z.string().min(6, { message: 'Los nombres son obligatorios' }),
  lastnames: z.string().min(6, { message: 'Los apellidos son obligatorios' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  phone: z.string().min(10, { message: 'El teléfono es obligatorio' }),
  role: z.string().min(10, { message: 'El permiso es obligatorio' }),
  birthday: z.string().min(10, { message: 'La fecha de nacimiento es obligatoria' }),
  age: z.number().min(1, { message: 'La edad es obligatoria' })
})

export const CreateAccountForm = () => {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [sendMail, setSendMail] = useState(false)
  const router = useRouter()
  const { postUserPublic } = useUsers()
  const queryCLient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: '',
      lastnames: '',
      email: '',
      phone: '+56',
      role: '6789533d64382fef07faca44',
      age: 0,
      birthday: ''
    }
  })

  const { mutateAsync: postUserAsync, isPending } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: postUserPublic,
    onSuccess: () => {
      queryCLient.invalidateQueries()
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
        router.push('/')
      } else {
        toast.error('Error al enviar el código de verificación')
      }
      setSendMail(false)
      form.reset()
    } else {
      toast.error('Error al crear el usuario')
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid md:grid-cols-2 xs:grid-cols-1 gap-4 justify-self-center'>
          <Image
            className='mb-10 col-span-full mx-auto'
            src='/assets/logo_choyun-1.png'
            alt='logo-choyun'
            width={300}
            height={100}
          />
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

          <Button
            className='mt-3 bg-black hover:bg-gray-800 col-span-full'
            disabled={isPending || sendMail}>
            {(isPending || sendMail) && <Loader2 className='animate-spin' />}
            Crear Usuario
          </Button>
        </div>
      </form>
    </Form>
  )
}
