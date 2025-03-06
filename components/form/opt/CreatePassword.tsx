'use client'
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
import { useValidate } from '@/hooks/useValidate'
import { validarTokenClient } from '@/utils/authClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeClosedIcon, EyeIcon } from '@primer/octicons-react'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .regex(/[A-Z]/, { message: 'Debe incluir al menos una letra mayúscula' })
      .regex(/[a-z]/, { message: 'Debe incluir al menos una letra minúscula' })
      .regex(/[0-9]/, { message: 'Debe incluir al menos un número' })
      .regex(/[^A-Za-z0-9]/, { message: 'Debe incluir al menos un símbolo especial' }),
    repeatPassword: z.string()
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repeatPassword']
  })

export const CreatePassword = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { createPassword } = useValidate()
  const [pass1, setPass1] = useState(true)
  const [pass2, setPass2] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      repeatPassword: ''
    }
  })

  const verPass1 = () => {
    setPass1(!pass1)
  }
  const verPass2 = () => {
    setPass2(!pass2)
  }

  const { mutateAsync: createPasswordAsync, isPending } = useMutation({
    mutationKey: ['createPassword'],
    mutationFn: createPassword
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { message } = await createPasswordAsync({
      password: values.newPassword,
      tokenPass: searchParams.get('token') as string
    })
    if (message?.includes('creada')) {
      toast.success(message)
      router.push('/inicio-sesion')
      return
    }
    toast.error(message)
  }
  return (
    <Form {...form}>
      <Image
        className='mb-10'
        src='/assets/logo_choyun-1.png'
        alt='logo-choyun'
        width={300}
        height={100}
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'>
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crear contraseña</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder={pass1 ? '**********' : 'crear contraseña'}
                    type={pass1 ? 'password' : 'text'}
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={verPass1}
                    className='absolute right-0 -translate-y-[30px] -translate-x-[20px]'>
                    {pass1 ? (
                      <EyeIcon
                        size={24}
                        className='fill-gray-700'
                      />
                    ) : (
                      <EyeClosedIcon
                        size={24}
                        className='fill-gray-700'
                      />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='repeatPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repetir contraseña</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder={pass2 ? '**********' : 'Repetir contraseña'}
                    type={pass2 ? 'password' : 'text'}
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={verPass2}
                    className='absolute right-0 -translate-y-[30px] -translate-x-[20px]'>
                    {pass2 ? (
                      <EyeIcon
                        size={24}
                        className='fill-gray-700'
                      />
                    ) : (
                      <EyeClosedIcon
                        size={24}
                        className='fill-gray-700'
                      />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={isPending}>
          {isPending && <Loader2 className='animate-spin' />}
          Crear contraseña
        </Button>
      </form>
    </Form>
  )
}
