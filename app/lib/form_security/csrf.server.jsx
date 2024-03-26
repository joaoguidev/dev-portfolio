import { createCookie } from "@remix-run/cloudflare"
import { CSRF } from "remix-utils/csrf/server";
// import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const cookie = createCookie("csrf", {
	path: "/",
	httpOnly: true,
	secure: true,
	sameSite: "lax",
	//TODO - Bring the secret correctly from the .dev.vars. How to make this available here without context?
	secrets: ['4pTEL7hv1ebsLbtwc3NjfQuywCz5CerxPbmwhfC7vnWBqsjr0vBYTNT7GAe9cAtrPeU='],
});


export const csrf = new CSRF({
	cookie,
	// what key in FormData objects will be used for the token, defaults to `csrf`
	formDataKey: "csrf",
	// an optional secret used to sign the token, recommended for extra safety
	//TODO - Bring the secret correctly from the .dev.vars. How to make this available here without context?
	secret: '4pTEL7hv1ebsLbtwc3NjfQuywCz5CerxPbmwhfC7vnWBqsjr0vBYTNT7GAe9cAtrPeU=',
});

export async function validateCSRF({formData, headers}){
	try {
      await csrf.validate(formData, headers)
   } catch (error) {
      console.log("CSRF ERRROR: ", error)
      console.log("CSRF ERRROR code: ", error.code)
      console.log("CSRF ERRROR message: ", error?.message)
      throw new Response("Invalid CSRF", { status: 403 })
   }
}