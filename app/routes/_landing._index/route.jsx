import { json } from "@remix-run/react"
import { createSupabaseServerSideOnly, getSupabaseWithHeaders } from "../../lib/supabase.server"
import Hero from "./hero"
import Introduction from "./introduction"
import { TimeLine } from "./time-line"

export const meta = () => {
   return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Landing() {
   return (
      <div>
         <Hero textHeading={"Hello, my name is João Dantas"} textSubHeading={"Building bridges between users and technology"} />
         <div className="mx-auto max-w-7xl px-6 py-10 sm:px-16 sm:py-16">
            <Introduction
               textHeading={"Overview."}
               textSubHeading={"Introduction"}
               textParagraph={
                  "I am a versatile full-stack web developer specializing in modern web technologies such as Tailwind CSS for styling, Remix for building web applications, and Supabase for backend services and database management. Additionally, I excel in utilizing Cloudflare Workers and Cloudflare Pages for serverless computing and static site hosting, along with expertise in setting up security measures. My proficiency extends to integrating payment gateways like Stripe and Shopify. With this diverse skill set, I can create robust, secure, and scalable web applications tailored to various needs."
               }
            />
         </div>
         <TimeLine />
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
   const { headers } = await getSupabaseWithHeaders({ request, context })
   const supabaseServerSideOnly = await createSupabaseServerSideOnly({ context })
   return json({}, { headers })
}
//!SECTION
