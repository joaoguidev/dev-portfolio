import { motion } from "framer-motion"
import { textVariant } from "../utils/motion"

export default function SectionHeading({ textHeading, textSubHeading, textParagraph }) {
   return (
      <div className="size-full">
         <motion.div variants={textVariant()} className="">
            <p className="text-[14px] uppercase tracking-wider text-black/60  dark:text-white/60 sm:text-[18px] ">{textSubHeading}</p>
            <h2 className="xs:text-[40px] text-[30px] font-black dark:text-white sm:text-[50px] md:text-[60px]">{textHeading}</h2>
            <p className="text-black/60 dark:text-white/60 prose-lg max-w-3xl">{textParagraph}</p>
         </motion.div>
      </div>
   )
}
