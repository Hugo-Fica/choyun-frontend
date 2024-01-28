export default function InicioSesionPage() {
  return (
    <>
      <div className='flex items-center mt-[45vh] justify-center h-full w-full flex-col'>
        <h1>Iniciar sesión</h1>
        <form action=''>
          <div className='relative'>
            <label htmlFor=''>Correo</label>
            <input type='text' />
          </div>
          <div>
            <label htmlFor=''>Contraseña</label>
            <input type='text' />
          </div>
          <button>Iniciar sesión</button>
        </form>
      </div>
    </>
  )
}
