import { Turnstile } from "@marsidev/react-turnstile"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Form, useActionData, useNavigation, useOutletContext } from "@remix-run/react"
import { IconAlertTriangle, IconBrandGithub, IconBrandGoogle, IconMailbox } from "@tabler/icons-react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { forwardRef, useEffect, useState } from "react"
import { AuthenticityTokenInput } from "remix-utils/csrf/react"
import ContactForm from "../../components/ContactForm"
import SectionHeading from "../../components/SectionHeading"
import { cn } from "../../utils/cn"

export default function Contact() {
   return (
      <>
         <div className="flex w-full flex-wrap">
            <ContactForm />
         </div>
      </>
   )
}
