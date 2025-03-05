import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calcularEdad = (fechaNacimiento: string): number => {
  let edad = new Date().getFullYear() - new Date(fechaNacimiento).getFullYear()

  if (
    new Date().getMonth() < new Date(fechaNacimiento).getMonth() ||
    (new Date().getMonth() === new Date(fechaNacimiento).getMonth() &&
      new Date().getDate() < new Date(fechaNacimiento).getDate())
  ) {
    edad--
  }
  return edad
}
