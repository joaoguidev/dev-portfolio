import { createClient } from "@supabase/supabase-js"
import OpenAI from "openai"
import { sanitizeString } from "../../lib/input_security/sanitizer.server"
import { createSupabaseServerSideOnly } from "../../lib/supabase.server"

export const action = async ({ request, context }) => {
   const url = new URL(request.url)
   const API_GENERETE_EMBADDING_ROUTE_SECRET = url.searchParams.get("API_GENERETE_EMBADDING_ROUTE_SECRET") || ""
   if (API_GENERETE_EMBADDING_ROUTE_SECRET !== context.cloudflare.env.API_GENERETE_EMBADDING_ROUTE_SECRET) {
      return new Response("Unauthorized", { status: 401 })
   }
   
   const { supabaseServerSideOnly } = await createSupabaseServerSideOnly({ context })
   const { data } = await request.json()
   if (!data?.question) {
      throw new Error("Failed to create embedding for question. Empty field")
   }
   const openai = new OpenAI({
      apiKey: context.cloudflare.env.OPENAI_KEY,
   })

   try {
      const result = await openai.embeddings.create({
         model: "text-embedding-3-small",
         input: await sanitizeString(data?.question.replaceAll("\n", " ")),
         encoding_format: "float"
      })
      const content = await sanitizeString(data?.question)
      const embedding = result.data[0].embedding
      const token = result.usage.total_tokens
      const { error } = await supabaseServerSideOnly.from("documents").insert({
         content,
         embedding,
         token,
      });
      if (error) {
         console.log(error);
         throw new Error("Failed to saving embedding for question.")
      }
   } catch (error) {
      throw new Error("Failed to create embedding for question.")
   }

   return {}
}
