"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Title } from "./title"
import { useTranslations } from "next-intl"

export default function MissionVision() {
  const t = useTranslations("mission_vision")
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <section ref={ref} className="py-24 px-10 md:px-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <motion.div className="flex flex-col justify-center items-center container mx-auto px-4" style={{ opacity, y, scale }}>
        <Title title={t('title')} axAuto={true} borderClass="mb-5"/>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-primary">{t('mission.title')}</h3>
            <p className="text-slate-700 leading-relaxed">
              {t('mission.description')}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-earth">{t('vision.title')}</h3>
            <p className="text-slate-700 leading-relaxed">
              {t('vision.description')}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

