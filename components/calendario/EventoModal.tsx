export const EventoModal = () => {
  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
      <form action='' className='bg-white rounded-lg shadow-2xl w-1/4'>
        <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
          <span className='text-gray-400'>drag</span>
          <button className=''>
            <span className='text-gray-400'>close</span>
          </button>
        </header>
      </form>
    </div>
  )
}
