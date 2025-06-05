"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

type QuizAnswer = {
  mood: string
  activity: string
  preference: string
  freeText: string
}

interface QuizModalProps {
  onClose: () => void
  onComplete: (answers: QuizAnswer) => void
}

export function QuizModal({ onClose, onComplete }: QuizModalProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer>({
    mood: "",
    activity: "",
    preference: "",
    freeText: "",
  })

  const questions = [
    {
      question: "Com'è andata la tua giornata?",
      options: ["Male", "Così così", "Bene", "Fantastica"],
      key: "mood" as const,
    },
    {
      question: "Hai voglia di…",
      options: ["Ridere", "Riflettere", "Emozionarti", "Distrarti"],
      key: "activity" as const,
    },
    {
      question: "Preferisci film o serie?",
      options: ["Film", "Serie", "Entrambi"],
      key: "preference" as const,
    },
    {
      question: "Scrivi liberamente come ti senti ora.",
      type: "text",
      key: "freeText" as const,
    },
  ]

  const currentQuestion = questions[step]

  const handleOptionSelect = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: option,
    }))
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: e.target.value,
    }))
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      onComplete(answers)
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const isOptionQuestion = currentQuestion.type !== "text"
  const canProceed = isOptionQuestion ? !!answers[currentQuestion.key] : true // Per il campo di testo libero, possiamo procedere anche se è vuoto

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative bg-neutral-900 rounded-lg overflow-hidden max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors cursor-pointer"
          aria-label="Chiudi"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-white">{currentQuestion.question}</h2>

          {isOptionQuestion ? (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-3 rounded-lg text-left transition-colors cursor-pointer ${
                    answers[currentQuestion.key] === option
                      ? "bg-orange-700 text-white"
                      : "bg-neutral-800 text-white hover:bg-neutral-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[currentQuestion.key]}
              onChange={handleTextChange}
              placeholder="Scrivi qui..."
              className="w-full h-32 p-3 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
            />
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={step === 0}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                step === 0 ? "bg-neutral-700 text-neutral-500 cursor-not-allowed" : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              Indietro
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                canProceed
                  ? "bg-orange-700 text-white hover:bg-orange-600"
                  : "bg-neutral-700 text-neutral-500 cursor-not-allowed"
              }`}
            >
              {step < questions.length - 1 ? "Avanti" : "Completa"}
            </button>
          </div>
        </div>

        {/* Indicatore di progresso */}
        <div className="flex bg-neutral-800">
          {questions.map((_, index) => (
            <div key={index} className={`h-1 flex-1 ${index <= step ? "bg-orange-700" : "bg-neutral-700"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
