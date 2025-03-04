'use client'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Tailwind
} from '@react-email/components'
import Image from 'next/image'

type Props = {
  user: string
  timeExpires: string
  code: string
}

export const OtpUser = ({ user, timeExpires, code }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Tu código de verificación para ingresar a Fundación Choyün</Preview>
      <Tailwind>
        <Body className='bg-white font-sans'>
          <Container className='mx-auto p-4 max-w-600'>
            <Section className='bg-white border border-black rounded-lg p-8 shadow-sm'>
              <Heading className='text-2xl font-bold text-black mb-4 flex justify-center flex-col items-center'>
                <Image
                  className='w-[15rem] pb-[2rem]'
                  src='/assets/logo_choyun-1.png'
                  alt='logo-choyun'
                  width={100}
                  height={100}
                />
                Verifica tu cuenta
              </Heading>

              <Text className='text-black mb-4 pl-4'>
                Hola <b>{user}</b>
              </Text>

              <Text className='text-black mb-6 pl-4'>
                Utiliza el siguiente código para verificar tu cuenta. Este código expirará en{' '}
                {timeExpires}.
              </Text>

              <Section className='bg-black p-4 mb-6 text-center'>
                <Text className='text-3xl font-mono font-bold tracking-wide text-white'>
                  {code}
                </Text>
              </Section>
              <Section className='text-center mb-8'>
                <Button
                  className='cursor-pointer bg-gray-500 text-white py-4 px-8 rounded-lg'
                  href={'/'}>
                  Crear mi contraseña
                </Button>
              </Section>

              <Text className='text-gray-600 mb-6 pl-4'>
                Si no has solicitado este código, puedes ignorar este correo.
              </Text>

              <Hr className='border-gray-200 my-6' />

              <Text className='text-sm text-gray-500 text-center'>
                &copy; {new Date().getFullYear()} Fundación Choyün. Todos los derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
