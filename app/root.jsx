import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, json, useLoaderData, useRouteError } from "@remix-run/react"
import { captureRemixErrorBoundaryError, withSentry } from "@sentry/remix"
import { useContext } from "react"
import { AuthenticityTokenProvider } from "remix-utils/csrf/react"
import { csrf } from "./lib/form_security/csrf.server"
import { NonceContext } from "./lib/nonce-context"
import { useSupabase } from "./lib/supabase-browser"
import { getSupabaseEnv, getSupabaseWithSessionAndHeaders } from "./lib/supabase.server"
import styles from "./tailwind.css?url"

export const links = () => [{ rel: "stylesheet", href: styles }]

export function Layout({ children }) {
   const nonce = useContext(NonceContext)
   return (
      <html className="dark size-full" lang="en">
         <head>
            <meta charSet="utf-8 " />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta nonce={nonce} />
            <Links nonce={nonce} />
         </head>
         <body className="m-0 size-full overflow-x-hidden bg-white p-0 dark:bg-black">
            {children}
            <ScrollRestoration nonce={nonce} />
            <Scripts nonce={nonce} />
         </body>
      </html>
   )
}

function App() {
   const { env, serverSession, domainUrl, token } = useLoaderData()
   const { supabase } = useSupabase({ env, serverSession })
   return (
      <AuthenticityTokenProvider token={token || ""}>
         <Outlet context={{ supabase, domainUrl, env }} />
      </AuthenticityTokenProvider>
   )
}
export default withSentry(App)

//SECTION LOADER
export const loader = async ({ request, context }) => {
   console.log("---------- ROOT LOADER ----------")
   //Origin of CSRF token and the cookie that is going to carry it
   let [token, cookieHeader] = await csrf.commitToken()
   const { serverSession, headers } = await getSupabaseWithSessionAndHeaders({
      request,
      context,
   })
   //Sending selected envs to client-side
   const domainUrl = context.cloudflare.env.DOMAIN_URL
   const env = getSupabaseEnv(context)
   env.PATH_MACBOOK_SCREEN_IMAGE = context.cloudflare.env.PATH_MACBOOK_SCREEN_IMAGE
   env.GOOGLE_MAPS_API_KEY = context.cloudflare.env.GOOGLE_MAPS_API_KEY
   env.CLOUDFLARE_TURNSTILE_SITE_KEY = context.cloudflare.env.CLOUDFLARE_TURNSTILE_SITE_KEY
   env.CLOUDFLARE_TURNSTILE_HIDDEN_SITE_KEY = context.cloudflare.env.CLOUDFLARE_TURNSTILE_HIDDEN_SITE_KEY
   return json({ serverSession, env, domainUrl, token }, ...headers, {
      headers: { "set-cookie": cookieHeader },
   })
}
//!SECTION

//SECTION - SENTRY - To capture errors from ErrorBoundary defined by myself
export const ErrorBoundary = () => {
   const error = useRouteError()

   captureRemixErrorBoundaryError(error)

   if (error instanceof Error) {
      return <div className="text-white">An unexpected error occurred: {error.message}</div>
   }

   if (!isRouteErrorResponse(error)) {
      return <h1 className="text-white">Unknown Error</h1>
   }

   return <div className="text-white">An unexpected error occurred: {error.statusText}</div>
}
//!SECTION


