import { redirect } from "@remix-run/cloudflare"
import { createServerClient, parse, serialize } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"
import { sanitizeString } from "../lib/input_security/sanitizer.server"

export const getSupabaseEnv = (context) => ({
   SUPABASE_URL: context.cloudflare.env.SUPABASE_URL,
   SUPABASE_ANON_KEY: context.cloudflare.env.SUPABASE_ANON_KEY,
})

// export async function supabaseAdminUseOnlyServerSide({ context }) {
//    const supabaseAdmin = await createClient(context.cloudflare.env.SUPABASE_URL, context.cloudflare.env.SUPABASE_SECRET_KEY, {
//       auth: {
//          autoRefreshToken: false,
//          // persistSession: false,
//       },
//    })
//    return supabaseAdmin
// }

export function getSupabaseWithHeaders({ request, context }) {
   const cookies = parse(request.headers.get("Cookie") ?? "")
   const headers = new Headers()

   const supabase = createServerClient(context.cloudflare.env.SUPABASE_URL, context.cloudflare.env.SUPABASE_ANON_KEY, {
      cookies: {
         get(key) {
            return cookies[key]
         },
         set(key, value, options) {
            headers.append("Set-Cookie", serialize(key, value, options))
         },
         remove(key, options) {
            headers.append("Set-Cookie", serialize(key, "", options))
         },
      },
   })
   return { supabase, headers }
}

export async function getSupabaseWithSessionAndHeaders({ request, context }) {
   const { supabase, headers } = getSupabaseWithHeaders({ request, context })

   const {
      data: { session: serverSession },
   } = await supabase.auth.getSession()

   const {
      data: { user },
   } = await supabase.auth.getUser()
   return { serverSession, headers, supabase, user }
}

/**
 * Protect routes that only authenticated users can have access
 *
 * @param {Object} request - The incoming request object.
 * @param {Object} context - Cloudflare context containing env vars
 * @param {string} redirectTo - Where to redirect if user is not authenticated
 * @throws {redirect} - Throws a redirect to the parameter 'redirectTo' if the user is not authenticated.
 * @returns {Object} Returns serverSession, headers, supabase, user.
 */
// export async function protectRoute({ request, context, allowedRole }, redirectTo) {
//    const { supabase, headers, serverSession } = await getSupabaseWithSessionAndHeaders({
//       request,
//       context,
//    })
//    const {
//       data: { user },
//    } = await supabase.auth.getUser()
//    if (!serverSession || !user || user.role !== "manager_bem_indica") {
//       throw redirect(redirectTo, { headers })
//    }

//    return { serverSession, headers, supabase, user }
// }

export async function createSupabaseServerSideOnly({ context }) {
   const options = {
      global: {
         headers: { Authorization: "Bearer " + context.cloudflare.env.SUPABASE_SERVER_SIDE_ONLY_KEY },
      },
   }
   const supabaseServerSideOnly = await createClient(context.cloudflare.env.SUPABASE_URL, context.cloudflare.env.SUPABASE_ANON_KEY, options)

   return { supabaseServerSideOnly }
}

