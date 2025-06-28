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

   GENERI DISPONIBILI PER FILM (usa solo questi ID):
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

   GENERI DISPONIBILI PER SERIE TV (usa solo questi ID):
   - 10759: Azione e Avventura
   - 16: Animazione
   - 35: Commedia
   - 80: Crime
   - 99: Documentario
   - 18: Drammatico
   - 10751: Famiglia
   - 10762: Kids
   - 9648: Mistero
   - 10763: News
   - 10764: Reality
   - 10765: Sci-Fi & Fantasy
   - 10766: Soap
   - 10767: Talk
   - 10768: Guerra e Politica
   - 37: Western

   NOTA: Alcuni generi hanno lo stesso ID per film e serie TV (16, 35, 80, 99, 18, 10751, 9648, 37).
   Puoi utilizzare questi generi comuni quando appropriato per entrambi i tipi di contenuto.

   Rispondi SOLO con un JSON nel seguente formato:
   {
     "genres": [lista di 3-6 ID numerici dei generi più appropriati],
     "reasoning": "breve spiegazione della scelta (max 100 caratteri)",
     "mediaTypes": ["movie", "tv"] // indica se i generi sono più adatti per film, serie TV o entrambi
   }

   ANALISI PSICOLOGICA AVANZATA:
   - "Male" potrebbe voler elaborare emozioni
   - "Così così" suggerisce un mix di emozioni
   - "Bene" indica un buon umore, cerca qualcosa di coinvolgente
   - "Fantastica" suggerisce energia alta
   - "Piangere" corrisponde a un bisogno di introspezione
   - "Ridere" corrisponde a un bisogno di leggerezza
   - "Emozionarti" richiama intensità e sentimenti forti
   - "Distrarti" suggerisce evasione e dinamismo

   CONSIDERAZIONI PER TIPO DI CONTENUTO:
   - Serie TV sono ideali per immersione prolungata e sviluppo dei personaggi
   - Film sono perfetti per esperienze concentrate e complete`,
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
               mediaTypes: ["movie", "tv"]
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

         // Gestisce mediaTypes, default a entrambi se non specificato
         const mediaTypes = parsedResult.mediaTypes && Array.isArray(parsedResult.mediaTypes)
            ? parsedResult.mediaTypes
            : ["movie", "tv"]

         console.log("Generi analizzati da Groq:", validGenres)
         console.log("Tipi di media suggeriti:", mediaTypes)

         return NextResponse.json({
            genres: validGenres,
            reasoning: parsedResult.reasoning || "Raccomandazioni personalizzate basate sulle tue risposte",
            mediaTypes,
            mood,
            activity,
            preference,
         })
      } catch (error) {
         console.error("Errore durante la chiamata a Groq:", error)
      }
   } catch (error) {
      console.error("Errore durante l'analisi del quiz:", error)
      return NextResponse.json(
         { error: "Si è verificato un errore durante l'analisi", details: (error as Error).message },
         { status: 500 },
      )
   }
}
