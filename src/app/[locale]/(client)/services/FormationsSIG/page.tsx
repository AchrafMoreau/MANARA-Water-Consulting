"use client"
import { motion } from "framer-motion"
import { Check, MapPin, MapIcon, PenLine, Users, Award } from 'lucide-react'
import Image from "next/image"
import ServiceLayout from "@/components/service-layout"
import { CTASection } from "@/components/cta-section"
import { Title } from "@/components/title"
import { useEffect } from "react"
import Lenis from "lenis"
import { useTranslations } from "next-intl"

export default function FormationsSIG() {
  const t = useTranslations('FormationsSIG')
  const programs = t.raw("programs");
  return (
    <ServiceLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title title={t('title')} axAuto={true} titleClass="mx-auto text-center"/>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </motion.div>

        {/* Interactive GIS Map Animation */}
        <div className="mb-20 relative h-[500px]  rounded-xl overflow-hidden shadow-lg mx-10 md:mx-20">
            <Image
              src="/formation-gis1.png"
              alt="GIS Map Visualization"
              fill
              className="object-cover"
            />
            {/* Animated map pins */}
        </div>

        {/* Our Training Programs */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title title={t('programs_title')} axAuto={true} titleClass="mx-auto"/>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: programs[0]?.title,
                description: programs[0]?.description,
                icon: <MapIcon className="h-8 w-8" />,
                delay: 0.1
              },
              {
                title: programs[1]?.title,
                description: programs[1]?.description,
                icon: <PenLine className="h-8 w-8" />,
                delay: 0.2
              },
              {
                title: programs[2]?.title,
                description: programs[2]?.description,
                icon: <Users className="h-8 w-8" />,
                delay: 0.3
              },
            ].map((program, index) => (
              <motion.div 
                key={index}
                className="p-6 rounded-lg shadow-sm  bg-secondary/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: program.delay, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="p-3 bg-background rounded-full inline-flex mb-4 text-blue-500">
                  {program.icon}
                </div>
                <h4 className="text-xl font-bold mb-2 text-primary dark:text-secondary/80">{program.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div 
          className="my-20 p-8 rounded-xl "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title title={t('benefits_title')} axAuto={true} titleClass="mx-auto" borderClass="mb-5"/>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            {t.raw('benefits').map((benefit: string, index: number) => (
              <motion.div 
                key={index + benefit}
                className="flex items-start text-xl"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="mr-3 mt-1 text-earth">
                  <Check size={20} />
                </div>
                <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <CTASection
            title={t("cta_title")}
            description={t('cta_description')}
            button={t('cta_button')}
            message={t('cta_message')}
        />
      </div>
    </ServiceLayout>
  )
}

