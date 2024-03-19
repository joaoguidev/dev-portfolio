import CharacterCanvas from "../../components/canvas/character"
import { CardGradient } from "../../components/card-gradient"
import SectionHeading from "../../components/section-heading"

export default function Introduction({ textHeading, textSubHeading, textParagraph }) {
   // const characterCanvaA = useMemo(
   //    () =>{ return <CharacterCanvas />
   //    },[]
   //  );
   return (
      <>
         <div className="w-full">
            <SectionHeading textHeading={textHeading} textSubHeading={textSubHeading} textParagraph={textParagraph} />
            <div className="mt-10 flex w-full flex-wrap  justify-center gap-y-10 lg:justify-center">
               {/* <div className="mt-10 max-w-sm">
                  <CardGradient className="relative rounded-3xl bg-white p-4 dark:bg-zinc-900 sm:p-8">
                     <p className="mb-2 mt-4 text-base text-green-500 dark:text-neutral-200 sm:text-xl">Frontend Development</p>

                     <p className="text-sm text-neutral-600 dark:text-neutral-400">The Air Jordan 4 Retro Reimagined Bred will release on Saturday, February 17, 2024. Your best opportunity to get these right now is by entering raffles and waiting for the official releases.</p>
                     <button className="mt-4 flex items-center space-x-1 rounded-full bg-black py-1 pl-4 pr-1 text-xs font-bold text-white dark:bg-zinc-800">
                        <span>Buy now </span>
                        <span className="rounded-full bg-zinc-700 px-2 py-0 text-[0.6rem] text-white">$100</span>
                     </button>
                  </CardGradient>
               </div> */}
               <div className="mt-10 max-w-sm">
                  <CardGradient className="relative rounded-3xl bg-white p-4 dark:bg-zinc-900 sm:p-8">
                     <CharacterCanvas />
                     <p className="mb-2 mt-4 text-base text-green-500 dark:text-neutral-200 sm:text-xl">Joao Dantas</p>

                     <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Transitioning from a career as a financial analyst, I embarked on a new chapter in computer studies, leaving behind the bustling finance world for the innovative realm of technology. Hailing from Brazil, I chose Langara as my gateway to this exciting field, where I eagerly
                        absorbed new knowledge and honed my skills. Through dedication and perseverance, I transformed into a proficient computer studies professional, equipped to thrive in the ever-evolving landscape of technology.
                     </p>
                     <button className="mt-4 flex items-center space-x-1 rounded-full bg-black py-1 pl-4 pr-1 text-xs font-bold text-white dark:bg-zinc-800">
                        <span>Buy now</span>
                        <span className="rounded-full bg-zinc-700 px-2 py-0 text-[0.6rem] text-white">$100</span>
                     </button>
                  </CardGradient>
               </div>
            </div>
         </div>
      </>
   )
}
