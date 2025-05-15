"use client"

import { useState } from "react"
import { QuizModal } from "./quiz-modal"

type QuizAnswer = {
  mood: string
  activity: string
  preference: string
  freeText: string
}

export function QuizButton() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleQuizComplete = (answers: QuizAnswer) => {
    console.log("Quiz completato con le risposte:", answers)
    setShowQuiz(false)
    setQuizCompleted(true)

    // Qui potresti implementare la logica per suggerire film/serie in base alle risposte
  }

  return (
    <>
      <button
        onClick={() => setShowQuiz(true)}
        className="bg-orange-600 py-2 px-3 md:py-4 md:px-6 text-sm font-bold rounded-full hover:bg-orange-700 hover:text-white/80 duration-200"
      >
        {quizCompleted ? "RIFAI IL QUIZ" : "FAI IL QUIZ"}
      </button>

      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} onComplete={handleQuizComplete} />}
    </>
  )
}
