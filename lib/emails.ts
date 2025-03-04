import { Resend } from 'resend'
import { OtpUser } from '../components/mail/otp/opt_user'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendOtpMail = async (user: string, timeExpires: string, code: string) => {
  await resend.emails.send({
    from: 'Fundación Choyün <no-reply@choyun.cl>',
    to: '',
    subject: 'Verifica tu cuenta en Fundación Choyün',
    react: OtpUser({ user, timeExpires, code })
  })
}
