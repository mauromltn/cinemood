"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { QuizModal } from "./quiz-modal"

export function QuizButton() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const router = useRouter()

  const handleQuizComplete = (analysisResult: any) => {
    console.log("Quiz completato con analisi Groq:", analysisResult)
    setShowQuiz(false)
    setQuizCompleted(true)

    // Costruisci i parametri di ricerca basati sull'analisi di Groq
    const searchParams = new URLSearchParams()

    // Aggiungi i generi analizzati da Groq
    if (analysisResult.genres && analysisResult.genres.length > 0) {
      searchParams.append("genres", analysisResult.genres.join(","))
    }

    // Aggiungi le informazioni originali per riferimento
    if (analysisResult.mood) {
      searchParams.append("mood", analysisResult.mood)
    }

    if (analysisResult.activity) {
      searchParams.append("activity", analysisResult.activity)
    }

    if (analysisResult.preference && analysisResult.preference !== "Entrambi") {
      searchParams.append("type", analysisResult.preference === "Film" ? "movie" : "tv")
    }

    // Aggiungi la spiegazione di Groq
    if (analysisResult.reasoning) {
      searchParams.append("reasoning", analysisResult.reasoning)
    }

    // Naviga alla pagina di raccomandazioni con i parametri
    router.push(`/recommendations?${searchParams.toString()}`)
  }

  return (
    <>
      <button
        onClick={() => setShowQuiz(true)}
        className="bg-orange-600 py-2 px-3 md:py-4 md:px-6 text-sm font-bold rounded-full hover:bg-orange-700 hover:text-white/80 duration-200 cursor-pointer"
      >
        {quizCompleted ? "RIFAI IL QUIZ" : "FAI IL QUIZ"}
      </button>

      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} onComplete={handleQuizComplete} />}
    </>
  )
}
