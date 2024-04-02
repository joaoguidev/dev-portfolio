/**
 * Validate a Turnstile token on the server side.
 * @param {Object} options - The options object.
 * @param {string} options.turnstileSecretKey - The secret key for Turnstile verification.
 * @param {string} options.turnstileGeneratedToken - The generated Turnstile token to validate.
 * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating the validation success.
 */
export async function validateTurnstileServerSide({ turnstileSecretKey, turnstileGeneratedToken }) {
   const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: `secret=${encodeURIComponent(turnstileSecretKey)}&response=${encodeURIComponent(turnstileGeneratedToken)}`,
      headers: {
         "content-type": "application/x-www-form-urlencoded",
      },
   })
   const dataTurnstile = await res.json()
   return dataTurnstile.success
}
