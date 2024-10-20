export default function QuienesSomosPage() {
  return (
    <article className='flex flex-col xl:gap-4 2xl:px-96 xs:px-5 px-5 mt-[100px] md:px-28 xl:px-64 mb-10'>
      <header className='mb-[20px]'>
        <h2 className='font-bold underline'>Quienes somos</h2>
      </header>

      <section className=''>
        <div className='grid xs:grid-cols-1 xl:items-stretch xl:gap-x-16 xl:grid-cols-2 '>
          <p className='xs:col-span-1 text-center mb-6 xl:col-span-2'>BROTE DOCENTE</p>
          <article className='mt-1'>
            <figure>
              <span>foto docente</span>
              <figcaption>Paulina Soledad Elihuelfe Espinoza</figcaption>
            </figure>
            <h2 className='mb-[20px]'>Paulina Soledad Elihuelfe Espinoza</h2>
            <p className='mb-[15px] text-gray-400'>
              <strong>1991</strong>. Nace en Santiago, región metropolitana, Chile.
            </p>
            <p className='mb-[15px] text-gray-400'>
              Se desempeña como escultora en cerámica y profesora de artes visuales; ha trabajado en
              diversos ámbitos culturales y artísticos (artes visuales, teatro, danza, literatura y
              música) en Chile, Argentina, Ecuador, México y Bélgica.
            </p>
            <p className='mb-[15px] text-gray-400'>
              La última década ha realizado talleres de cerámica, dibujo y pintura en diversos
              espacios culturales, libertarios, sociales y hasta en su propia casa taller.
            </p>
            <p className='mb-[15px] text-gray-400'>
              Actualmente es Cofundadora de Fundación Choyün, donde se desempeña como presidenta,
              representante legal, profesora de arte y arte terapia.
            </p>
            <ul className='list-disc'>
              <li className='ml-5 font-semibold'>
                Licenciada en Artes Visuales con mención en Escultura. Universidad Finis Terrae.
              </li>
              <li className='ml-5 font-semibold'>
                Pedagogía en Educación Media mención Artes Visuales. Universidad Andrés Bello.
              </li>
              <li className='ml-5 font-semibold'>Diseño Teatral. Adtres.</li>
              <li className='ml-5 font-semibold'>
                Diplomado en Lingüística y Culturas Indígenas. Universidad de Chile.
              </li>
              <li className='ml-5 font-semibold'>
                Diplomado de Arte terapia Transdisciplinaria. Arketit.
              </li>
            </ul>
          </article>
          <article className='xs:mt-10 xl:mt-1'>
            <figure>
              <span>foto docente</span>
              <figcaption>Juan Ignacio Díaz Miranda</figcaption>
            </figure>
            <h2 className='mb-[20px]'>Juan Ignacio Díaz Miranda</h2>
            <p className='mb-[15px] text-gray-400'>
              <strong>1990</strong>. Nace en El Salvador, región de Atacama, Chile.
            </p>
            <p className='mb-[15px] text-gray-400'>
              Se desempeña como Músico, Compositor y Profesor; ha trabajado en la producción de dos
              discos musicales, en el área audiovisual trabajó como compositor para teatro, danza y
              cortometrajes; ha compuesto jingles para campañas publicitarias y ha trabajado como
              profesor de música en enseñanza básica y media en educación formal.
            </p>
            <p className='mb-[15px] text-gray-400'>
              Durante los años 2015 y 2016 formó la academia de música “Yo soy armonía” donde
              impartía clases de música popular en diversos instrumentos musicales.
            </p>
            <p className='mb-[15px] text-gray-400'>
              Actualmente es Cofundador de Fundación Choyün, donde se desempeña como secretario,
              profesor de Piano, Guitarra, Batería, Bajo eléctrico y ukelele.
            </p>
            <ul className='list-disc'>
              <li className='ml-5 font-semibold'>Licenciado en Música. Universidad Arcis.</li>
              <li className='ml-5 font-semibold'>
                Pedagogía en Educación Media mención Música. Universidad Andrés Bello.
              </li>
            </ul>
          </article>
        </div>
      </section>
    </article>
  )
}
