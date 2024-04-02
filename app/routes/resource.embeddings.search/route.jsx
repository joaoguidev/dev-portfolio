import { json } from "@remix-run/react"
import { oneLine, stripIndent } from "common-tags"
import OpenAI from "openai"
import { sanitizeString } from "../../lib/input_security/sanitizer.server"
import { createSupabaseServerSideOnly } from "../../lib/supabase.server"

export const action = async ({ request, context }) => {
   const url = new URL(request.url)
   const API_SEARCH_EMBADDING_ROUTE_SECRET = url.searchParams.get("API_SEARCH_EMBADDING_ROUTE_SECRET") || ""
   if (API_SEARCH_EMBADDING_ROUTE_SECRET !== context.cloudflare.env.API_SEARCH_EMBADDING_ROUTE_SECRET) {
      return new Response("Unauthorized", { status: 401 })
   }
   //ANCHOR - Supabase client to be used server-side only with specially minted jwt token. This makes it possible to not use the DB secret key.
   const { supabaseServerSideOnly } = await createSupabaseServerSideOnly({ context })
   const { data } = await request.json()
   if (!data?.question) {
      throw new Error("Something went wrong! Missing question.")
   }
   //ANCHOR - Create openAi instance
   const openai = new OpenAI({
      apiKey: context.cloudflare.env.OPENAI_KEY,
   })
   //ANCHOR - Sanitize user input
   const question = await sanitizeString(data?.question.replaceAll("\n", " "))
   try {
      const embeddingData = await openai.embeddings.create({
         model: "text-embedding-3-small",
         input: question,
         encoding_format: "float",
      })
      const embedding = embeddingData.data[0].embedding

      //ANCHOR - Query Supabase to git the vector similarity using pgVector
      const documents = await matchDocuments({ embedding, supabaseServerSideOnly })

      let tokenCount = 0
      let contextText = ""
      //ANCHOR - Go over ALL similarities returned and cap max tokens and concat it to form the Context sections of the 'messages'
      for (let i = 0; i < documents.length; i++) {
         const document = documents[i]
         const content = document.content
         tokenCount += document.token

         if (tokenCount > 1200) {
            break
         }
         contextText += `${content.trim()}\n--\n`
      }
      if (contextText) {
         try {
            const message = stripIndent`
            Context sections:
            ${contextText}
            Question: """
            ${question}
            """
          `
            //ANCHOR - Use the completion API wuith the question context
            const completionResponse = await openai.chat.completions.create({
               messages: [
                  {
                     role: "system",
                     content: `You are a very enthusiastic assistant who answers questions about the web developer Joao Dantas. Given the following information about Joao Dantas' professional resume and curiosities, answer the question using only that information, outputted in markdown format. If you are unsure and the answer is not explicitly written in the documentation, say "Sorry, I don't know how to help with that."`,
                  },
                  { role: "user", content: message },
               ],
               model: "gpt-3.5-turbo",
               max_tokens: 1024,
               temperature: 0,
            })
            //ANCHOR - Extract the answer
            const answer = completionResponse.choices[0].message.content
            // Save question and answer made in DB
            const { error } = await supabaseServerSideOnly.from('user_questions').insert({ question: question, answer: answer, documents: documents })
            if (error) {
               console.log(error)
               throw new Error("Something went wrong inserting answer! ")
            }
            return json({ success: true, aiData: { question: question, aiAnswer: answer } })
         } catch (error) {
            console.log(error)
            throw new Error("Something went wrong getting answer! ")
         }
      } else {
         return json({ success: true, aiData: { question: question, aiAnswer: "I don't have data on that. What else can I assist you with?" } })
      }
   } catch (error) {
      console.log(error)
      throw new Error("Something went wrong while embedding!")
   }
}

/**
 * Match documents based on embedding similarity.
 * @param {Object} options - The options object.
 * @param {Array} options.embedding - The vector format representing the query embedding.
 * @param {Object} options.supabaseServerSideOnly - Supabase server-side client instance.
 * @returns {Promise} - A promise that resolves with an array of matched documents.
 */
async function matchDocuments({ embedding, supabaseServerSideOnly }) {
   try {
      const { data, error } = await supabaseServerSideOnly.rpc("match_documents", {
         query_embedding: embedding, // Vector format
         match_threshold: 0.3, // Only similarity higher than that will be returned from db
         match_count: 10, // Max number of matches
      })
      console.log(JSON.stringify(data))
      return data
   } catch (error) {
      console.log(error)
      throw new Error("Something went wrong while matching vectors!")
   }
}
