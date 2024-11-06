'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { EyeClosedIcon, EyeIcon } from '@primer/octicons-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import useLogin from '@/hooks/useLogin'
import { useToast } from '@/hooks/use-toast'
import { useUserStore } from '@/store/user-store'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  password: z.string().min(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
})
export const LoginForm = () => {
  const router = useRouter()
  const [pass, setPass] = useState(true)
  const setUser = useUserStore((state) => state.setUser)
  const user = useUserStore((state) => state.user)
  const { loginUser, getUser } = useLogin()
  const { toast } = useToast()

  const verPass = () => {
    setPass(!pass)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutateAsync: loginUserAsync } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser
  })
  const { mutateAsync: getUserAsync } = useMutation({
    mutationKey: ['getUser'],
    mutationFn: getUser
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { validated, user_id, message, exp } = await loginUserAsync(values)
    console.log(user_id)
    if (validated) {
      toast({
        title: message,
        className:
          'fixed top-4 right-[20px] -transform-x-1/2 z-50 bg-green-500 max-w-[350px] text-white',
        duration: 3000
      })
      const { user } = await getUserAsync(user_id)
      setUser(user)
      router.push('/')
    } else {
      toast({
        title: message,
        className:
          'fixed top-4 right-[20px] -transform-x-1/2 z-50 bg-red-500 max-w-[350px] text-white',
        duration: 3000
      })
    }
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input
                  placeholder='choyun@gmail.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder={pass ? '**********' : 'Contraseña'}
                    type={pass ? 'password' : 'text'}
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={verPass}
                    className='absolute right-0 -translate-y-[30px] -translate-x-[20px]'>
                    {pass ? (
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
          disabled={user !== null}>
          Iniciar sesión
        </Button>
      </form>
    </Form>
  )
}
