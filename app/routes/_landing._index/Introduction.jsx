import { Form, Link } from "@remix-run/react"
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react"
import { CardGradient } from "../../components/CardGradient"
import SectionHeading from "../../components/SectionHeading"
import CharacterCanvas from "../../components/canvas/Character"
import AiForm from "../../components/forms/AiForm"
import { introductionCard, introductionSectionHeading, mylinks } from "../../lib/constants"

export default function Introduction() {
   return (
      <>
         <div className="w-full ">
            <SectionHeading textHeading={introductionSectionHeading.heading} textSubHeading={introductionSectionHeading.subheading} textParagraph={introductionSectionHeading.paragraph} />
            <div className="mt-10 flex w-full flex-wrap  justify-center gap-y-10 lg:justify-center">
               <div className="mt-10 max-w-sm">
                  <CardGradient className="relative rounded-3xl bg-white p-4 dark:bg-zinc-900 sm:p-8 ">
                     <CharacterCanvas />
                     <p className="mb-2 mt-4 text-base text-green-500 dark:text-neutral-200 sm:text-xl">{introductionCard.title}</p>
                     <p className="text-sm text-neutral-600 dark:text-neutral-400">{introductionCard.paragraph}</p>
                     <div className="mt-4 flex w-full flex-row items-center justify-around text-white">
                        <Link to={mylinks.linkedin} className="" target="_blank" rel="noopener noreferrer">
                           <IconBrandLinkedin className="size-8 " />
                        </Link>
                        <Link to={mylinks.github} className="" target="_blank" rel="noopener noreferrer">
                           <IconBrandGithub className="size-8 " />
                        </Link>
                     </div>
                  </CardGradient>
               </div>
            </div>
         </div>
      </>
   )
}
