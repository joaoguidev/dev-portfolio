import { Turnstile } from "@marsidev/react-turnstile"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Form, useActionData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react"
import { IconAlertTriangle, IconHelpCircleFilled, IconHelpHexagon, IconLoadBalancer, IconLoader, IconLoader2, IconLoader3, IconLoaderQuarter, IconMailbox, IconMessageChatbot, IconMessageForward, IconQuestionMark, IconRobot } from "@tabler/icons-react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { forwardRef, useEffect, useRef, useState } from "react"
import { AuthenticityTokenInput, useAuthenticityToken } from "remix-utils/csrf/react"
import { cn } from "../../utils/cn"

export default function AiForm() {
   const refTurnstileWidget5 = useRef()

   const actionData = useActionData()
   const { env } = useOutletContext()
   const [formData, setFormData] = useState({ question: "" })
   const [turnstileReady, setTurnstileReady] = useState(false)
   const [chat, setChat] = useState(actionData?.aiData)
   const [formErrors, setFormErrors] = useState(actionData?.errors)
   const navigation = useNavigation()
   const csrf = useAuthenticityToken()

   useEffect(() => {
      setFormErrors(actionData?.errors)
      setChat(actionData?.aiData)
      refTurnstileWidget5.current.reset()
   }, [actionData])

   const isSubmitting = navigation.state !== "idle" ? true : false
   const submit = useSubmit()

   //ANCHOR - Handle Submit
   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = Object.fromEntries(new FormData(e.target).entries())
      setTurnstileReady(false)

      submit({ csrf, ...formData }, { method: "POST" })
   }
   return (
      <div className="z-30 mx-auto w-full">
         <div className="mx-auto mt-10  w-full max-w-lg">
            <div className="mb-5 w-full">
               <IconRobot className="mx-auto size-10 text-white" />
            </div>
            <h2 id="contactForm" className="text-center text-3xl font-bold text-white sm:text-5xl">
               Ask anything about me
            </h2>
            <p className="mt-4 w-full text-center text-sm text-neutral-300 dark:text-neutral-300">Vector similarity search, developed with OpenAI for embeddings and semantic context, Supabase, and pgVector.</p>

            <Form className="mt-20" onSubmit={handleSubmit} method="POST">
               {/* <AuthenticityTokenInput /> */}
               <input className="hidden" name="intent" defaultValue="chatbot" />
               <div className="relative">
                  {/* //ANCHOR - Question Input */}
                  <input
                     className="w-full resize-none border-b bg-transparent py-1 text-lg text-neutral-300 focus:outline-none"
                     id="question"
                     name="question"
                     placeholder="Type here"
                     type={"text"}
                     value={formData.question}
                     autoComplete="off"
                     aria-describedby={formErrors?.question ? "questionError" : "contactForm"}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           question: e.target.value,
                        })
                     }}
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
                  <div className="absolute bottom-0 h-[2px] w-full rounded-full bg-neutral-400" aria-hidden></div>
               </div>
               {/* //ANCHOR - Submit button */}
               <button disabled={isSubmitting || !turnstileReady} className="group/btn relative block h-10 w-full rounded-b-md bg-neutral-700/50 font-semibold text-neutral-300 duration-300 hover:bg-neutral-700/80 " type="submit">
                  <div className="flex flex-row items-center justify-center gap-2">
                     {isSubmitting || !turnstileReady ? <IconLoader className="size-5 animate-spin" /> : <IconMessageForward className="size-5" />}
                     {isSubmitting || !turnstileReady ? "Wait..." : "Ask"}
                  </div>
               </button>
               {/* //ANCHOR - Form Errors */}
               {formErrors?.question && (
                  <span id="questionError" className="mt-3 flex flex-row items-center gap-3 rounded-lg bg-red-50 px-3 text-sm text-red-800">
                     <IconAlertTriangle className="size-4" /> {formErrors?.question}
                  </span>
               )}
               {formErrors?.turnstile && (
                  <span id="turnstileError" className="mt-3 flex flex-row items-center gap-3 rounded-lg bg-red-50 px-3 text-sm text-red-800">
                     <IconAlertTriangle className="size-4 " /> {formErrors?.turnstile}
                  </span>
               )}
               {formErrors?.unexpected && (
                  <span id="unexpectedError" className="mt-3 flex flex-row items-center gap-3 rounded-lg bg-red-50 px-3 text-sm text-red-800">
                     <IconAlertTriangle className="size-4 " /> {formErrors?.unexpected}
                  </span>
               )}
               {/* //ANCHOR - Turnstile Component */}
               <div className="mt-5 w-full">
                  {" "}
                  <Turnstile
                     ref={refTurnstileWidget5}
                     id="widget-5"
                     className="mx-auto"
                     siteKey={env.CLOUDFLARE_TURNSTILE_HIDDEN_SITE_KEY}
                     // siteKey='3x00000000000000000000FF'//Forces challenge
                     onSuccess={(token) => {
                        if (token) {
                           setTurnstileReady(true)
                        }
                     }}
                  />
               </div>
            </Form>
            {/* //SECTION - AI Chat Answer Section  */}
            <div className="mt-10  max-h-64 min-h-64 w-full overflow-y-auto">
               {chat ? (
                  <ul className="mx-auto flex flex-col gap-4 ">
                     <li className="flex flex-col gap-3">
                        <div className="flex flex-row items-start justify-start gap-2 rounded-lg border border-white/20 bg-zinc-300/10 px-1 py-5 text-white/70 ">
                           <IconHelpCircleFilled className="size-6" />
                           <p className="h-full w-full font-medium">{chat?.question} </p>
                        </div>
                        <div className="flex flex-row items-start justify-start gap-2 rounded-lg border border-white/20 bg-zinc-300/10 px-2 py-5 text-white/70">
                           <IconMessageChatbot className="size-6" />
                           <p className="h-full w-full">{chat?.aiAnswer}</p>
                        </div>
                     </li>
                  </ul>
               ) : (
                  ""
               )}
            </div>
            {/* //!SECTION */}
         </div>
      </div>
   )
}
