"use client";
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://drive.google.com/uc?export=view&id=1nim2jqyBBkETr09bEjvgOZ9huuIKqXFm",
    "https://drive.google.com/uc?export=view&id=1dcs3Xuwed6cAcY64ybpxiwKHkAUg71ZB"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, [images.length]);

  return (
    <>
      <Head>
        <title>Sobre Nosotros - Fundación Choyün</title>
        <meta
          name="description"
          content="Conoce más sobre la Fundación Choyün, nuestra misión y visión, y cómo trabajamos para promover la cultura y las artes en Chile."
        />
        <meta
          name="keywords"
          content="Fundación Choyün, sobre nosotros, misión, visión, arte, cultura, Chile, El Salvador"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.fundacionchoyun.cl/sobre-nosotros" />
      </Head>
      <main className="flex flex-col items-center justify-between p-4 md:p-6 lg:p-12">
        {}
        <div className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] h-0 pb-[50%] md:pb-[40%] lg:pb-[30%] rounded-lg shadow-md overflow-hidden mb-8 mt-16">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Imagen ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={`rounded-lg absolute transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

        {}
        <article className="grid grid-cols-1 gap-y-8 gap-x-6 mt-9 px-4 md:px-12 lg:px-28 fade-in-text">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">SOBRE NOSOTROS</h2>
            <p className="mb-4 text-sm md:text-base">
              En 2019, dos jóvenes artistas y profesores, reflexionaban un mundo distinto de trato y acción para infancias y juventudes de El Salvador, pues les preocupaba la falta de educación artística disponible para las infancias en el último campamento minero del mundo.
            </p>
            <p className="mb-4 text-sm md:text-base">
              Es aquí donde abren las puertas de su casa, convirtiéndola en talleres artísticos, huerta, y biblioteca libre, cada habitación de la casa estaba pensada para recibir y compartir saberes en torno a las artes y culturas. Así es como Pauli comparte sus pinceles y colores, y Juani sus instrumentos musicales.
            </p>
            <p className="mb-4 text-sm md:text-base">
              Para entender el porqué de nuestro nacimiento, hay que viajar un poquito más atrás, cuando estos jóvenes fueron niños, ambos sabían, en el norte y en el sur, que querían dedicarse al arte y a la música, y los diversos caminos los llevaron a enseñar, a hacer una comunidad artística, una familia. Ambos habían probado de primera fuente las artes y lo tremendamente sanadoras que estas son.
            </p>
            <p className="text-sm md:text-base">
              Nuestro impulso primordial es generar buenos seres humanos, libres y felices. De esos que cuando crezcan le harán un bien a la humanidad y al planeta.
            </p>
            <hr className="my-8 border-t-2 border-gray-300" />
          </div>
        </article>
      </main>
    </>
  );
}
