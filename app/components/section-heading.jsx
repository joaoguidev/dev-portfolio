import { motion } from "framer-motion"
import { textVariant } from "../utils/motion"

export default function SectionHeading({ textHeading, textSubHeading, textParagraph }) {
   return (
      <div className="size-full">
         <motion.div variants={textVariant()} className="">
            <p className=" uppercase tracking-wider text-black/60 dark:text-white/60 sm:text-lg ">{textSubHeading}</p>
            <h2 className="xs:text-3xl my-5 text-3xl font-black dark:text-white sm:text-5xl md:text-6xl">{textHeading}</h2>
            <p className="prose-lg max-w-4xl text-black/60 dark:text-white/60">{textParagraph}</p>
         </motion.div>
      </div>
   )
}
