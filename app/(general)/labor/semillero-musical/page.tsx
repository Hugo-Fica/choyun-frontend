export default function SemilleroMusicalPage() {
  return (
    <article className='px-[50px] flex flex-col gap-4'>
      <header className=''>
        <h2 className='font-bold underline'>semillero musical</h2>
      </header>
      <section className='flex flex-col gap-3'>
        <p>
          sirigido personas de todas las edades a partir de los 7 años, quienes tengan alguna
          inquietud en la práctica musical, ya sea personas que recién inician su búsqueda o quienes
          ya llevan algún recorrido, con o sin formación musical formal.
        </p>
      </section>
      <section className='flex flex-col gap-3'>
        <h4>Se realizan 2 sesiones a la semana:</h4>
        <p>
          La primera es una clase grupal de instrumento funcional, su objetivo es la práctica en un
          instrumento musical integrando conceptos de la teoría, lectoescritura, lenguaje, audición
          y composición musical. Se trabaja la práctica dividiendo a la música en 4 grandes mundos:
          Popular, Docto, Folklore y Jazz con la finalidad de abarcar la mayor cantidad de
          lenguajes, estilos y cosmovisiones en la música.
        </p>
        <p>
          La segunda es una clase de conjunto instrumental en la que se comparte con estudiantes de
          otros instrumentos y su objetivo es interpretar piezas musicales en formato banda.
          Mediante este método de aprendizaje musical vamos aportando a la integración de valores
          como la voluntad, la perseverancia, la tolerancia a la frustración, la compasión, el
          compañerismo, entre muchos otros, cualidades de suma importancia para nuestra visión de
          mundo
        </p>
      </section>
      <section className='flex flex-col gap-4'>
        <h4>INSTRUMENTOS A ELECCIÓN</h4>
        <ul>
          <li>
            <b>Piano:</b> Técnica – Teoría – Lectoescritura – Acompañamiento funcional – Repertorio
            popular y docto.
          </li>
          <li>
            <b>Guitarra básico:</b> Técnica – Teoría – Lectoescritura – Repertorio – Estilos.
          </li>
          <li>
            <b>Bajo Eléctrico básico:</b> Técnica – Teoría – Lectoescritura – Acompañamiento.
            funcional – Repertorio – Estilos.
          </li>
          <li>
            <b>Ukelele básico:</b> Técnica – Teoría – Lectoescritura – Repertorio.
          </li>
          <li>
            <b>Batería básico:</b> Técnica – Teoría – Lectoescritura – Patrones – Estilos –
            Repertorio – Improvisación.
          </li>
        </ul>
      </section>

      <section className='flex flex-col gap-4'>
        <h4>NO SE NECESITAN CONOCIMIENTOS PREVIOS.</h4>
        <p>
          <b>Taller permanente</b> de marzo a diciembre con dos clase a la semana de 1 hora.
        </p>
        <p>
          <b>Valor membresía: $35.000</b>
        </p>
      </section>
    </article>
  )
}
