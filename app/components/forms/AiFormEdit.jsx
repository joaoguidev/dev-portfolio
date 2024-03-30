import { Turnstile } from "@marsidev/react-turnstile"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Form, useActionData, useNavigation, useOutletContext } from "@remix-run/react"
import { IconAlertTriangle, IconMailbox } from "@tabler/icons-react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { forwardRef, useEffect, useState } from "react"
import { AuthenticityTokenInput } from "remix-utils/csrf/react"
import { cn } from "../../utils/cn"

export default function AiForm() {
   const { env } = useOutletContext()
   const actionData = useActionData()
   const [formErrors, setFormErrors] = useState(actionData?.errors)
   useEffect(() => {
      if (actionData?.errors) {
         setFormErrors(actionData?.errors)
      }
   }, [actionData])
   const navigation = useNavigation()
   return (
      <div className="mx-auto w-full ">
         <div className=" mx-auto mt-20  w-full max-w-md  rounded-2xl bg-white p-4 shadow-input dark:bg-zinc-900 md:p-8">
            <h2 id="contactForm" className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-4xl">
               Ask anything about me
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-300 dark:text-neutral-300">This is my own AI developed with OpenAI and pgvector</p>

            <Form className="mt-8" method="POST">
               <AuthenticityTokenInput />
               <input className="hidden" name="intent" defaultValue="chatbot" />
               <LabelInputContainer className="mb-8">
                  <Textarea
                     id="answer"
                     name="answer"
                     // placeholder="Please leave your answer"
                     type={"textarea"}
                     autoComplete="name"
                     aria-describedby={formErrors?.answer ? "answerError" : "contactForm"}
                     rows="10"
                     className="select-none"
                     onKeyDown={() => {
                        if (formErrors?.answer) {
                           setFormErrors((prevState) => {
                              let newState = { ...prevState }
                              delete newState?.answer
                              return newState
                           })
                        }
                     }}
                  />
                  <Textarea
                     id="question"
                     name="question"
                     required
                     placeholder="Type your question here"
                     type={"textarea"}
                     autoComplete="name"
                     aria-describedby={formErrors?.question ? "questionError" : "contactForm"}
                     rows="3"
                     onKeyDown={() => {
                        if (formErrors?.question) {
                           setFormErrors((prevState) => {
                              let newState = { ...prevState }
                              delete newState?.question
                              return newState
                           })
                        }
                     }}
                  />
                  {formErrors?.question && (
                     <span id="questionError" className="mt-3 flex flex-row items-center gap-3 rounded-lg bg-red-50 px-3 text-sm text-red-800">
                        <IconAlertTriangle className="size-4" /> {formErrors?.question}
                     </span>
                  )}
               </LabelInputContainer>

               <button
                  className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-700 dark:from-zinc-800 dark:to-zinc-800 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit">
                  Ask
                  <BottomGradient />
               </button>
               {formErrors?.turnstile && (
                  <span id="turnstileError" className="mt-3 flex flex-row items-center gap-3 rounded-lg bg-red-50 px-3 text-sm text-red-800">
                     <IconAlertTriangle className="size-4 " /> {formErrors?.turnstile}
                  </span>
               )}
               <div className="mt-8 w-full">
                  <Turnstile id="widget-2" className="mx-auto" siteKey={env.CLOUDFLARE_TURNSTILE_SITE_KEY} />
               </div>
            </Form>
         </div>
      </div>
   )
}

const Label = forwardRef(({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn("text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white", className)} {...props} />)
Label.displayName = LabelPrimitive.Root.displayName

const Input = forwardRef(({ className, type, ...props }, ref) => {
   const radius = 100 // change this to increase the rdaius of the hover effect
   const [visible, setVisible] = useState(false)

   let mouseX = useMotionValue(0)
   let mouseY = useMotionValue(0)

   function handleMouseMove({ currentTarget, clientX, clientY }) {
      let { left, top } = currentTarget.getBoundingClientRect()

      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
   }
   return (
      <motion.div
         style={{
            background: useMotionTemplate`
         radial-gradient(
           ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
           var(--blue-500),
           transparent 80%
         )
       `,
         }}
         onMouseMove={handleMouseMove}
         onMouseEnter={() => setVisible(true)}
         onMouseLeave={() => setVisible(false)}
         className="group/input rounded-lg p-[2px] transition duration-300">
         <input
            type={type}
            className={cn(
               `dark:placeholder-text-neutral-600 duration-400 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input  transition file:border-0 
           file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 
           focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 disabled:cursor-not-allowed
            disabled:opacity-50 group-hover/input:shadow-none
            dark:bg-zinc-800
            dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600
            `,
               className,
            )}
            ref={ref}
            {...props}
         />
      </motion.div>
   )
})
Input.displayName = "Input"

const Textarea = forwardRef(({ className, type, ...props }, ref) => {
   const radius = 100 // change this to increase the rdaius of the hover effect
   const [visible, setVisible] = useState(false)

   let mouseX = useMotionValue(0)
   let mouseY = useMotionValue(0)

   function handleMouseMove({ currentTarget, clientX, clientY }) {
      let { left, top } = currentTarget.getBoundingClientRect()

      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
   }
   return (
      <motion.div
         style={{
            background: useMotionTemplate`
         radial-gradient(
           ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
           var(--blue-500),
           transparent 80%
         )
       `,
         }}
         onMouseMove={handleMouseMove}
         onMouseEnter={() => setVisible(true)}
         onMouseLeave={() => setVisible(false)}
         className="group/input rounded-lg p-[2px] transition duration-300">
         <textarea
            type={type}
            className={cn(
               `dark:placeholder-text-neutral-600 duration-400 flex w-full resize-none rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input  transition file:border-0 
           file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 
           focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 disabled:cursor-not-allowed
            disabled:opacity-50 group-hover/input:shadow-none
            dark:bg-zinc-800
            dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600
            `,
               className,
            )}
            ref={ref}
            {...props}
         />
      </motion.div>
   )
})
Textarea.displayName = "Textarea"

const BottomGradient = () => {
   return (
      <>
         <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
         <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
      </>
   )
}

const LabelInputContainer = ({ children, className }) => {
   return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
}
