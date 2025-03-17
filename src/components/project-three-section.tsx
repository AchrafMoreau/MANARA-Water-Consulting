"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/motion"
import { Title } from "@/components/title"
import { Droplet, Leaf, PackageIcon as PipelineIcon, Waves, Lightbulb, GraduationCap, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

const ThreeSections = () => {
    const t = useTranslations("Projects")
    const c = useTranslations("Categories")
    //  const categories = [
    //     {
    //     icon: <Droplet className="h-10 w-10 text-blue-600" />,
    //     title: "Gestion des Ressources en Eau",
    //     description: "Études des nappes phréatiques et préservation des ressources en eau",
    //     href: "/projets/ressources-eau",
    //     color: "bg-blue-50 dark:bg-blue-950/30",
    //     iconColor: "text-blue-600 dark:text-blue-400",
    //     },
    //     {
    //     icon: <Leaf className="h-10 w-10 text-green-600" />,
    //     title: "Développement Durable & Environnement",
    //     description: "Solutions de réutilisation des eaux usées et protection contre la pollution",
    //     href: "/projets/developpement-durable",
    //     color: "bg-green-50 dark:bg-green-950/30",
    //     iconColor: "text-green-600 dark:text-green-400",
    //     },
    //     {
    //     icon: <PipelineIcon className="h-10 w-10 text-gray-600" />,
    //     title: "Infrastructures Hydrauliques & Assainissement",
    //     description: "Conception de systèmes d'assainissement et optimisation des réseaux",
    //     href: "/projets/infrastructures",
    //     color: "bg-gray-50 dark:bg-gray-800/30",
    //     iconColor: "text-gray-600 dark:text-gray-400",
    //     },
    //     {
    //     icon: <Waves className="h-10 w-10 text-blue-500" />,
    //     title: "Protection Contre les Inondations",
    //     description: "Modélisation hydraulique et conception d'infrastructures de drainage",
    //     href: "/projets/protection-inondations",
    //     color: "bg-blue-50 dark:bg-blue-950/30",
    //     iconColor: "text-blue-500 dark:text-blue-300",
    //     },
    //     {
    //     icon: <Lightbulb className="h-10 w-10 text-yellow-500" />,
    //     title: "Innovation & Technologies de l'Eau",
    //     description: "Cartographie SIG et gestion intelligente de l'eau",
    //     href: "/projets/innovation",
    //     color: "bg-yellow-50 dark:bg-yellow-950/30",
    //     iconColor: "text-yellow-500 dark:text-yellow-300",
    //     },
    //     {
    //     icon: <GraduationCap className="h-10 w-10 text-purple-600" />,
    //     title: "Études et Formations Spécialisées",
    //     description: "Formations en SIG et études de faisabilité des projets hydrauliques",
    //     href: "/projets/etudes-formations",
    //     color: "bg-purple-50 dark:bg-purple-950/30",
    //     iconColor: "text-purple-600 dark:text-purple-400",
    //     },
    // ]
    const categories = [
        { key: "water_management", icon: <Droplet className="h-10 w-10 text-blue-600" />, color: "bg-blue-50 dark:bg-blue-950/30", iconColor: "text-blue-600 dark:text-blue-400" },
        { key: "sustainable_development", icon: <Leaf className="h-10 w-10 text-green-600" />, color: "bg-green-50 dark:bg-green-950/30", iconColor: "text-green-600 dark:text-green-400" },
        { key: "hydraulic_infrastructure", icon: <PipelineIcon className="h-10 w-10 text-gray-600" />, color: "bg-gray-50 dark:bg-gray-800/30", iconColor: "text-gray-600 dark:text-gray-400" },
        { key: "flood_protection", icon: <Waves className="h-10 w-10 text-blue-500" />, color: "bg-blue-50 dark:bg-blue-950/30", iconColor: "text-blue-500 dark:text-blue-300" },
        { key: "innovation", icon: <Lightbulb className="h-10 w-10 text-yellow-500" />, color: "bg-yellow-50 dark:bg-yellow-950/30", iconColor: "text-yellow-500 dark:text-yellow-300" },
        { key: "studies_training", icon: <GraduationCap className="h-10 w-10 text-purple-600" />, color: "bg-purple-50 dark:bg-purple-950/30", iconColor: "text-purple-600 dark:text-purple-400" }
    ]

    return (
        <>
            <section className="min-h-screen">
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
                        className="text-4xl font-bold text-white mb-4 md:text-6xl lg:text-7xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {t('title')}
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
                        {t('description')}
                    </motion.p>
                    </div>
                </motion.div>
                </div>
            </motion.div>
            </section>

            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                <FadeIn className="text-center max-w-3xl mx-auto mb-16">
                    <Title title={t('expertise_title')} axAuto={true} titleClass="mx-auto text-center"/>
                    <p className="text-muted-foreground text-lg">
                        {t('expertise_description')}
                    </p>
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                    <FadeIn key={index} delay={index * 0.1} className="h-full">
                        <motion.div
                            className={`${category.color} rounded-xl p-8 h-full border border-border hover-lift`}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-4">
                            <motion.div
                                transition={{ duration: 0.5 }}
                                className={category.iconColor}
                            >
                                {category.icon}
                            </motion.div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {c(`${category.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground mb-4">{c(`${category.key}.description`)}</p>
                        </motion.div>
                    </FadeIn>
                    ))}
                </div>
                </div>
            </section>
        </>
    )
}

export default ThreeSections;