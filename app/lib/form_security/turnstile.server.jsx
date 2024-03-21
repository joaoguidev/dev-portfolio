export async function validateTurnstileServerSide({ context, cleanContactData }) {
   const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: `secret=${encodeURIComponent(context.cloudflare.env.CLOUDFLARE_TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(cleanContactData?.cleanData["cf-turnstile-response"])}`,
      headers: {
         "content-type": "application/x-www-form-urlencoded",
      },
   })
   const dataTurnstile = await res.json()
   return dataTurnstile.success
}
