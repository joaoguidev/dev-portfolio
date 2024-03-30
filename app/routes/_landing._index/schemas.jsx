import { z } from "zod"

export async function getSchemaContact() {
   const schema = await z.object({
      name: z
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
      email: z
         .string({ required_error: "Email field required" })
         .trim()
         .email({ message: "Invalid email format" })
         .min(1, { message: "Email field required" })
         .max(254, { message: "Email too long" })
         .refine((value) => value === "" || /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value), {
            message: "Invalida character in email",
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
        'cf-turnstile-response': z.string({ required_error: "Missing Captcha" }).min(1, { message: "Error. Missing Captcha. Contact Us" }).max(5000, { message: "Error. Missing Captcha. Contact Us" }),
   })
   return schema
}

export async function getSchemaChatbot() {
   const schema = await z.object({
      question: z
         .string({ required_error: "Question field required" })
         .trim()
         .min(1, { question: "Question field required" })
         .max(5000, { question: "Question too long" })
         .refine((value) => /^[a-zA-Z0-9\s.,;:!?'"()]+$/.test(value), {
            question: "Invalid character in the question field",
        }),
        'cf-turnstile-response': z.string({ required_error: "Missing Captcha" }).min(1, { question: "Error. Missing Captcha. Contact Us" }).max(5000, { question: "Error. Missing Captcha. Contact Us" }),
   })
   return schema
}