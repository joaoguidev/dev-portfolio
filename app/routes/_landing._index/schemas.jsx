import { z } from "zod"

export async function getSchemaContact() {
   const schema = await z.object({
      name: z
         .string({ required_error: "Campo nome é obrigatório." })
         .min(1, { message: "Campo nome é obrigatório." })
         .max(100, { message: "Nome muito longo" })
         .refine((value) => value === "" || /^[a-zA-Z ]+$/.test(value), {
            message: "Apenas letras maiúsculas e minúsculas são permitidas.",
         })
         .transform((value) => {
            // Capitalize the first letter of each word
            return value
               .toLowerCase()
               .split(" ")
               .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
               .join(" ")
         }),
      email: z
         .string({ required_error: "Campo e-mail é obrigatório." })
         .trim()
         .email({ message: "Formato de e-mail inválido" })
         .min(1, { message: "Campo e-mail é obrigatório." })
         .max(254, { message: "E-mail muito longo" })
         .refine((value) => value === "" || /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value), {
            message: "Caractere inválido no campo de e-mail",
         })
         .transform((value) => value.toLowerCase()),
      message: z
         .string({ required_error: "Message field required" })
         .trim()
         .min(1, { message: "Message field required" })
         .max(5000, { message: "Message too long" })
         .refine((value) => /^[a-zA-Z0-9\s.,;:!?'"()]+$/.test(value), {
            message: "Invalid character in the message field",
        }),
      captchaToken: z.string({ required_error: "Missing Captcha" }).min(1, { message: "Error. Missing Captcha. Contact Us" }).max(5000, { message: "Error. Missing Captcha. Contact Us" }),
   })
   return schema
}
