import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fundación Choyün - Arte y Cultura en Chile</title>
        <meta
          name="description"
          content="Fundación Choyün promueve la cultura y las artes en Chile, ofreciendo talleres, actividades holísticas y más. Conéctate con nosotros para explorar y aprender."
        />
        <meta
          name="keywords"
          content="Fundación Choyün, arte, cultura, talleres, Chile, musicoterapia, arteterapia, El Salvador, Diego de Almagro"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.fundacionchoyun.cl" />
      </Head>
      <main className="flex flex-col items-center justify-between p-6 md:p-12 lg:p-24">
        <Image
          src="https://drive.google.com/uc?export=view&id=1E0gFkqUW2mDrGoZ0GCxOv9njBR6mNXc6"
          alt="FONDO-FUNDACIÓN"
          width={1920}
          height={1080}
          className="w-full max-w-[70%] h-auto rounded-lg shadow-md"
        />
        <article className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 mt-9 px-6 md:px-12 lg:px-28">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Acerca de Choyün</h2>
            <ul className="list-disc pl-5 space-y-4 text-sm md:text-base">
              <li>Choyün significa “brote” o “brotar” en mapudungün, idioma Mapuche.</li>
              <li>Fundación Choyün nace a partir de la necesidad de revitalizar, difundir y amplificar la cultura y el arte en nuestra localidad.</li>
              <li>Somos una organización sin fines de lucro, constituida legalmente en octubre del 2019.</li>
              <li>Nacimos por el ímpetu descentralizador, acercando la cultura y las artes a El Salvador, la comuna de Diego de Almagro y la provincia de Chañaral.</li>
              <li>Realizamos actividades relacionadas con la educación artística como talleres permanentes presenciales de arte y música.</li>
              <li>Ofrecemos diversas actividades holísticas: salidas pedagógicas, visitas de artistas, cine familiar, huerta comunitaria, biblioteca libre, crianza respetuosa, yoga, y más.</li>
              <li>Creamos CONECTA, el área de talleres en línea de la fundación: Arte, Música e Ilustración.</li>
            </ul>
            <hr className="my-8 border-t-2 border-gray-300" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Nuestra Visión</h2>
            <p className="mb-4 text-sm md:text-base">
              Nuestra Visión es crear una comunidad inclusiva y no competitiva a través de una profunda experiencia con las artes y todas las disciplinas relacionadas.
            </p>
            <span className="font-semibold">Nuestros objetivos:</span>
            <ul className="pl-[18px] list-disc space-y-4 mt-4 text-sm md:text-base">
              <li>Facilitar el acceso a la cultura, promoviendo una mejor calidad de vida para las ciudadanas y ciudadanos.</li>
              <li>Generar instancias de enseñanza-aprendizaje, fortalecimiento, desarrollo y difusión de la cultura, las artes y la ecología.</li>
              <li>Potenciar acciones simbólicas y concretas que permitan la reivindicación de la cultura, las artes y la ecología.</li>
              <li>Impulsar y promover la implementación de proyectos artísticos que tengan efectos significativos en nuestra comunidad.</li>
              <li>Colaborar en la acción de otras instituciones y organismos que persigan objetivos coherentes con nuestra visión y misión.</li>
            </ul>
          </div>
        </article>
      </main>
    </>
  );
}
