'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    'https://drive.google.com/uc?export=view&id=1E0gFkqUW2mDrGoZ0GCxOv9njBR6mNXc6',
    'https://drive.google.com/uc?export=view&id=1Mf_2mCcrZsDKalERKhhifjxeYu36qccS',
    'https://drive.google.com/uc?export=view&id=1s_W-ROhz5isy3S20k1vRPoW1bjsILdb2',
    'https://drive.google.com/uc?export=view&id=13y8n2eglQiANq8rbtPXeQnS78i7C_Lo8',
  ]

  const elementsRef = useRef<(HTMLElement | null)[]>([])
  elementsRef.current = []

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [images.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add(
              'opacity-100',
              'transform',
              'translate-x-0'
            )
          }
        })
      },
      { threshold: 0.1 }
    )

    elementsRef.current.forEach((element, index) => {
      if (element) {
        observer.observe(element)
        element.style.transitionDelay = `${index * 0.3}s` // Aplicando el retraso en función del índice
      }
    })

    return () => {
      elementsRef.current.forEach((element) => {
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }

  return (
    <>
      <main className='flex flex-col items-center justify-between p-6 md:p-12 lg:p-24'>
        <div
          className='relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] h-0 pb-[50%] md:pb-[40%] lg:pb-[30%] rounded-lg shadow-md overflow-hidden mb-8 mt-16 opacity-0 transition-opacity duration-1000 ease-in-out'
          ref={addToRefs}
        >
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Imagen ${index + 1}`}
              layout='fill'
              sizes='(max-width: 768px) 100vw, 1200px'
              priority
              objectFit='cover'
              className={`rounded-lg absolute transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        <article className='grid sx:grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 mt-9 px-6 md:px-12 lg:px-28 '>
          <div
            ref={addToRefs}
            className='opacity-0 translate-x-[-20px] transition-all duration-1000 ease-in-out'
          >
            <h2 className='text-lg md:text-2xl font-bold mb-4'>
              Acerca de Choyün
            </h2>
            <ul className='list-disc pl-5 space-y-4 md:text-base text-sm'>
              <li>
                Choyün significa “brote” o “brotar” en mapudungün, idioma
                Mapuche.
              </li>
              <li>
                Fundación Choyün nace a partir de la necesidad de revitalizar,
                difundir y amplificar la cultura y el arte en nuestra localidad.
              </li>
              <li>
                Somos una organización sin fines de lucro, constituida
                legalmente en octubre del 2019.
              </li>
              <li>
                Nacimos por el ímpetu descentralizador, acercando la cultura y
                las artes a El Salvador, la comuna de Diego de Almagro y la
                provincia de Chañaral.
              </li>
              <li>
                Realizamos actividades relacionadas con la educación artística
                como talleres permanentes presenciales de arte y música.
              </li>
              <li>
                Ofrecemos diversas actividades holísticas: salidas pedagógicas,
                visitas de artistas, cine familiar, huerta comunitaria,
                biblioteca libre, crianza respetuosa, yoga, y más.
              </li>
              <li>
                Creamos CONECTA, el área de talleres en línea de la fundación:
                Arte, Música e Ilustración.
              </li>
            </ul>
          </div>
          <div
            ref={addToRefs}
            className='opacity-0 translate-x-[-20px] transition-all duration-1000 ease-in-out'
          >
            <h2 className='text-lg md:text-2xl font-bold mb-4'>
              Nuestra Visión
            </h2>
            <p className='mb-4 text-sm md:text-base'>
              Nuestra Visión es crear una comunidad inclusiva y no competitiva a
              través de una profunda experiencia con las artes y todas las
              disciplinas relacionadas.
            </p>
            <span className='font-semibold'>Nuestros objetivos:</span>
            <ul className='pl-[18px] list-disc space-y-4 mt-4 text-sm md:text-base'>
              <li>
                Facilitar el acceso a la cultura, promoviendo una mejor calidad
                de vida para las ciudadanas y ciudadanos.
              </li>
              <li>
                Generar instancias de enseñanza-aprendizaje, fortalecimiento,
                desarrollo y difusión de la cultura, las artes y la ecología.
              </li>
              <li>
                Potenciar acciones simbólicas y concretas que permitan la
                reivindicación de la cultura, las artes y la ecología.
              </li>
              <li>
                Impulsar y promover la implementación de proyectos artísticos
                que tengan efectos significativos en nuestra comunidad.
              </li>
              <li>
                Colaborar en la acción de otras instituciones y organismos que
                persigan objetivos coherentes con nuestra visión y misión.
              </li>
            </ul>
          </div>
        </article>
      </main>
    </>
  )
}
