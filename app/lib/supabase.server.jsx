import { createServerClient, parse, serialize } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"


/**
 * Exposes Supabase environment variables allowed to client-side.
 * 
 * @param {Object} context - The context object containing environment variables.
 * @param {Object} context.cloudflare - Cloudflare environment variables.
 * @param {string} context.cloudflare.env.SUPABASE_URL - The URL of the Supabase instance.
 * @param {string} context.cloudflare.env.SUPABASE_ANON_KEY - The anonymous key for the Supabase instance.
 * @returns {Object} - An object containing Supabase environment variables allowed for client-side use.
 */
export const getSupabaseEnv = (context) => ({
   SUPABASE_URL: context.cloudflare.env.SUPABASE_URL,
   SUPABASE_ANON_KEY: context.cloudflare.env.SUPABASE_ANON_KEY,
})

/**
 * Creates a Supabase client using server-side rendering (SSR) method without helpers.
 * 
 * @param {Object} params - Parameters object.
 * @param {Object} params.request - The incoming request object.
 * @param {Object} params.context - The context object containing environment variables.
 * @param {Object} params.context.cloudflare - Cloudflare environment variables.
 * @param {string} params.context.cloudflare.env.SUPABASE_URL - The URL of the Supabase instance.
 * @param {string} params.context.cloudflare.env.SUPABASE_ANON_KEY - The anonymous key for the Supabase instance.
 * @returns {Object} - An object containing the Supabase client instance and headers for SSR.
 */
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

/**
 * Retrieves Supabase client with session and headers for server-side rendering (SSR).
 * 
 * @param {Object} params - Parameters object.
 * @param {Object} params.request - The incoming request object.
 * @param {Object} params.context - The context object containing environment variables.
 * @param {Object} params.context.cloudflare - Cloudflare environment variables.
 * @param {string} params.context.cloudflare.env.SUPABASE_URL - The URL of the Supabase instance.
 * @param {string} params.context.cloudflare.env.SUPABASE_ANON_KEY - The anonymous key for the Supabase instance.
 * @returns {Object} - An object containing Supabase client with session, headers, and user information.
 */
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
 * Creates a Supabase client to be used only server-side.
 * 
 * @param {Object} params - Parameters object.
 * @param {Object} params.context - The context object containing environment variables.
 * @param {Object} params.context.cloudflare - Cloudflare environment variables.
 * @param {string} params.context.cloudflare.env.SUPABASE_URL - The URL of the Supabase instance.
 * @param {string} params.context.cloudflare.env.SUPABASE_ANON_KEY - The anonymous key for the Supabase instance.
 * @param {string} params.context.cloudflare.env.SUPABASE_SERVER_SIDE_ONLY_KEY - The server-side only key for the Supabase instance.
 * @returns {Object} - An object containing the Supabase client instance configured for server-side use.
 * @throws {Error} - Throws an error if something goes wrong during Supabase client creation.
 */
export async function createSupabaseServerSideOnly({ context }) {
   const options = {
      global: {
         headers: { Authorization: "Bearer " + context.cloudflare.env.SUPABASE_SERVER_SIDE_ONLY_KEY },
      },
   }
   const supabaseServerSideOnly = await createClient(context.cloudflare.env.SUPABASE_URL, context.cloudflare.env.SUPABASE_ANON_KEY, options)

   return { supabaseServerSideOnly }
}

