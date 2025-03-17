"use client"
import { motion } from "framer-motion"
import { WavesIcon, DropletIcon, BarChartIcon as ChartIcon, BarChart, LineChart, Scale } from 'lucide-react'
import Image from "next/image"
import ServiceLayout from "@/components/service-layout"
import { useEffect, useState } from "react"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { CTASection } from "@/components/cta-section"
import Lenis from "lenis"
import { Title } from "@/components/title"
import { useTranslations } from "next-intl"

export default function EtudeDesNappes() {
  const [activeTab, setActiveTab] = useState("aquifers")
  const t = useTranslations('EtudeDesNappes')
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
      <div className="container mx-auto px-4 py-20 text-primary">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title title={t('title')} axAuto={true}/>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </motion.div>


        {/* Methodology Section */}
        <motion.div 
          className="my-20 p-8 rounded-xl bg-primary text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            {t('methodology.title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { 
                title: t('methodology.steps.evaluation.title'), 
                description: t('methodology.steps.evaluation.description'),
                icon: <Scale className="h-8 w-8" />
              },
              { 
                title: t('methodology.steps.investigation.title'), 
                description: t('methodology.steps.investigation.description'),
                icon: <DropletIcon className="h-8 w-8" />
              },
              { 
                title: t('methodology.steps.analysis.title'), 
                description: t('methodology.steps.analysis.description'),
                icon: <BarChart className="h-8 w-8" />
              },
              { 
                title: t('methodology.steps.recommendations.title'), 
                description: t('methodology.steps.recommendations.description'),
                icon: <LineChart className="h-8 w-8" />
              },
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="relative p-6 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                <div className="absolute -top-4 -left-4 p-3 bg-blue-500 rounded-full">
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold mb-2 mt-2">{step.title}</h4>
                <p className="text-blue-100">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Tabs */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center mb-8 border-b">
            {[
              { id: "aquifers", label: t('services.aquifers.label'), icon: <DropletIcon className="mr-2 h-5 w-5" /> },
              { id: "rivers", label: t('services.rivers.label'), icon: <WavesIcon className="mr-2 h-5 w-5" /> },
              { id: "monitoring", label: t('services.monitoring.label'), icon: <BarChart className="mr-2 h-5 w-5" /> },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex items-center px-6 py-3 font-medium ${
                  activeTab === tab.id 
                    ? "text-primary dark:text-secondary border-b-2 dark:border-secondary border-primary" 
                    : "text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>
          
          <div className="p-4">
            {activeTab === "aquifers" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h4 className="text-2xl font-bold mb-4 dark:text-primary/1">
                    {t('services.aquifers.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('services.aquifers.description')}
                  </p>
                  <ul className="space-y-2 ">
                    {t.raw('services.aquifers.points').map((item:string, index:number) => (
                      <motion.li 
                        key={index + item}
                        className="flex items-start dark:text-primary/1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <div className="mr-3 mt-1 text-blue-500 ">
                          <DropletIcon size={16} />
                        </div>
                        <p>{item}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src="/team.jpg"
                    alt="Nappes phréatiques"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </motion.div>
              </motion.div>
            )}

            {activeTab === "rivers" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h4 className="text-2xl font-bold mb-4 ">
                    {t('services.rivers.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('services.rivers.description')}
                  </p>
                  <ul className="space-y-2">
                    {t.raw('services.rivers.points').map((item:string, index:number) => (
                      <motion.li 
                        key={index + item}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <div className="mr-3 mt-1 text-blue-500">
                          <WavesIcon size={16} />
                        </div>
                        <p>{item}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src="/team.jpg"
                    alt="Cours d'eau"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </motion.div>
              </motion.div>
            )}

            {activeTab === "monitoring" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h4 className="text-2xl font-bold mb-4">
                    {t('services.monitoring.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('services.monitoring.description')}
                  </p>
                  <ul className="space-y-2">
                    {t.raw('services.monitoring.points').map((item:string, index:number) => (
                      <motion.li 
                        key={index + item}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <div className="mr-3 mt-1 text-blue-500">
                          <LineChart size={16} />
                        </div>
                        <p>{item}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src="/team.jpg"
                    alt="Surveillance et analyse"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
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
