import { Link } from "@remix-run/react"
import { motion } from "framer-motion"
import { useState } from "react"
import SectionHeading from "../../components/SectionHeading"
import { mylinks, work } from "../../lib/constants"
import { cn } from "../../utils/cn"

export default function Work() {
   return (
      <>
         <SectionHeading textHeading={"Projects"} textSubHeading={"My Work"} textParagraph={"Explore my portfolio to see how I blend creativity with technical proficiency to deliver impactful digital solutions."} />
         <div className="flex w-full flex-wrap items-center justify-center gap-y-40 ">
            {work.map((item, index) => (
               <PinContainer key={"work-" + index} repository={item.repository} live={item.live}>
                  <div className="flex h-[25rem] w-[20rem] basis-full flex-col p-1 tracking-tight text-slate-100/50 sm:basis-1/2 ">
                     <h3 className="!m-0 max-w-xs !pb-2 text-base  font-bold text-slate-100">{item.title}</h3>
                     <div className="!m-0 !p-0 text-base font-normal">
                        <span className="line-clamp-6 text-balance text-sm text-slate-400">{item.description}</span>
                        {item.tecnologies.map((tech, index) => (
                           <span key={"workTech-" + index} className={`m-1 text-sm ${tech?.color}`}>
                              {tech?.name}
                           </span>
                        ))}
                     </div>
                     <div className="-px-5 mt-1 flex w-full flex-1 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
                        <img src={item.imageUrl} alt="a" loading="lazy" className="mx-auto w-full rounded-lg object-cover p-2 " crossOrigin="true" />
                     </div>
                     {/* <div className="mt-4 flex w-full flex-1 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" /> */}
                  </div>
               </PinContainer>
            ))}
         </div>
      </>
   )
}

export const PinContainer = ({ children, repository, live, className, containerClassName }) => {
   const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)")

   const onMouseEnter = () => {
      setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)")
   }
   const onMouseLeave = () => {
      setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)")
   }

   return (
      <div className={cn("group/pin relative z-50  cursor-pointer", containerClassName)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
         <div
            style={{
               perspective: "1000px",
               transform: "rotateX(70deg) translateZ(0deg)",
            }}
            className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2">
            <div
               style={{
                  transform: transform,
               }}
               className="absolute left-1/2 top-1/2 flex  items-start justify-start overflow-hidden  rounded-2xl  border border-white/[0.1] bg-zinc-900 p-4 shadow-[0_8px_16px_rgb(0_0_0/0.4)] transition duration-700 group-hover/pin:border-white/[0.2]">
               <div className={cn(" relative z-50 ", className)}>{children}</div>
            </div>
         </div>
         <PinPerspective repository={repository} live={live} />
      </div>
   )
}

export const PinPerspective = ({ repository, live }) => {
   return (
      <motion.div className=" z-[60] flex h-80 w-96 items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100">
         <div className=" inset-0 -mt-7 h-full w-full flex-none">
            {repository?.title ? (
               <div className={`absolute inset-x-0 ${live?.title ? "-top-12" : "top-0"}  flex justify-center`}>
                  <Link to={repository.url} target="_blank" rel="noopener noreferrer" className="relative z-10  mb-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10 ">
                     <span className="relative z-20 inline-block py-0.5 text-xs font-bold text-white">{repository.title}</span>

                     <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
                  </Link>{" "}
               </div>
            ) : (
               ""
            )}
            {live?.title ? (
               <div className="absolute inset-x-0 top-0 flex  justify-center">
                  <Link to={live.url} target="_blank" rel="noopener noreferrer" className="relative z-10  flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10 ">
                     <span className="relative z-20 inline-block py-0.5 text-xs font-bold text-white">{live.title}</span>

                     <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
                  </Link>{" "}
               </div>
            ) : (
               ""
            )}

            <div
               style={{
                  perspective: "1000px",
                  transform: "rotateX(70deg) translateZ(0)",
               }}
               className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2">
               <>
                  <motion.div
                     initial={{
                        opacity: 0,
                        scale: 0,
                        x: "-50%",
                        y: "-50%",
                     }}
                     animate={{
                        opacity: [0, 1, 0.5, 0],
                        scale: 1,

                        z: 0,
                     }}
                     transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: 0,
                     }}
                     className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.7] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"></motion.div>
                  <motion.div
                     initial={{
                        opacity: 0,
                        scale: 0,
                        x: "-50%",
                        y: "-50%",
                     }}
                     animate={{
                        opacity: [0, 1, 0.5, 0],
                        scale: 1,

                        z: 0,
                     }}
                     transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: 2,
                     }}
                     className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.7] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"></motion.div>
                  <motion.div
                     initial={{
                        opacity: 0,
                        scale: 0,
                        x: "-50%",
                        y: "-50%",
                     }}
                     animate={{
                        opacity: [0, 1, 0.5, 0],
                        scale: 1,

                        z: 0,
                     }}
                     transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: 4,
                     }}
                     className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.7] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"></motion.div>
               </>
            </div>

            <>
               <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-cyan-500 blur-[2px] group-hover/pin:h-40" />
               <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-cyan-500  group-hover/pin:h-40  " />
               <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-cyan-600 blur-[3px]" />
               <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-cyan-300 " />
            </>
         </div>
      </motion.div>
   )
}
