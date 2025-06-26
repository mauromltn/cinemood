"use client"

import { useState } from "react"
import { X, Loader2, AlertTriangle, Sparkles } from "lucide-react"

type QuizAnswer = {
  mood: string
  activity: string
  preference: string
}

interface QuizModalProps {
  onClose: () => void
  onComplete: (analysisResult: any) => void
}

export function QuizModal({ onClose, onComplete }: QuizModalProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer>({
    mood: "",
    activity: "",
    preference: "",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  const questions = [
    {
      question: "Com'è andata la tua giornata?",
      options: ["Male", "Così così", "Bene", "Fantastica"],
      key: "mood" as const,
    },
    {
      question: "Hai voglia di…",
      options: ["Piangere", "Ridere", "Emozionarti", "Distrarti"],
      key: "activity" as const,
    },
    {
      question: "Preferisci film o serie?",
      options: ["Film", "Serie", "Entrambi"],
      key: "preference" as const,
    },
  ]

  const currentQuestion = questions[step]

  const handleOptionSelect = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: option,
    }))
  }

  const analyzeQuizWithGroq = async (quizAnswers: QuizAnswer) => {
    setIsAnalyzing(true)
    setAnalysisError(null)

    try {
      console.log("Invio risposte a Groq per l'analisi:", quizAnswers)

      const response = await fetch("/api/quiz-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizAnswers),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Errore ${response.status}`)
      }

      const analysisResult = await response.json()
      console.log("Risultato analisi Groq:", analysisResult)

      return analysisResult
    } catch (error) {
      console.error("Errore durante l'analisi con Groq:", error)
      setAnalysisError(`Errore: ${(error as Error).message}`)
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      // Quiz completato - analizza con Groq
      const analysisResult = await analyzeQuizWithGroq(answers)

      if (analysisResult) {
        onComplete(analysisResult)
      }
      // Se c'è un errore, l'utente può riprovare o chiudere il modal
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const skipAnalysis = () => {
    // Fallback senza analisi AI
    onComplete({
      genres: [35, 18, 28, 12], // Mix generico
      reasoning: "Raccomandazioni generiche",
      mood: answers.mood,
      activity: answers.activity,
      preference: answers.preference,
      note: "Analisi saltata",
    })
  }

  const canProceed = !!answers[currentQuestion.key]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative bg-neutral-900 rounded-lg overflow-hidden max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
          aria-label="Chiudi"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-white">{currentQuestion.question}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  answers[currentQuestion.key] === option
                    ? "bg-orange-700 text-white"
                    : "bg-neutral-800 text-white hover:bg-neutral-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Mostra info sull'AI nell'ultimo step */}
          {step === questions.length - 1 && (
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Analisi AI Personalizzata</span>
              </div>
              <p className="text-xs text-blue-200">
                Groq AI analizzerà le tue risposte per creare raccomandazioni cinematografiche perfette per te
              </p>
            </div>
          )}

          {analysisError && (
            <div className="mt-3 p-2 bg-red-900/30 border border-red-700 rounded-lg flex items-start gap-2">
              <AlertTriangle className="text-red-500 flex-shrink-0 w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm text-red-300">{analysisError}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="text-xs text-orange-400 hover:text-orange-300 underline"
                    onClick={() => analyzeQuizWithGroq(answers)}
                    disabled={isAnalyzing}
                  >
                    Riprova
                  </button>
                  <button className="text-xs text-orange-400 hover:text-orange-300 underline" onClick={skipAnalysis}>
                    Salta analisi
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={step === 0}
              className={`px-4 py-2 rounded-lg ${
                step === 0
                  ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              Indietro
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed || isAnalyzing}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                canProceed && !isAnalyzing
                  ? "bg-orange-700 text-white hover:bg-orange-600"
                  : "bg-neutral-700 text-neutral-500 cursor-not-allowed"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Groq AI sta analizzando...
                </>
              ) : step < questions.length - 1 ? (
                "Avanti"
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analizza con AI
                </>
              )}
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
