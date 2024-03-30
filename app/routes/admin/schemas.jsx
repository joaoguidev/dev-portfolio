import { z } from "zod"

export async function getSchemaContact() {
   const schema = await z.object({
      githubMail: z
         .string({ required_error: "Name field required" })
         .min(1, { message: "Name field required" })
         .max(100, { message: "Name too long" })
         .refine((value) => value === "" || /^[a-zA-Z ]+$/.test(value), {
            message: "Only uppercase and lowercase characters from a-z are allowed",
         })
         .transform((value) => {
            // Capitalize the first letter of each word
            return value
               .toLowerCase()
               .split(" ")
               .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
               .join(" ")
         }),
        'cf-turnstile-response': z.string({ required_error: "Missing Captcha" }).min(1, { message: "Error. Missing Captcha. Contact Us" }).max(5000, { message: "Error. Missing Captcha. Contact Us" }),
   })
   return schema
}

