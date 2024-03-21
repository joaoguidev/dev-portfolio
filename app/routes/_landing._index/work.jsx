import { Link } from "@remix-run/react"
import { motion } from "framer-motion"
import { useState } from "react"
import SectionHeading from "../../components/SectionHeading"
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
                        <img src={item.imageUrl} alt="a" loading="lazy" className="mx-auto w-full rounded-lg object-cover p-2 "></img>
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

const tecnologies = {
   tailwind: {
      name: "tailwind",
      color: "text-blue-500",
   },
   supabase: {
      name: "supabase",
      color: "text-green-500",
   },
   postgreSQL: {
      name: "PostgreSQL",
      color: "text-gray-300",
   },
   remix: {
      name: "remix",
      color: "text-red-500",
   },
   cloudflarePages: {
      name: "cloudflare-Pages",
      color: "text-amber-500",
   },
   cloudflareWorker: {
      name: "cloudflare-Worker",
      color: "text-orange-500",
   },
   js: {
      name: "js",
      color: "text-yellow-500",
   },
   liquid: {
      name: "liquid",
      color: "text-purple-500",
   },
   shopifyCli: {
      name: "shopify-cli",
      color: "text-emerald-500",
   },
   shopifyWebhooks: {
      name: "shopify-webhooks",
      color: "text-red-700",
   },
   zohoApi: {
      name: "zoho-api",
      color: "text-orange-700",
   },
   zohoCrm: {
      name: "zoho-CRM",
      color: "text-lime-700",
   },
   brevoApi: {
      name: "brevo-api",
      color: "text-green-700",
   },
   onlineStore2: {
      name: "online-store-2.0",
      color: "text-sky-500",
   },
   zod: {
      name: "zod",
      color: "text-lime-500",
   },
   css: {
      name: "css",
      color: "text-red-300",
   },
   sanitizeHtml: {
      name: "sanitize-html",
      color: "text-fuchsia-500",
   },
   framerMotion: {
      name: "framer-motion",
      color: "text-teal-500",
   },
   reactFiber: {
      name: "react-fiber",
      color: "text-cyan-500",
   },
   reactDrei: {
      name: "react-three-drei",
      color: "text-indigo-500",
   },
   threeJs: {
      name: "three-js",
      color: "text-rose-500",
   },
   aFrame: {
      name: "a-frame",
      color: "text-pink-500",
   },
   googleAnalitics: {
      name: "google-analitics",
      color: "text-yellow-700",
   },
   googleSearchConsole: {
      name: "google-search-console",
      color: "text-blue-500",
   },
   googleWorkspace: {
      name: "google-workspace",
      color: "text-sky-700",
   },
   semrush: {
      name: "SEMrush",
      color: "text-purple-700",
   },
   aceternity: {
      name: "aceternity-ui",
      color: "text-emerald-700",
   },
   netlify: {
      name: "netlify",
      color: "text-sky-300",
   },
}

const work = [
   {
      title: "Portfolio",
      imageUrl: "/images/project-portfolio.png",
      repository: { url: "https://github.com/joaoguidev/dev-portfolio", title: "Github" },
      live: { url: "https://joaodev.work", title: "Live Site" },
      description:
         "This portfolio showcases a visually stunning web application that seamlessly integrates backend functionalities with frontend experiences, offering dynamic animations and immersive 3D elements. With robust data management and secure validation, it ensures both performance and user safety. Additionally, Cloudflare Pages ensures reliable hosting for a seamless user experience.",
      tecnologies: [tecnologies.remix, tecnologies.supabase, tecnologies.postgreSQL, tecnologies.tailwind, tecnologies.cloudflarePages, tecnologies.zod, tecnologies.sanitizeHtml, tecnologies.framerMotion, tecnologies.reactFiber, tecnologies.reactDrei, tecnologies.threeJs, tecnologies.aceternity, tecnologies.brevoApi],
   },
   {
      title: "Maple Road Consulting",
      imageUrl: "/images/project-maple-road.png",
      repository: { url: "", title: "" },
      live: { url: "https://maple-road.ca/pages/pricing", title: "Live Site" },
      description:
         "I developed an e-commerce solution integrating various APIs and platforms to enhance functionality and user experience. I built a Shopify online store with customized features, including automated CRM integration and SEO optimization. Shopify webhooks facilitated seamless communication between platforms, while Brevo API integration enhanced payment processing efficiency. Additionally, Google Workspace integration streamlined internal operations.",
      tecnologies: [
         tecnologies.liquid,
         tecnologies.js,
         tecnologies.shopifyCli,
         tecnologies.onlineStore2,
         tecnologies.shopifyWebhooks,
         tecnologies.zohoCrm,
         tecnologies.zohoApi,
         tecnologies.brevoApi,
         tecnologies.googleAnalitics,
         tecnologies.googleSearchConsole,
         tecnologies.googleWorkspace,
         tecnologies.semrush,
      ],
   },
   {
      title: "Mobile Augmented Reality (AR)",
      imageUrl: "/images/project-ar-mobile.png",
      repository: { url: "https://github.com/joaoguidev/AR_Game---Project-Management", title: "Github" },
      live: { url: "https://ar-project-management.netlify.app/", title: "Live Site (Use Mobile)" },
      description: "Built using A-Frame and hosted on Netlify. Explore a dynamic world where reality blends with digital elements. Don't hesitate to look around in 360 degrees and engage with the mobile interface for an interactive journey.",
      tecnologies: [tecnologies.aFrame, tecnologies.css, tecnologies.js, tecnologies.netlify],
   },
]
