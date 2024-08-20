import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <Image
        src={
          'https://drive.google.com/uc?export=view&id=1E0gFkqUW2mDrGoZ0GCxOv9njBR6mNXc6'
        }
        alt='FONDO-FUNDACIÓN'
        width={1920}
        height={1080}
        className='w-[70%] h-[40%]'
      />
      <article className='grid grid-cols-2 gap-x-6 mt-9 px-28'>
        <div>
          <ul>
            <li className='list-disc'>
              Choyün significa “brote” o “brotar” en mapudungün, idioma Mapuche.
            </li>
            <li className='list-disc'>
              Fundación Choyün nace a partir de la necesidad de revitalizar,
              difundir y amplificar la cultura y el arte en nuestra localidad.
            </li>
            <li className='list-disc'>
              Somos una organización sin fines de lucro, constituida legalmente
              en octubre del 2019.
            </li>
            <li className='list-disc'>
              Nacimos por el ímpetu descentralizador, acercando la cultura y las
              artes a El Salvador, la comuna de Diego de Almagro y la provincia
              de Chañaral. revitalizando la función social del arte, llegando a
              todas las personas, sin discriminación etaria, de raza, de género,
              económica o religiosa.
            </li>
            <li className='list-disc'>
              Realizamos actividades relacionadas con la educación artística
              como talleres permanentes presenciales de arte y música con
              enfoque en arteterapia y en musicoterapia.
            </li>
            <li className='list-disc'>
              Nuestra responsabilidad social es primordial, así que además
              ofrecemos diversas actividades holísticas: salidas pedagógicas,
              visitas de artistas, cine familiar, huerta comunitaria, biblioteca
              libre, crianza respetuosa, yoga, y más.
            </li>
            <li className='list-disc'>
              Con la necesidad de ser aporte en muchos más territorios creamos
              CONECTA, el área de talleres en linea de la fundación: Arte,
              Música e Ilustración.
            </li>
          </ul>
        </div>
        <div>
          <p>
            Nuestra Visión es crear una comunidad inclusiva y no competitiva a
            través de una profunda experiencia con las artes y todas las
            disciplinas relacionadas. Nuestra misión es abrir espacios para el
            desarrollo humano, cultural, artístico y educativo, favoreciendo al
            crecimiento integral de las personas, fortalenciendo su caracter
            comunitario, aportando a la conciencia ecológica y conciencia
            social. Nuestros fundamentos valóricos son el respeto, la autonomía,
            el compromiso, la voluntad, la creatividad, la exploración, el
            asombro y el cariño.
          </p>
          <span>Nuestros objetivos:</span>
          <ul className='pl-[18px]'>
            <li className='list-disc'>
              Facilitar el acceso a la cultura, promoviendo una mejor calidad de
              vida para las ciudadanas y ciudadanos.
            </li>
            <li className='list-disc'>
              Generar instancias de enseñanza-aprendizaje, fortalecimiento,
              desarrollo y disfusión de la cultura, las artes y la ecología.
            </li>
            <li className='list-disc'>
              Potenciar acciones simbólicas y concretas que permitan la
              reivindicación de la cultura, las artes y la ecología.
            </li>
            <li className='list-disc'>
              Impulsar y promover la implementación de proyectos artísticos que
              tengan efectos significativos en nuestra comunidad.
            </li>
            <li className='list-disc'>
              Coolaborar en la acción de otras instituciones y organismos que
              persigan objetivos coherentes con nuestra visión y misión.
            </li>
          </ul>
        </div>
      </article>
    </main>
  )
}
