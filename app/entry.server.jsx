/**
 ** The headers implemented in the system adhere to the strict guidelines outlined in the OWASP (Open Web Application Security Project) HTTP Headers Cheat Sheet, which can be found at https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html. And also CSP(Content Security Policy) :https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
 */

import { RemixServer } from "@remix-run/react"
import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"
import { NonceContext } from "./lib/nonce-context"

export default async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
   const cspNonce = crypto.randomUUID()
   const body = await renderToReadableStream(
      <NonceContext.Provider value={cspNonce}>
         <RemixServer context={remixContext} url={request.url} />
      </NonceContext.Provider>,
      {
         signal: request.signal,
         onError(error) {
            // Log streaming rendering errors from inside the shell
            console.error(error)
            responseStatusCode = 500
         },
      },
   )

   if (isbot(request.headers.get("user-agent") || "")) {
      await body.allReady
   }

   //TODO - Figure out how to add a nonce to tailwind.css so I can add style-src and default-src 'none';
   responseHeaders.set(
      "Content-Security-Policy",
      `script-src 'nonce-${cspNonce}' 'strict-dynamic'; base-uri 'none'; frame-ancestors 'none'; object-src 'self'; connect-src 'self' ${loadContext.cloudflare.env.SUPABASE_URL} ${loadContext.cloudflare.env.DEVELOPMENT_TUNNEL}; form-action 'self'; upgrade-insecure-requests; img-src 'self' data: ; font-src fonts.gstatic.com; `,
   )
   // responseHeaders.set(
   //    "Content-Security-Policy",
   //    `script-src 'nonce-${cspNonce}' 'strict-dynamic'; frame-ancestors 'none'; object-src 'none'; base-uri 'none'; connect-src ${loadContext.cloudflare.env.SUPABASE_URL} ${loadContext.cloudflare.env.DEVELOPMENT_TUNNEL}; form-action 'self'; style-src 'self' 'nonce-${cspNonce}'; upgrade-insecure-requests; default-src 'none'; font-src 'self'; style-src-attr 'self' ${loadContext.cloudflare.env.DEVELOPMENT_TUNNEL}; img-src 'self';`,
   // )
   // Set the Content-Type header to specify that the response is HTML encoded in UTF-8.
   responseHeaders.set("Content-Type", "text/html; charset=UTF-8")

   // Set the X-Frame-Options header to DENY to prevent the browser from rendering the page in a frame or iframe.
   responseHeaders.set("X-Frame-Options", "DENY")

   // Set the Strict-Transport-Security header to enforce the use of HTTPS for the specified max-age (in seconds) and includeSubDomains.
   responseHeaders.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains;")

   // Set the X-Content-Type-Options header to nosniff to prevent the browser from MIME-sniffing a response away from the declared content type.
   responseHeaders.set("X-Content-Type-Options", "nosniff")

   // Set the X-XSS-Protection header to enable XSS (cross-site scripting) protection in the browser with a mode of blocking.
   responseHeaders.set("X-XSS-Protection", "1; mode=block")

   // Set the Referrer-Policy header to control how much referrer information should be included with requests.
   responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin")

   // Set the Feature-Policy header to restrict the usage of certain features to mitigate security risks.
   responseHeaders.set("Feature-Policy", "geolocation 'none'; microphone 'none'; camera 'none' ")

   // Set the Cross-Origin-Embedder-Policy header to restrict how the document may be embedded on other origins.
   responseHeaders.set("Cross-Origin-Embedder-Policy", "require-corp")

   // Set the Cross-Origin-Resource-Policy header to restrict the cross-origin resources.
   responseHeaders.set("Cross-Origin-Resource-Policy", "same-origin")

   // Set the Cross-Origin-Opener-Policy header to control how documents may be opened in a browsing context.
   responseHeaders.set("Cross-Origin-Opener-Policy", "same-origin")

   // Set the X-Download-Options header to prevent browsers from automatically opening certain files after downloading.
   responseHeaders.set("X-Download-Options", "noopen")

   // Set the X-Permitted-Cross-Domain-Policies header to restrict Adobe Flash Player's access to data across domains.
   responseHeaders.set("X-Permitted-Cross-Domain-Policies", "none")

   // responseHeaders.set("Access-Control-Allow-Origin", "*")

   return new Response(body, {
      headers: responseHeaders,
      status: responseStatusCode,
   })
}
