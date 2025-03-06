import axios, { AxiosError } from 'axios'
type ApiErrorResponse = {
  message: string
  statusCode?: number
  error?: string
}
export const useValidate = () => {
  const validateOTP = async (dataValidate: { tokenOTP: string; OTP: string }) => {
    try {
      const { data } = await axios.post('/api/auth/otp', { dataValidate })
      return data as { message: string; token: string }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      return { message: axiosError.response?.data.message, token: '' }
    }
  }
  const createPassword = async (dataValidate: { tokenPass: string; password: string }) => {
    try {
      const { data } = await axios.post('/api/auth/password', { dataValidate })
      return data as { message: string }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      return { message: axiosError.response?.data.message }
    }
  }

  return { validateOTP, createPassword }
}
