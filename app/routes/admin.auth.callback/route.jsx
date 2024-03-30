import { redirect } from "@remix-run/node"
import { getSupabaseWithHeaders } from "../../lib/supabase.server"

export async function loader({ request, context }) {
   const requestUrl = new URL(request.url)
   const code = requestUrl.searchParams.get("code")
   const next = requestUrl.searchParams.get("next") || "/"
   console.log('requestUrl requestUrl requestUrl', requestUrl);
   if (code) {
      const { headers, supabase } = getSupabaseWithHeaders({ request, context })

      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (!error) {
         return redirect(next, { headers })
      }
   }

   // return the user to an error page with instructions
   return redirect("/admin/auth/fail")
}
