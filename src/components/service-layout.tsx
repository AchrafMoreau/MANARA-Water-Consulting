"use client"

import { motion } from "framer-motion"
import { usePathname } from "@/i18n/navigation"
import { ReactNode } from "react"
import Contact from "./contact"
import { useTranslations } from "next-intl"

interface ServiceLayoutProps {
  children: ReactNode
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  const pathname = usePathname()
  
  return (
   <div className="min-h-screen">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >

        <div className="flex text-white flex-col header h-[80vh] justify-end pb-5 items-center rounded-b-[2vw]"
        >
          <motion.div
            className="relative z-10 flex items-center justify-center mb-10 md:mb-20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="container px-4 mx-auto text-center">
              <motion.h1
                className="text-4xl font-bold text-white mb-4 md:text-6xl lg:text-7xl mx-auto capitalize"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {getPageTitle(pathname)}
              </motion.h1>
              <motion.div
                className="w-20 h-1 bg-blue-400 mx-auto mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
              <motion.p
                className="text-lg text-blue-100 max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {getPageDescription(pathname)}
              </motion.p>
            </div>
          </motion.div>
        </div>
        {children}

        {/* Footer with water droplet animation */}
        <Contact />
      </motion.div>
    </div>
  )
}

function getPageTitle(pathname: string) {
  const t = useTranslations();
  switch (pathname) {
    case "/services":
      return t("servicesLayout.title");
    case "/services/FormationsSIG":
      return t("trainings");
    case "/services/RessourceEau":
      return t("ressourceEau");
    case "/services/InfrastructuresHydrauliques":
      return t("infrastructuresHydrauliques");
    case "/services/Environnement":
      return t("environnement");
    case "/services/ChangementsClimatiques":
      return t("changementsClimatiques");
    default:
      return t("servicesLayout.title");
  }
}

function getPageDescription(pathname: string) {
  const t = useTranslations();
  switch (pathname) {
    case "/services":
      return t("servicesLayout.description");
    case "/services/FormationsSIG":
      return t("trainingsDesc");
    case "/services/RessourceEau":
      return t("ressourceEauDesc");
    case "/services/InfrastructuresHydrauliques":
      return t("infrastructuresHydrauliquesDesc");
    case "/services/Environnement":
      return t("environnementDesc");
    case "/services/ChangementsClimatiques":
      return t("changementsClimatiquesDesc");
    default:
      return t("servicesLayout.description");
  }
}

