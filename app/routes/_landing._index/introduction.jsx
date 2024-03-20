import CharacterCanvas from "../../components/canvas/character"
import { CardGradient } from "../../components/card-gradient"
import SectionHeading from "../../components/section-heading"

export default function Introduction({ textHeading, textSubHeading, textParagraph,textHeadingCard, textParagraphCard }) {
   // const characterCanvaA = useMemo(
   //    () =>{ return <CharacterCanvas />
   //    },[]
   //  );
   return (
      <>
         <div className="w-full">
            <SectionHeading textHeading={textHeading} textSubHeading={textSubHeading} textParagraph={textParagraph}  />
            <div className="mt-10 flex w-full flex-wrap  justify-center gap-y-10 lg:justify-center">
               <div className="mt-10 max-w-sm">
                  <CardGradient className="relative rounded-3xl bg-white p-4 dark:bg-zinc-900 sm:p-8">
                     <CharacterCanvas />
                     <p className="mb-2 mt-4 text-base text-green-500 dark:text-neutral-200 sm:text-xl">{textHeadingCard}</p>
                     <p className="text-sm text-neutral-600 dark:text-neutral-400">
                     {textParagraphCard}
                     </p>
                  </CardGradient>
               </div>
            </div>
         </div>
      </>
   )
}
