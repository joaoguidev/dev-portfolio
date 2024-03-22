import { json } from "@remix-run/react"
import StarsCanvas from "../../components/canvas/Stars"
import { sendTransactionalEmail } from "../../lib/email.server"
import { csrf } from "../../lib/form_security/csrf.server"
import { validateTurnstileServerSide } from "../../lib/form_security/turnstile.server"
import { sanitizeString } from "../../lib/input_security/sanitizer.server"
import { validateSchema } from "../../lib/input_security/validation.server"
import { getSupabaseWithHeaders } from "../../lib/supabase.server"
import Contact from "./Contactt"
import Hero from "./Hero"
import Introduction from "./Introductionn"
import Work from "./Workk"
import { getSchemaContact } from "./schemas"

export const meta = () => {
   return [{ title: "Joao Dantas - Web Developer Portfolio" }, { name: "description", content: "Welcome to the portfolio of Joao Dantas, showcasing web development projects and skills." }]
}

export default function Landing() {
   return (
      <div className="dark:bg-inherit">
         <Hero className="dark:bg-inherit" />
         <div className="relative w-full bg-grid-small-white/25">
            <div className="absolute left-0 top-0 z-0 h-24  w-full bg-gradient-to-b from-black via-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 z-0 h-24  w-full bg-gradient-to-t from-black via-black to-transparent"></div>
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-y-32 px-6 py-10 dark:bg-inherit sm:px-16 sm:py-16">
               <Introduction />
               <Work />
            </div>
         </div>
         <div className="relative flex size-full">
            <StarsCanvas />
            <Contact />
         </div>
      </div>
   )
}

//SECTION - LOADER
export const loader = async ({ request, context }) => {
   const { headers } = await getSupabaseWithHeaders({ request, context })
   return json({}, { headers })
}
//!SECTION

//SECTION - ACTION
export const action = async ({ request, context }) => {
   //Validade CSRF
   try {
      await csrf.validate(request)
   } catch (error) {
      throw new Response("Invalid CSRF", { status: 403 })
   }
   //Get the header from Supabase to be used on response
   const { headers } = await getSupabaseWithHeaders({ request, context })
   //Parsing the incoming request body
   const formData = await request.formData()
   const dirtyData = await Object.fromEntries(formData)

   switch (dirtyData.intent) {
      // ANCHOR - Case: contact form sent
      case "contact": {
         //Get the schema to be validated
         const schemaContact = await getSchemaContact()
         //Schema Validation
         const cleanContactData = await validateSchema(schemaContact, dirtyData)
         //Validation successful
         if (cleanContactData.success) {
            //Validate turnstile token on server-side to protect agains bots. Case invalid iit returns null
            if (!(await validateTurnstileServerSide({ context, cleanContactData }))) {
               //Turnstile validation failed
               return json({ success: false, errors: { turnstile: "Invalid form validation" } }, { headers })
            }
            //Sending the email to me and the user with validated and sanitized input
            const emailStatus = await sendTransactionalEmail(context, await sanitizeString(cleanContactData.cleanData.name), await sanitizeString(cleanContactData.cleanData.email), await sanitizeString(cleanContactData.cleanData.message))
            //If not success it returns a messageId
            if (emailStatus?.messageId) {
               //ALL success
               return json({ success: true }, { headers })
            } else {
               //Sending the email falied due to not having returns a messageId
               return json({ success: false, errors: { emailSender: "Apologies! Please try again in 10 minutes. My email sender is experiencing higher than usual load." } }, { headers })
            }
         }
         //Schema validation failed
         return json({ success: false, errors: cleanContactData?.errors }, { headers })
      }
   }
   return json({}, { headers })
}
//!SECTION
