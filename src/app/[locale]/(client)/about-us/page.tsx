"use client"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TextAnimate } from "@/components/magicui/text-animate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TeamCard from "@/components/ui/team-card";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import MissionVision from "@/components/mission-vision";
import Lenis from "lenis";
import CoreValues from "@/components/core-value";
import { Title } from "@/components/title";
import { useLocale, useTranslations } from "next-intl";

export default function AboutUs(){
    const t = useTranslations("about");
    const ref = useRef<HTMLDivElement>(null)
    const locale = useLocale()
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const team = [
        {
            id: 1,
            name: "Achraf Moreau",
            position: "Web Developer",
            image: "/sir.jpg",
            linkedin: "https://www.linkedin.com/in/achraf-moreau-8684811a1/",
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus expedita eligendi quo illo quibusdam veniam similique nemo accusamus laboriosam molestias in quod."
        },
        {
            id: 2,
            name: "Anass Absa",
            position: "Hydraulic Engineer",
            image: "/sir.jpg",
            linkedin: "https://www.linkedin.com/in/achraf-moreau-8684811a1/",
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus expedita eligendi quo illo quibusdam veniam similique nemo accusamus laboriosam molestias in quod."
        },
        {
            id: 3,
            name: "Jamila Idk",
            position: "Hydraulic Engineer",
            linkedin: "https://www.linkedin.com/in/achraf-moreau-8684811a1/",
            image: "/mam.jpg",
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus expedita eligendi quo illo quibusdam veniam similique nemo accusamus laboriosam molestias in quod."
        },
        {
            id: 4,
            name: "Achraf Moreau",
            position: "Web Developer",
            linkedin: "https://www.linkedin.com/in/achraf-moreau-8684811a1/",
            image: "/sir.jpg",
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus expedita eligendi quo illo quibusdam veniam similique nemo accusamus laboriosam molestias in quod."
        },
        {
            id: 5,
            name: "Anass Absa",
            position: "Hydraulic Engineer",
            image: "/sir.jpg",
            linkedin: "https://www.linkedin.com/in/achraf-moreau-8684811a1/",
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus expedita eligendi quo illo quibusdam veniam similique nemo accusamus laboriosam molestias in quod."
        },
        {
            id: 6,
            name: "Jamila Idk",
            position: "Hydraulic Engineer",
            linkedin: "https://www.linkedin.com/in/achraf-moreau-8684811a1/",
            image: "/mam.jpg",
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus expedita eligendi quo illo quibusdam veniam similique nemo accusamus laboriosam molestias in quod."
        },
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

                    <div className="flex text-white flex-col  header  h-[80vh] justify-end pb-5 items-center rounded-b-[2vw]">
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
           



            <div ref={ref} className="w-full mt-20 flex flex-col  justify-center items-center px-20">
                <div className="flex flex-col justify-center items-center mb-5">
                    <Title title={t('team.title')} axAuto={true} />
                    <p className="w-[90%] text-gray-600 dark:text-gray-400 md:w-[60%] text-center">
                        {t('team.description')}
                    </p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {team.map((elm) => (
                        <CarouselItem key={elm.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <TeamCard member={elm} />
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    {locale == "ar" ? (
                        <>
                            <CarouselNext />
                            <CarouselPrevious />
                        </>
                    ): (
                        <>
                            <CarouselPrevious />
                            <CarouselNext />
                        </>
                    )}
                </Carousel>
            </div>

            <div className="mt-10 w-full"
            >
                <MissionVision />
            </div>
            <div className="mt-10 w-full"
            >
                <CoreValues />
            </div>

        </>
    )
}
