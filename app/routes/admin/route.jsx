import { Form, json } from "@remix-run/react"
import { AuthenticityTokenInput } from "remix-utils/csrf/react"
import { csrf } from "../../lib/form_security/csrf.server"
import { getSupabaseWithHeaders } from "../../lib/supabase.server"
import AdminForm from "../../components/forms/adminForm"

export const meta = () => {
   return [{ title: "Joao Dantas - Web Developer Portfolio" }, { name: "description", content: "Welcome to the portfolio of Joao Dantas, showcasing web development projects and skills." }]
}

export default function Admin() {
   return (
      <>
         <div className="text-white">
            <h1 className="">Admin Area</h1>
            <AdminForm />
         </div>
      </>
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

   return json({}, { headers })
}
//!SECTION
