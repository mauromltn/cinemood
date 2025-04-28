import React from 'react'

export default function Hero() {
  return (
    <main className='flex flex-col items-center mt-20'>
      <h1 className='w-180 text-4xl font-bold text-center mb-8'>
        FAI IL NOSTRO QUIZ PER SCOPRIRE IL TUO <span className='text-neutral-500'>MOOD</span> E TROVARE LA MIGLIOR ESPERIENZA DI <span className='text-neutral-500'>VISIONE</span>
      </h1>
      <button className='bg-orange-600 py-4 px-6 rounded-full font-bold hover:bg-orange-700 hover:text-white/80 duration-200'>
        FAI IL QUIZ
      </button>
    </main>
  )
}
