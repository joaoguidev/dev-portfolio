//SECTION - HERO
//ANCHOR - hero h1
export const heroH1 = "Hello, my name is João Dantas"
//ANCHOR - Text to be shown in the typewriter effect in the hero
export const typewriterWords = [
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
      text: "users",
   },
   {
      text: "and",
   },
   {
      text: "technology.",
      className: "text-blue-500 dark:text-blue-500",
   },
]
//!SECTION

//SECTION - INTRODUCTION
//ANCHOR - Text to be used on the SectionHeading
export const introductionSectionHeading = {
   heading: "Overview.",
   subheading: "Introduction.",
   paragraph:
      "I am a versatile full-stack web developer specializing in modern web technologies such as Tailwind CSS for styling, Remix for building web applications, and Supabase for backend services and database management. Additionally, I excel in utilizing Cloudflare Workers and Cloudflare Pages for serverless computing and static site hosting, along with expertise in setting up security measures. My proficiency extends to integrating payment gateways like Stripe and Shopify. With this diverse skill set, I can create robust, secure, and scalable web applications tailored to various needs.",
}

//ANCHOR - Text to be used on the in the card
export const introductionCard = {
   title: "Joao Dantas",
   paragraph:
      "Transitioning from a career as a financial analyst, I embarked on a new chapter in computer studies, leaving behind the bustling finance world for the innovative realm of technology. Hailing from Brazil, I chose Langara as my gateway to this exciting field, where I eagerly absorbed new knowledge and honed my skills. Through dedication and perseverance, I transformed into a proficient computer studies professional, equipped to thrive in the ever-evolving landscape of technology.",
}

//ANCHOR - My profile links
export const mylinks = {
   github: "https://github.com",
   linkedin: "https://www.linkedin.com/in/jgdantas",
}

//!SECTION

//SECTION - WORK
//ANCHOR - Tecnologies iand its own color to be used in the work card
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
//ANCHOR - Work card content
export const work = [
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

//!SECTION
