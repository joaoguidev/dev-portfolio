import {
   IconBrightnessDown,
   IconBrightnessUp,
   IconCaretDownFilled,
   IconCaretLeftFilled,
   IconCaretRightFilled,
   IconCaretUpFilled,
   IconChevronUp,
   IconCommand,
   IconMicrophone,
   IconMoon,
   IconPlayerSkipForward,
   IconPlayerTrackNext,
   IconPlayerTrackPrev,
   IconSearch,
   IconTable,
   IconVolume,
   IconVolume2,
   IconVolume3,
   IconWorld,
} from "@tabler/icons-react"
import { MotionValue, motion, stagger, useAnimate, useInView, useScroll, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "../../utils/cn"

export default function Hero({ textHeading, textSubHeading }) {
   return (
      <div className="w-full overflow-hidden bg-white dark:bg-black">
         <MacbookScroll
            title={
               <div className="flex flex-col gap-4">
                  <h1 className="">{textHeading}</h1>
                  <p className="">{textSubHeading}</p>
               </div>
            }
            badge={
               <div>
                  <Badge className="h-10 w-10 -rotate-12 transform" />
               </div>
            }
            src={"/images/gitimage.png"}
            showGradient={false}
         />
      </div>
   )
}

const Badge = ({ className }) => {
   return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
         <circle cx="12" cy="12" r="11" fill="#00AA56" />
         <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#FFFFFF">
            JD
         </text>
      </svg>
   )
}

const MacbookScroll = ({ src, showGradient, title, badge }) => {
   const ref = useRef(null)
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
   })

   const [isMobile, setIsMobile] = useState(false)

   useEffect(() => {
      if (window && window.innerWidth < 768) {
         setIsMobile(true)
      }
   }, [])

   const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, isMobile ? 1 : 1.5])
   const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, isMobile ? 1 : 1.5])
   const translate = useTransform(scrollYProgress, [0, 1], [0, 1500])
   const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0])
   const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100])
   const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
   // Set a boundary for translation to prevent scrolling beyond a certain point
   const limitedTranslate = useTransform(translate, (value) => Math.min(value, 600))

   const words = [
      {
         text: "Building",
      },
      {
         text: "bridges",
      },
      {
         text: "between",
      },
      {
         text: "and",
      },
      {
         text: "technology.",
         className: "text-blue-500 dark:text-blue-500",
      },
   ]
   return (
      <div className="">
         <div ref={ref} className="flex min-h-[120vh] w-full scale-[0.65] transform flex-col items-center justify-start py-0 [perspective:800px] sm:min-h-[190vh]   sm:scale-100 sm:py-48">
            <p className="text-xl text-neutral-600 dark:text-neutral-200 sm:text-2xl  ">Hello, my name is João Dantas</p>
            <TypewriterEffectSmooth className={"mb-20"} words={words} />
            {/* <motion.h2
               style={{
                  translateY: textTransform,
                  opacity: textOpacity,
               }}
               className="mb-20 text-center text-3xl font-bold text-neutral-800 dark:text-white">
               {title || (
                  <span>
                     This Macbook is built with Tailwindcss. <br /> No kidding.
                  </span>
               )}
            </motion.h2> */}
            {/* Lid */}
            <Lid src={src} scaleX={scaleX} scaleY={scaleY} rotate={rotate} translate={limitedTranslate} />
            {/* Base area */}
            <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
               {/* above keyboard bar */}
               <div className="relative h-10 w-full">
                  <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
               </div>
               <div className="relative flex">
                  <div className="mx-auto h-full w-[10%]  overflow-hidden">
                     <SpeakerGrid />
                  </div>
                  <div className="mx-auto h-full w-[80%]">
                     <Keypad />
                  </div>
                  <div className="mx-auto h-full w-[10%]  overflow-hidden">
                     <SpeakerGrid />
                  </div>
               </div>
               <Trackpad />
               <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
               {showGradient && <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black"></div>}
               {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
            </div>
         </div>
      </div>
   )
}

const Lid = ({ scaleX, scaleY, rotate, translate, src }) => {
   return (
      <div className="relative [perspective:800px]">
         <div
            style={{
               transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
               transformOrigin: "bottom",
               transformStyle: "preserve-3d",
            }}
            className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2">
            <div
               style={{
                  boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
               }}
               className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]">
               <span className="text-white">
                  <Logo />
               </span>
            </div>
         </div>
         <motion.div
            style={{
               scaleX: scaleX,
               scaleY: scaleY,
               rotateX: rotate,
               translateY: translate,
               transformStyle: "preserve-3d",
               transformOrigin: "top",
            }}
            className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2">
            <div className="absolute inset-0 rounded-lg bg-[#272729]" />
            <img src={src} alt="Joao Dantas Github" className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top" />
         </motion.div>
      </div>
   )
}

const Trackpad = () => {
   return (
      <div
         className="mx-auto my-1 h-32  w-[40%] rounded-xl"
         style={{
            boxShadow: "0px 0px 1px 1px #00000020 inset",
         }}></div>
   )
}

const Keypad = () => {
   return (
      <div className="mx-1 h-full rounded-md bg-[#050505] p-1">
         {/* First Row */}
         <Row>
            <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
               esc
            </KBtn>
            <KBtn>
               <IconBrightnessDown className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F1</span>
            </KBtn>

            <KBtn>
               <IconBrightnessUp className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F2</span>
            </KBtn>
            <KBtn>
               <IconTable className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F3</span>
            </KBtn>
            <KBtn>
               <IconSearch className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F4</span>
            </KBtn>
            <KBtn>
               <IconMicrophone className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F5</span>
            </KBtn>
            <KBtn>
               <IconMoon className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F6</span>
            </KBtn>
            <KBtn>
               <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F7</span>
            </KBtn>
            <KBtn>
               <IconPlayerSkipForward className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F8</span>
            </KBtn>
            <KBtn>
               <IconPlayerTrackNext className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F8</span>
            </KBtn>
            <KBtn>
               <IconVolume3 className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F10</span>
            </KBtn>
            <KBtn>
               <IconVolume2 className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F11</span>
            </KBtn>
            <KBtn>
               <IconVolume className="h-[6px] w-[6px]" />
               <span className="mt-1 inline-block">F12</span>
            </KBtn>
            <KBtn>
               <div className="h-4 w-4 rounded-full  bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
                  <div className="h-full w-full rounded-full bg-black" />
               </div>
            </KBtn>
         </Row>

         {/* Second row */}
         <Row>
            <KBtn>
               <span className="block">~</span>
               <span className="mt-1 block">`</span>
            </KBtn>

            <KBtn>
               <span className="block ">!</span>
               <span className="block">1</span>
            </KBtn>
            <KBtn>
               <span className="block">@</span>
               <span className="block">2</span>
            </KBtn>
            <KBtn>
               <span className="block">#</span>
               <span className="block">3</span>
            </KBtn>
            <KBtn>
               <span className="block">$</span>
               <span className="block">4</span>
            </KBtn>
            <KBtn>
               <span className="block">%</span>
               <span className="block">5</span>
            </KBtn>
            <KBtn>
               <span className="block">^</span>
               <span className="block">6</span>
            </KBtn>
            <KBtn>
               <span className="block">&</span>
               <span className="block">7</span>
            </KBtn>
            <KBtn>
               <span className="block">*</span>
               <span className="block">8</span>
            </KBtn>
            <KBtn>
               <span className="block">(</span>
               <span className="block">9</span>
            </KBtn>
            <KBtn>
               <span className="block">)</span>
               <span className="block">0</span>
            </KBtn>
            <KBtn>
               <span className="block">&mdash;</span>
               <span className="block">_</span>
            </KBtn>
            <KBtn>
               <span className="block">+</span>
               <span className="block"> = </span>
            </KBtn>
            <KBtn className="w-10 items-end justify-end pb-[2px] pr-[4px]" childrenClassName="items-end">
               delete
            </KBtn>
         </Row>

         {/* Third row */}
         <Row>
            <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
               tab
            </KBtn>
            <KBtn>
               <span className="block">Q</span>
            </KBtn>

            <KBtn>
               <span className="block">W</span>
            </KBtn>
            <KBtn>
               <span className="block">E</span>
            </KBtn>
            <KBtn>
               <span className="block">R</span>
            </KBtn>
            <KBtn>
               <span className="block">T</span>
            </KBtn>
            <KBtn>
               <span className="block">Y</span>
            </KBtn>
            <KBtn>
               <span className="block">U</span>
            </KBtn>
            <KBtn>
               <span className="block">I</span>
            </KBtn>
            <KBtn>
               <span className="block">O</span>
            </KBtn>
            <KBtn>
               <span className="block">P</span>
            </KBtn>
            <KBtn>
               <span className="block">{`{`}</span>
               <span className="block">{`[`}</span>
            </KBtn>
            <KBtn>
               <span className="block">{`}`}</span>
               <span className="block">{`]`}</span>
            </KBtn>
            <KBtn>
               <span className="block">{`|`}</span>
               <span className="block">{`\\`}</span>
            </KBtn>
         </Row>

         {/* Fourth Row */}
         <Row>
            <KBtn className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
               caps lock
            </KBtn>
            <KBtn>
               <span className="block">A</span>
            </KBtn>

            <KBtn>
               <span className="block">S</span>
            </KBtn>
            <KBtn>
               <span className="block">D</span>
            </KBtn>
            <KBtn>
               <span className="block">F</span>
            </KBtn>
            <KBtn>
               <span className="block">G</span>
            </KBtn>
            <KBtn>
               <span className="block">H</span>
            </KBtn>
            <KBtn>
               <span className="block">J</span>
            </KBtn>
            <KBtn>
               <span className="block">K</span>
            </KBtn>
            <KBtn>
               <span className="block">L</span>
            </KBtn>
            <KBtn>
               <span className="block">{`:`}</span>
               <span className="block">{`;`}</span>
            </KBtn>
            <KBtn>
               <span className="block">{`"`}</span>
               <span className="block">{`'`}</span>
            </KBtn>
            <KBtn className="w-[2.85rem] items-end justify-end pb-[2px] pr-[4px]" childrenClassName="items-end">
               return
            </KBtn>
         </Row>

         {/* Fifth Row */}
         <Row>
            <KBtn className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
               shift
            </KBtn>
            <KBtn>
               <span className="block">Z</span>
            </KBtn>
            <KBtn>
               <span className="block">X</span>
            </KBtn>
            <KBtn>
               <span className="block">C</span>
            </KBtn>
            <KBtn>
               <span className="block">V</span>
            </KBtn>
            <KBtn>
               <span className="block">B</span>
            </KBtn>
            <KBtn>
               <span className="block">N</span>
            </KBtn>
            <KBtn>
               <span className="block">M</span>
            </KBtn>
            <KBtn>
               <span className="block">{`<`}</span>
               <span className="block">{`,`}</span>
            </KBtn>
            <KBtn>
               <span className="block">{`>`}</span>
               <span className="block">{`.`}</span>
            </KBtn>{" "}
            <KBtn>
               <span className="block">{`?`}</span>
               <span className="block">{`/`}</span>
            </KBtn>
            <KBtn className="w-[3.65rem] items-end justify-end pb-[2px] pr-[4px]" childrenClassName="items-end">
               shift
            </KBtn>
         </Row>

         {/* sixth Row */}
         <Row>
            <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
               <div className="flex w-full justify-end pr-1">
                  <span className="block">fn</span>
               </div>
               <div className="flex w-full justify-start pl-1">
                  <IconWorld className="h-[6px] w-[6px]" />
               </div>
            </KBtn>
            <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
               <div className="flex w-full justify-end pr-1">
                  <IconChevronUp className="h-[6px] w-[6px]" />
               </div>
               <div className="flex w-full justify-start pl-1">
                  <span className="block">control</span>
               </div>
            </KBtn>
            <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
               <div className="flex w-full justify-end pr-1">
                  <OptionKey className="h-[6px] w-[6px]" />
               </div>
               <div className="flex w-full justify-start pl-1">
                  <span className="block">option</span>
               </div>
            </KBtn>
            <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
               <div className="flex w-full justify-end pr-1">
                  <IconCommand className="h-[6px] w-[6px]" />
               </div>
               <div className="flex w-full justify-start pl-1">
                  <span className="block">command</span>
               </div>
            </KBtn>
            <KBtn className="w-[8.2rem]"></KBtn>
            <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
               <div className="flex w-full justify-start pl-1">
                  <IconCommand className="h-[6px] w-[6px]" />
               </div>
               <div className="flex w-full justify-start pl-1">
                  <span className="block">command</span>
               </div>
            </KBtn>
            <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
               <div className="flex w-full justify-start pl-1">
                  <OptionKey className="h-[6px] w-[6px]" />
               </div>
               <div className="flex w-full justify-start pl-1">
                  <span className="block">option</span>
               </div>
            </KBtn>
            <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
               <KBtn className="h-3 w-6">
                  <IconCaretUpFilled className="h-[6px] w-[6px]" />
               </KBtn>
               <div className="flex">
                  <KBtn className="h-3 w-6">
                     <IconCaretLeftFilled className="h-[6px] w-[6px]" />
                  </KBtn>
                  <KBtn className="h-3 w-6">
                     <IconCaretDownFilled className="h-[6px] w-[6px]" />
                  </KBtn>
                  <KBtn className="h-3 w-6">
                     <IconCaretRightFilled className="h-[6px] w-[6px]" />
                  </KBtn>
               </div>
            </div>
         </Row>
      </div>
   )
}
const KBtn = ({ className, children, childrenClassName, backlit = true }) => {
   return (
      <div className={cn("rounded-[4px] p-[0.5px]", backlit && "bg-white/[0.2] shadow-xl shadow-white")}>
         <div
            className={cn("flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]", className)}
            style={{
               boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
            }}>
            <div className={cn("flex w-full flex-col items-center justify-center text-[5px] text-neutral-200", childrenClassName, backlit && "text-white")}>{children}</div>
         </div>
      </div>
   )
}

const Row = ({ children }) => {
   return <div className="mb-[2px] flex w-full flex-shrink-0 gap-[2px]">{children}</div>
}

const SpeakerGrid = () => {
   return (
      <div
         className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
         style={{
            backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
            backgroundSize: "3px 3px",
         }}></div>
   )
}

const OptionKey = ({ className }) => {
   return (
      <svg fill="none" version="1.1" id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
         <rect stroke="currentColor" strokeWidth={2} x="18" y="5" width="10" height="2" />
         <polygon stroke="currentColor" strokeWidth={2} points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 " />
         <rect id="_Transparent_Rectangle_" className="st0" width="32" height="32" stroke="none" />
      </svg>
   )
}

const Logo = () => {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="45" height="45">
         <circle cx="50" cy="50" r="40" fill="yellow" />
         <circle cx="35" cy="40" r="8" fill="black" />
         <circle cx="65" cy="40" r="8" fill="black" />
         <path d="M30,65 Q50,80 70,65" fill="none" stroke="black" strokeWidth="5" />
      </svg>
   )
}

const TypewriterEffect = ({ words, className, cursorClassName }) => {
   // split text inside of words into array of characters
   const wordsArray = words.map((word) => {
      return {
         ...word,
         text: word.text.split(""),
      }
   })

   const [scope, animate] = useAnimate()
   const isInView = useInView(scope)
   useEffect(() => {
      if (isInView) {
         animate(
            "span",
            {
               display: "inline-block",
               opacity: 1,
            },
            {
               duration: 0.3,
               delay: stagger(0.1),
               ease: "easeInOut",
            },
         )
      }
   }, [isInView])

   const renderWords = () => {
      return (
         <motion.div ref={scope} className="inline">
            {wordsArray.map((word, idx) => {
               return (
                  <div key={`word-${idx}`} className="inline-block">
                     {word.text.map((char, index) => (
                        <motion.span initial={{}} key={`char-${index}`} className={cn(`hidden text-black opacity-0 dark:text-white`, word.className)}>
                           {char}
                        </motion.span>
                     ))}
                     &nbsp;
                  </div>
               )
            })}
         </motion.div>
      )
   }
   return (
      <div className={cn("text-center text-base font-bold sm:text-xl md:text-3xl lg:text-5xl", className)}>
         {renderWords()}
         <motion.span
            initial={{
               opacity: 0,
            }}
            animate={{
               opacity: 1,
            }}
            transition={{
               duration: 0.8,
               repeat: Infinity,
               repeatType: "reverse",
            }}
            className={cn("inline-block h-4 w-[4px] rounded-sm bg-blue-500 md:h-6 lg:h-10", cursorClassName)}></motion.span>
      </div>
   )
}

const TypewriterEffectSmooth = ({ words, className, cursorClassName }) => {
   // split text inside of words into array of characters
   const wordsArray = words.map((word) => {
      return {
         ...word,
         text: word.text.split(""),
      }
   })
   const renderWords = () => {
      return (
         <div>
            {wordsArray.map((word, idx) => {
               return (
                  <div key={`word-${idx}`} className="inline-block">
                     {word.text.map((char, index) => (
                        <span key={`char-${index}`} className={cn(`text-black dark:text-white `, word.className)}>
                           {char}
                        </span>
                     ))}
                     &nbsp;
                  </div>
               )
            })}
         </div>
      )
   }

   return (
      <div className={cn("my-6 flex space-x-1", className)}>
         <motion.div
            className="overflow-hidden pb-2"
            initial={{
               width: "0%",
            }}
            whileInView={{
               width: "fit-content",
            }}
            transition={{
               duration: 2,
               ease: "linear",
               delay: 1,
            }}>
            <div
               className="lg:text:3xl  text-xl font-bold xl:text-5xl"
               style={{
                  whiteSpace: "nowrap",
               }}>
               {renderWords()}{" "}
            </div>{" "}
         </motion.div>
         <motion.span
            initial={{
               opacity: 0,
            }}
            animate={{
               opacity: 1,
            }}
            transition={{
               duration: 0.8,

               repeat: Infinity,
               repeatType: "reverse",
            }}
            className={cn("block h-7 w-1  rounded-sm bg-blue-500 xl:h-12", cursorClassName)}></motion.span>
      </div>
   )
}
