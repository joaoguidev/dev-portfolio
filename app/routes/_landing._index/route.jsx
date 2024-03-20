import { json } from "@remix-run/react"
import { createSupabaseServerSideOnly, getSupabaseWithHeaders } from "../../lib/supabase.server"
import Hero from "./hero"
import Introduction from "./introduction"
import Work from "./work"

export const meta = () => {
   return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Landing() {
   return (
      <div>
         <Hero textHeading={"Hello, my name is João Dantas"} textSubHeading={""} />
         <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-y-32 px-6 py-10 sm:px-16 sm:py-16">
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
