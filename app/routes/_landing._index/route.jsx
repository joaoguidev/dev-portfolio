import { json, useActionData, useLoaderData } from "@remix-run/react"
import { csrf } from "../../lib/form_security/csrf.server"
import { createSupabaseServerSideOnly, getSupabaseWithHeaders } from "../../lib/supabase.server"
import Contact from "./contact"
import Hero from "./hero"
import Introduction from "./introduction"
import { getSchemaContact } from "./schemas"
import Work from "./work"

import { validateSchema } from "../../lib/input_security/validation.server"
import { validateTurnstileServerSide } from "../../lib/form_security/turnstile.server"

export const meta = () => {
   return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Landing() {
   return (
      <div className="dark:bg-inherit">
         <Hero className="dark:bg-inherit" textHeading={"Hello, my name is João Dantas"} textSubHeading={""} />
         <div className="relative w-full bg-grid-small-white/25">
            <div className="bg- absolute left-0 top-0 h-24  w-full bg-gradient-to-b from-black via-black to-transparent"></div>
            <div className="bg- absolute bottom-0 left-0 h-24  w-full bg-gradient-to-t from-black via-black to-transparent"></div>
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-y-32 px-6 py-10 dark:bg-inherit sm:px-16 sm:py-16">
               <Introduction
                  textHeading={"Overview."}
                  textSubHeading={"Introduction"}
                  textParagraph={
                     "I am a versatile full-stack web developer specializing in modern web technologies such as Tailwind CSS for styling, Remix for building web applications, and Supabase for backend services and database management. Additionally, I excel in utilizing Cloudflare Workers and Cloudflare Pages for serverless computing and static site hosting, along with expertise in setting up security measures. My proficiency extends to integrating payment gateways like Stripe and Shopify. With this diverse skill set, I can create robust, secure, and scalable web applications tailored to various needs."
                  }
                  textHeadingCard={"Joao Dantas"}
                  textParagraphCard={
                     "Transitioning from a career as a financial analyst, I embarked on a new chapter in computer studies, leaving behind the bustling finance world for the innovative realm of technology. Hailing from Brazil, I chose Langara as my gateway to this exciting field, where I eagerly absorbed new knowledge and honed my skills. Through dedication and perseverance, I transformed into a proficient computer studies professional, equipped to thrive in the ever-evolving landscape of technology."
                  }
               />
               <Work />
            </div>
         </div>
         <div className="size-full flex">

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

//SECTION - ACtION
export const action = async ({ request, context }) => {
   //Validade CSRF
   try {
      await csrf.validate(request)
   } catch (error) {
      throw new Response("Invalid CSRF", { status: 403 })
   }
   const { headers } = await getSupabaseWithHeaders({ request, context })
   const supabaseServerSideOnly = await createSupabaseServerSideOnly({ context })
   //Parse the incoming request body
   const formData = await request.formData()
   const dirtyData = await Object.fromEntries(formData)
   console.log(dirtyData)
   switch (dirtyData.intent) {
      // ANCHOR - Sign Up Case
      case "contact": {
         //Get Sign up Schema
         const schemaContact = await getSchemaContact()
         //Schema Validation
         const cleanContactData = await validateSchema(schemaContact, dirtyData)
         
         if (cleanContactData.success) {
            if(await validateTurnstileServerSide({context,cleanContactData })){
               return json({ success: true }, { headers })
            } else {
               return json({ success: false, errors: { turnstile: 'Invalid form validation' } }, { headers })
            }
         } else {
            return json({ success: false, errors: cleanContactData?.errors }, { headers })
         }
      }
   }
   return json({}, { headers })
}
//!SECTION
