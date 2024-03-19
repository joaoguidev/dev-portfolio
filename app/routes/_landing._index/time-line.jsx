"use client"
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { cn } from "../../utils/cn"

export function TimeLine() {
   return (
      <TimeLineComponent className="px-6">
         <div className="relative mx-auto max-w-2xl pt-4 antialiased">
            {dummyContent.map((item, index) => (
               <div key={`content-${index}`} className="mb-10">
                  <h2 className="mb-4 w-fit rounded-full bg-black px-4 py-1 text-sm text-white">{item.badge}</h2>

                  <p className="mb-4 text-xl">{item.title}</p>

                  <div className="prose  prose-sm text-sm dark:prose-invert">
                     {/* {item?.image && <image src={item.image} alt="blog thumbnail" height="1000" width="1000" className="mb-10 rounded-lg object-cover" />} */}
                     {item.description}
                  </div>
               </div>
            ))}
         </div>
      </TimeLineComponent>
   )
}

const TimeLineComponent = ({ children, className }) => {
   const ref = useRef(null)
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
   })

   const contentRef = useRef(null)
   const [svgHeight, setSvgHeight] = useState(0)

   useEffect(() => {
      if (contentRef.current) {
         setSvgHeight(contentRef.current.offsetHeight)
      }
   }, [])

   const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
      stiffness: 500,
      damping: 90,
   })
   const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
      stiffness: 500,
      damping: 90,
   })

   return (
      <motion.div ref={ref} className={cn("relative mx-auto h-full w-full max-w-4xl", className)}>
         <div className="absolute -left-4 top-3 md:-left-20">
            <motion.div
               transition={{
                  duration: 0.2,
                  delay: 0.5,
               }}
               animate={{
                  boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
               }}
               className="border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm">
               <motion.div
                  transition={{
                     duration: 0.2,
                     delay: 0.5,
                  }}
                  animate={{
                     backgroundColor: scrollYProgress.get() > 0 ? "white" : "var(--emerald-500)",
                     borderColor: scrollYProgress.get() > 0 ? "white" : "var(--emerald-600)",
                  }}
                  className="h-2 w-2  rounded-full border border-neutral-300 bg-white"
               />
            </motion.div>
            <svg
               viewBox={`0 0 20 ${svgHeight}`}
               width="20"
               height={svgHeight} // Set the SVG height
               className=" ml-4 block"
               aria-hidden="true">
               <motion.path
                  d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
                  fill="none"
                  stroke="#9091A0"
                  strokeOpacity="0.16"
                  transition={{
                     duration: 10,
                  }}></motion.path>
               <motion.path
                  d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="1.25"
                  className="motion-reduce:hidden"
                  transition={{
                     duration: 10,
                  }}></motion.path>
               <defs>
                  <motion.linearGradient
                     id="gradient"
                     gradientUnits="userSpaceOnUse"
                     x1="0"
                     x2="0"
                     y1={y1} // set y1 for gradient
                     y2={y2} // set y2 for gradient
                  >
                     <stop stopColor="#18CCFC" stopOpacity="0"></stop>
                     <stop stopColor="#18CCFC"></stop>
                     <stop offset="0.325" stopColor="#6344F5"></stop>
                     <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
                  </motion.linearGradient>
               </defs>
            </svg>
         </div>
         <div ref={contentRef}>{children}</div>
      </motion.div>
   )
}

const dummyContent = [
   {
     title: "Lorem Ipsum Dolor Sit Amet",
     description: (
       <>
         <p>
           Sit duis est minim proident non nisi velit non consectetur. Esse
           adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
           Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
           incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
           fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
           nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
           occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
           officia sint labore. Tempor consectetur excepteur ut fugiat veniam
           commodo et labore dolore commodo pariatur.
         </p>
         <p>
           Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
           veniam in commodo id reprehenderit adipisicing. Proident duis
           exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
         </p>
         <p>
           Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
           reprehenderit deserunt amet laborum consequat adipisicing officia qui
           irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
           Amet culpa officia aliquip deserunt veniam deserunt officia
           adipisicing aliquip proident officia sunt.
         </p>
       </>
     ),
     badge: "React",
     image:
       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
     title: "Lorem Ipsum Dolor Sit Amet",
     description: (
       <>
         <p>
           Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
           deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
           non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
           sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
           velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
           commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
         </p>
         <p>
           In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
           veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
           reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
           cillum ut mollit.
         </p>
       </>
     ),
     badge: "Changelog",
     image:
       "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
     title: "Lorem Ipsum Dolor Sit Amet",
     description: (
       <>
         <p>
           Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
           deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
           non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
           sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
           velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
           commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
         </p>
       </>
     ),
     badge: "Launch Week",
     image:
       "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
 ];