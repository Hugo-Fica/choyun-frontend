import { PlusIcon } from '@primer/octicons-react'

export const CrearEvento = () => {
  return (
    <button className='border p-2 rounded-full flex flex-row items-center shadow-md hover:shadow'>
      <PlusIcon size={'medium'} />
      <span className='pl-3 pr-7 font-medium text-xl'>Crear evento</span>
    </button>
  )
}
