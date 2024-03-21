import { Outlet, json, useOutletContext } from "@remix-run/react"
import { getSupabaseWithHeaders } from "../../lib/supabase.server"

export const meta = () => {
   return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function landingLayout() {
   const outletContext = useOutletContext()
   return (
      <>
         <main className="mx-auto size-full">
            <Outlet context={outletContext} />
         </main>
      </>
   )
}

export const shouldRevalidate = () => false
//SECTION - LOADER
export const loader = async ({ request, context }) => {
   console.log("----------LANDING/LAYOUT----------")
   const { headers, supabase } = await getSupabaseWithHeaders({ request, context })
   return json({}, { headers })
}
//!SECTION
