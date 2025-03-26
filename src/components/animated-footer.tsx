"use client"

import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { CloudRainIcon, DropletIcon, ArrowUpRight, ArrowUpLeft, LeafIcon, MapIcon, WavesIcon } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faMapLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useLocale, useTranslations } from "next-intl"

export default function AnimatedFooter() {
  const t = useTranslations();
  const local = useLocale()
  const navItems = [
    { link:"/services/RessourceEau", title:t("ressourceEau"), description:t("ressourceEauDesc"), icon:<DropletIcon className="h-4 w-4" />, color:"bg-blue-800" },
    { link:"/services/InfrastructuresHydrauliques", title:t("infrastructuresHydrauliques"), description:t("infrastructuresHydrauliquesDesc"), icon:<WavesIcon className="h-4 w-4" />, color:"bg-blue-700" },
    { link:"/services/FormationsSIG", title:t("trainings"), description:t("trainingsDesc"), icon:<MapIcon className="h-4 w-4" />, color:"bg-slate-100", textColor:"text-slate-800" },
    { link:"/services/Environnement", title:t("environnement"), description:t("environnementDesc"), icon:<LeafIcon className="h-4 w-4" /> , color:"bg-green-700"},
    { link:"/services/ChangementsClimatiques", title:t("changementsClimatiques"), description:t("changementsClimatiquesDesc"), icon:<CloudRainIcon className="h-4 w-4" />, color:"bg-green-800" },
  ]
  return (
    <footer className="text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <FadeIn>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Image
                  src="/logo_sm.png"
                  alt="Manara Water Consulting"
                  height={100}
                  width={100}
                />
              </div>
              <p className="text-secondary-foreground/70 mb-6">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">LinkedIn</span>
                  <FontAwesomeIcon icon={faLinkedin} />
                </motion.a>
                <motion.a
                  href="#"
                  className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Twitter</span>
                  <FontAwesomeIcon icon={faTwitter} />
                </motion.a>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-4 col-span-2 hidden md:block ">
              <h3 className="text-xl col-span-2 font-semibold mb-6 border-b w-fit">{t("services")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                <StaggerItem>
                  <Link
                    href="/services"
                    className="flex items-center text-secondary-foreground/70 hover:text-primary transition-colors group"
                  >
                    <span>{t("overview")}</span>
                    {local != 'ar' ? (
                      <ArrowUpRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <ArrowUpLeft className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                </StaggerItem>
                {navItems.map((item, index) => (
                  <StaggerItem key={index}>
                    <Link
                      href={item.link}
                      className="flex items-center text-secondary-foreground/70 hover:text-primary transition-colors group"
                    >
                      <span>
                        {item.title}
                      </span>
                      {local != 'ar' ? (
                        <ArrowUpRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <ArrowUpLeft className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </StaggerItem>
                ))}
              </div>
          </StaggerContainer>


          <FadeIn direction="left">
            <div>
              <h3 className="text-xl border-b w-fit font-semibold mb-6">{t('contact.title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 ">
                  <FontAwesomeIcon icon={faMapLocationDot} />
                  <span className="text-secondary-foreground/70">Centre Affaires Nour 1, Bloc B, Imm. 5, Appt N°3 - Tamesna, Maroc</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faPhone} />
                  <div className="flex flex-col gap-2">
                    <span className="text-secondary-foreground/70">+212-613131063</span>
                    <span>+212 0537401128</span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span className="text-secondary-foreground/70">Benmoussa.asma.2023@gmail.com</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center text-secondary-foreground/50">
          <p>© {new Date().getFullYear()} {" "}
            {t('footer-rights')}
            </p>
        </div>
      </div>
    </footer>
  )
}

