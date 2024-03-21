/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { RemixServer } from "@remix-run/react"
import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"
// import { randomBytes } from "crypto"
import { NonceContext } from "./lib/nonce-context"

export default async function handleRequest(
   request,
   responseStatusCode,
   responseHeaders,
   remixContext
   // This is ignored so we can keep it in the template for visibility.  Feel
   // free to delete this parameter in your app if you're not using it!
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   // loadContext
) {
   // const cspNonce = randomBytes(50).toString("base64")
   const body = await renderToReadableStream(
      <NonceContext.Provider value={'cspNonce'}>
         <RemixServer context={remixContext} url={request.url} />
      </NonceContext.Provider>,
      {
         signal: request.signal,
         onError(error) {
            // Log streaming rendering errors from inside the shell
            console.error(error)
            responseStatusCode = 500
         },
      }
   )

   if (isbot(request.headers.get("user-agent") || "")) {
      await body.allReady
   }
   // responseHeaders.set(
   //    "Content-Security-Policy",
   //    `script-src 'nonce-${cspNonce}' 'strict-dynamic'; frame-ancestors 'none'; object-src 'none'; base-uri 'none'; connect-src https://rfbsybuqfhnjnahxotul.supabase.co https://podbaydor.com; form-action 'self'; style-src 'self' 'https://' 'nonce-${cspNonce}'; upgrade-insecure-requests; default-src 'none'; font-src 'self'; style-src-attr 'self'; img-src 'self';`
   // )
   // responseHeaders.set("Content-Type", "text/html; charset=UTF-8")
   // responseHeaders.set("Pragma", "no-cache")
   // responseHeaders.set("X-Frame-Options", "DENY")
   // responseHeaders.set(
   //    "Strict-Transport-Security",
   //    "max-age=31536000; includeSubDomains"
   // )
   // responseHeaders.set("X-Content-Type-Options", "nosniff")
   // responseHeaders.set("X-XSS-Protection", "1; mode=block")
   // responseHeaders.set("Referrer-Policy", "no-referrer")
   // responseHeaders.set(
   //    "Feature-Policy",
   //    "geolocation 'none'; microphone 'none'; camera 'none'"
   // )
   // responseHeaders.set("Cross-Origin-Embedder-Policy", "same-origin")
   // responseHeaders.set("Cross-Origin-Resource-Policy", "same-origin")
   // responseHeaders.set("Cross-Origin-Opener-Policy", "same-origin")
   // responseHeaders.set("X-Download-Options", "noopen")
   // responseHeaders.set("X-Permitted-Cross-Domain-Policies", "none")
   // responseHeaders.set("Access-Control-Allow-Origin", "*")

   return new Response(body, {
      headers: responseHeaders,
      status: responseStatusCode,
   })
}
