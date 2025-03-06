'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useValidate } from '@/hooks/useValidate'
import { cn } from '@/utils/calculate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  otp: z.string().min(6, { message: 'Código de verificación debe ser de 6 caracteres' }).max(6)
})

export const OtpForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { validateOTP } = useValidate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: ''
    }
  })

  const { mutateAsync: validateOTPAsync, isPending } = useMutation({
    mutationKey: ['validateOTP'],
    mutationFn: validateOTP
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { token, message } = await validateOTPAsync({
      tokenOTP: searchParams.get('token') as string,
      OTP: values.otp
    })
    if (!token) {
      toast.error(message)
      router.push('/')
      return
    }
    if (token) {
      toast.success(message)
      router.push(`/validate-otp/create-password?token=${token}`)
      return
    }
  }
  return (
    <div className='flex flex-col items-center justify-center gap-y-4'>
      <Image
        className='mb-10'
        src='/assets/logo_choyun-1.png'
        alt='logo-choyun'
        width={300}
        height={100}
      />
      <span>Ingresa el código de verificación</span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-8 space-y-8'>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center gap-1'>
                <FormControl className='flex items-center justify-center'>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    disabled={isPending}>
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className='mx-auto max-w-xs text-center'></FormMessage>
              </FormItem>
            )}
          />

          <div className='flex flex-col items-center space-y-4'>
            <Button
              type='submit'
              size='sm'
              className='w-full sm:w-3/4'
              disabled={isPending}>
              {isPending ? (
                <>
                  <Loader
                    size={16}
                    className='mr-2 animate-spin'
                  />{' '}
                  Verificando
                </>
              ) : (
                'Verificar'
              )}
            </Button>

            <Button
              type='button'
              variant='secondary'
              size='sm'
              className='w-full sm:w-3/4'
              asChild>
              <Link
                href='/'
                className={cn(isPending && 'pointer-events-none opacity-50')}>
                Atrás
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
