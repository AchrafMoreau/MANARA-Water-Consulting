"use client"

import { motion } from "framer-motion"
import { Umbrella, AlertTriangle, Shield, BarChart4, Map, Cloud } from 'lucide-react'
import Image from "next/image"
import ServiceLayout from "@/components/service-layout"
import { Title } from "@/components/title"
import { CTASection } from "@/components/cta-section"
import { Card } from "@/components/ui/focuse-card"
import { MagicCard } from "@/components/magicui/magic-card"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import Lenis from "lenis"
import { useTranslations } from "next-intl"

export default function Protection() {
  const t = useTranslations('Protection');

  const { theme } = useTheme();
  useEffect( () => {
      const lenis = new Lenis()

      function raf(time:any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
  }, [])

  return (
    <ServiceLayout>
      <div className="container mx-auto px-4 py-20">
        {/* Our Approach Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title title={t('our_approach')} axAuto={true} titleClass="mx-auto"/>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('approach.prevention.title'),
                description: t('approach.prevention.description'),
                icon: <AlertTriangle className="h-10 w-10" />,
                delay: 0.1
              },
              {
                title: t('approach.protection.title'),
                description: t('approach.protection.description'),
                icon: <Shield className="h-10 w-10" />,
                delay: 0.3
              },
              {
                title: t('approach.preparation.title'),
                description: t('approach.preparation.description'),
                icon: <Umbrella className="h-10 w-10" />,
                delay: 0.5
              },
            ].map((pillar, index) => (
              <motion.div 
                key={index}
                className="bg-secondary/10 dark:bg-secondary/5 p-6 rounded-lg shadow-sm "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: pillar.delay, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="p-3 bg-background rounded-full inline-flex mb-4 text-blue-500">
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-blue-500">{pillar.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solutions Section */}
        <motion.div 
          className="my-20 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title title={t('solutions')} axAuto={true} titleClass="mx-auto" borderClass="mb-5"/>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-10 md:mx-20">
            {[
              {
                title: t('solutions_list.drainage.title'),
                description: t('solutions_list.drainage.description'),
                image: "/team.jpg",
                features: t.raw('solutions_list.drainage.features'),
                delay: 0.1
              },
              {
                title: t('solutions_list.protection_works.title'),
                description: t('solutions_list.protection_works.description'),
                image: "/team.jpg",
                features: t.raw('solutions_list.protection_works.features'),
                delay: 0.3
              },
              {
                title: t('solutions_list.risk_mapping.title'),
                description: t('solutions_list.risk_mapping.description'),
                image: "/team.jpg",
                features: t.raw('solutions_list.risk_mapping.features'),
                delay: 0.5
              },
              {
                title: t('solutions_list.early_warning.title'),
                description: t('solutions_list.early_warning.description'),
                image: "/team.jpg",
                features: t.raw('solutions_list.early_warning.features'),
                delay: 0.7
              },
            ].map((solution, index) => (
              <motion.div 
                key={index}
                className="rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: solution.delay, duration: 0.5 }}
                viewport={{ once: true }}
              >
                  <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>

                    <div className="h-48 overflow-hidden">
                      <Image
                        src={solution.image || "/placeholder.svg"}
                        alt={solution.title}
                        width={600}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-3 text-zinc-600 dark:text-secondary">{solution.title}</h4>
                      <p className="text-gray-600 mb-4 dark:text-gray-400">{solution.description}</p>
                      <h5 className="font-semibold text-blue-600 mb-2 dark:text-zinc-200">{t('Features')} :</h5>
                      <ul className="space-y-1">
                        {solution.features.map((feature:string, i:number) => (
                          <motion.li 
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + solution.delay + 0.2, duration: 0.3 }}
                            viewport={{ once: true }}
                          >
                            <div className="mr-2 mt-1 text-green-500 flex-shrink-0">
                              <Shield className="h-4 w-4" />
                            </div>
                            <span className="text-gray-700 text-sm dark:text-gray-400">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </MagicCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Case Studies Section */}
        <motion.div 
          className="my-20 p-10 rounded-xl "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title title={t('case_studies.title')} axAuto={true} titleClass="mx-auto" borderClass="mb-5"/>
          
          
          <motion.div 
            className="bg-gradient-to-r from-primary/10 to-earth/5  p-6 rounded-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/team.jpg"
                    alt="Projet de protection contre les inondations"
                    width={300}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-bold mb-2 text-primary dark:text-secondary">
                  {t('case_studies.protection_system_title')}
                </h4>
                <p className="text-gray-800 mb-4 dark:text-gray-400">
                  {t('case_studies.protection_system_description')}
                </p>
                <div className="grid grid-cols-2 gap-4 text-gray-800 dark:text-gray-400">
                  <div>
                    <h5 className="font-semibold mb-1 text-earth">{t('case_studies.protection_system_challenges')} :</h5>
                    <ul className="space-y-1 text-sm">
                      {t.raw('case_studies.challenges').map((challenge: string, index: number) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1 text-earth">
                      {t('case_studies.protection_system_results')} :
                    </h5>
                    <ul className="space-y-1 text-sm">
                      {t.raw('case_studies.results').map((result: string, index: number) => (
                        <li key={index}>{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-b from-primary/10 to-earth/5  p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/team.jpg"
                    alt="Système de drainage urbain durable"
                    width={300}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-bold mb-2 text-primary dark:text-secondary">
                  {t('case_studies.urban_renewal_title')}
                </h4>
                <p className="text-gray-800 mb-4 dark:text-gray-400">
                  {t('case_studies.urban_renewal_description')}
                </p>
                <div className="grid grid-cols-2 gap-4 text-gray-800 dark:text-gray-400">
                  <div>
                    <h5 className="font-semibold mb-1 text-earth">
                      {t('case_studies.urban_renewal_challenges')} :
                    </h5>
                    <ul className="space-y-1 text-sm">
                      {t.raw('case_studies.urban_renewal_challenges_list').map((challenge: string, index: number) => (
                          <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1 text-earth">
                      {t('case_studies.urban_renewal_results')} :
                    </h5>
                    <ul className="space-y-1 text-sm">
                      {t.raw('case_studies.urban_renewal_results_list').map((result: string, index: number) => (
                          <li key={index}>{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <CTASection
          title={t('cta.title')}
          description={t('cta.description')}
          button={t('cta.button')}
          message={t('cta.message')}
        />
      </div>
    </ServiceLayout>
  )
}


