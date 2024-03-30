import * as LabelPrimitive from "@radix-ui/react-label"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "../../utils/cn"

import { Form, useOutletContext } from "@remix-run/react"
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react"
import { forwardRef, useState } from "react"

export default function AdminForm() {
   const { supabase } = useOutletContext()

   const handleSubmit = async (e) => {
      e.preventDefault()
      await supabase.auth.signInWithOAuth({
         provider: "github",
         options: {
            redirectTo: `http://podbaydor.com/admin/auth/callback`,
         },
      })
   }
   return (
      <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
         <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Welcome to Aceternity</h2>
         <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">Login to aceternity if you can because we don&apos;t have a login flow yet</p>

         <Form className="my-8" onSubmit={handleSubmit}>
            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

            <div className="flex flex-col space-y-4">
               <button className=" group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]" type="submit">
                  <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">GitHub</span>
                  <BottomGradient />
               </button>
            </div>
         </Form>
      </div>
   )
}

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
