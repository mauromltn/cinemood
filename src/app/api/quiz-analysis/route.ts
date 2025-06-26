import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: Request) {
   try {
      const { mood, activity, preference } = await request.json()

      if (!mood || !activity || !preference) {
         return NextResponse.json({ error: "Tutte le risposte del quiz sono obbligatorie" }, { status: 400 })
      }

      // Verifica che la chiave API sia presente
      if (!process.env.GROQ_API_KEY) {
         console.error("GROQ_API_KEY non è configurata")
         return NextResponse.json(
            { error: "Configurazione del server incompleta", details: "API key mancante" },
            { status: 500 },
         )
      }

      console.log("Analisi quiz con Groq - Mood:", mood, "Activity:", activity, "Preference:", preference)

      try {
         // Chiamata all'AI SDK con Groq per analizzare le risposte del quiz
         const { text: result } = await generateText({
            model: groq("llama-3.3-70b-versatile"),
            system: `Sei un esperto psicologo e consulente cinematografico. Analizza attentamente le risposte del quiz considerando gli stati emotivi sottostanti e le necessità psicologiche dell'utente.

   GENERI DISPONIBILI (usa solo questi ID):
   - 28: Azione
   - 12: Avventura  
   - 16: Animazione
   - 35: Commedia
   - 80: Crime
   - 99: Documentario
   - 18: Drammatico
   - 10751: Famiglia
   - 14: Fantasy
   - 36: Storico
   - 27: Horror
   - 10402: Musica
   - 9648: Mistero
   - 10749: Romantico
   - 878: Fantascienza
   - 10770: Film TV
   - 53: Thriller
   - 10752: Guerra
   - 37: Western

   Rispondi SOLO con un JSON nel seguente formato:
   {
     "genres": [lista di 3-6 ID numerici dei generi più appropriati],
     "reasoning": "breve spiegazione della scelta (max 100 caratteri)"
   }

   ANALISI PSICOLOGICA AVANZATA:
- "Male" potrebbe voler elaborare emozioni
- "Così così" suggerisce un mix di emozioni
- "Bene" indica un buon umore, cerca qualcosa di coinvolgente
- "Fantastica" suggerisce energia alta
- "Piangere" corrisponde a un bisogno di introspezione
- "Ridere" corrisponde a un bisogno di leggerezza
- "Emozionarti" richiama intensità e sentimenti forti
- "Distrarti" suggerisce evasione e dinamismo`,
            prompt: `Analizza queste risposte del quiz:
- Umore: "${mood}"
- Voglia di: "${activity}"  
- Preferenza: "${preference}"

Restituisci i generi più appropriati in formato JSON.`,
            maxTokens: 200,
            temperature: 0.3,
         })

         console.log("Risposta grezza da Groq:", result)

         // Prova a parsare la risposta JSON
         let parsedResult
         try {
            // Estrai solo la parte JSON se c'è altro testo
            const jsonMatch = result.match(/\{[\s\S]*\}/)
            const jsonString = jsonMatch ? jsonMatch[0] : result
            parsedResult = JSON.parse(jsonString)
         } catch (parseError) {
            console.error("Errore nel parsing JSON:", parseError)
            // Fallback con generi predefiniti
            parsedResult = {
               genres: [35, 18, 28, 12], // Commedia, Drammatico, Azione, Avventura
               reasoning: "Analisi fallback - mix bilanciato di generi popolari",
            }
         }

         // Verifica che la risposta abbia la struttura corretta
         if (!parsedResult.genres || !Array.isArray(parsedResult.genres)) {
            throw new Error("Formato di risposta non valido da Groq")
         }

         // Filtra solo generi validi (numeri)
         const validGenres = parsedResult.genres.filter((id: any) => typeof id === "number" && id > 0)

         if (validGenres.length === 0) {
            throw new Error("Nessun genere valido nella risposta")
         }

         console.log("Generi analizzati da Groq:", validGenres)

         return NextResponse.json({
            genres: validGenres,
            reasoning: parsedResult.reasoning || "Raccomandazioni personalizzate basate sulle tue risposte",
            mood,
            activity,
            preference,
         })
      } catch (error) {
         console.error("Errore durante la chiamata a Groq:", error)

         // Fallback con logica semplificata
         const fallbackGenres = getFallbackGenres(mood, activity)

         return NextResponse.json({
            genres: fallbackGenres,
            reasoning: "Raccomandazioni basate su logica predefinita",
            mood,
            activity,
            preference,
            note: "Servizio AI temporaneamente non disponibile",
         })
      }
   } catch (error) {
      console.error("Errore durante l'analisi del quiz:", error)
      return NextResponse.json(
         { error: "Si è verificato un errore durante l'analisi", details: (error as Error).message },
         { status: 500 },
      )
   }
}

// Funzione di fallback per quando Groq non è disponibile
function getFallbackGenres(mood: string, activity: string): number[] {
   const moodGenres: Record<string, number[]> = {
      Male: [18, 35], // Drammatico, Commedia
      "Così così": [35, 12], // Commedia, Avventura
      Bene: [28, 12], // Azione, Avventura
      Fantastica: [28, 878], // Azione, Fantascienza
   }

   const activityGenres: Record<string, number[]> = {
      Ridere: [35, 16], // Commedia, Animazione
      Riflettere: [18, 99], // Drammatico, Documentario
      Emozionarti: [10749, 18], // Romantico, Drammatico
      Distrarti: [28, 878], // Azione, Fantascienza
   }

   const genres = [...(moodGenres[mood] || []), ...(activityGenres[activity] || [])]

   // Rimuovi duplicati e aggiungi generi popolari se necessario
   const uniqueGenres = [...new Set(genres)]
   if (uniqueGenres.length < 3) {
      uniqueGenres.push(12, 14) // Avventura, Fantasy
   }

   return uniqueGenres.slice(0, 6)
}
