import { useRevalidator } from "@remix-run/react"
import { createBrowserClient } from "@supabase/ssr"
import { useEffect, useState } from "react"

export const useSupabase = ({ env, serverSession }) => {
   const [supabase] = useState(() => createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))
   const serverAccessToken = serverSession?.access_token
   const revalidator = useRevalidator()

   useEffect(() => {
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
         if (session?.access_token !== serverAccessToken) {
            // Revalidate the app.
            revalidator.revalidate()
         }
      })

      return () => {
         subscription.unsubscribe()
      }
   }, [supabase.auth, serverAccessToken, revalidator])

   return { supabase }
}
