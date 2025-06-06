import React from 'react'
import { HorizontalScroll } from './Carrousel/horizontal-scroll'
import { getTrendingMovies, getTrendingTVShows } from '@/lib/tmdb'
import { QuizButton } from '@/components/Quiz/quiz-button'


export default async function Hero() {
  const trendingMovies = await getTrendingMovies()
  const trendingTVShows = await getTrendingTVShows()

  return (
    <>
      <main className='flex flex-col items-center mt-20 mb-30 px-2 sm:px-0'>
        <h1 className='md:w-180 text-2xl md:text-4xl font-bold text-center mb-9'>
          FAI IL NOSTRO QUIZ PER SCOPRIRE IL TUO <span className='text-neutral-500'>MOOD</span> E TROVARE LA MIGLIOR ESPERIENZA DI <span className='text-neutral-500'>VISIONE</span>
        </h1>
        <QuizButton />
      </main>


      
      <div className="max-w-7xl mx-auto space-y-18 px-4 py-6 sm:p-6">
        <section id='trending-movies'>
          <h2 className="text-2xl font-bold mb-4">Film di Tendenza</h2>
          <HorizontalScroll items={trendingMovies} type="movie" />
        </section>

        <section id='trending-tv'>
          <h2 className="text-2xl font-bold mb-4">Serie TV di Tendenza</h2>
          <HorizontalScroll items={trendingTVShows} type="tv" />
        </section>
      </div>
    </>
  )
}
