"use client"
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";
import  { motion }  from "framer-motion"
import { Title } from "./title";
import { useTranslations } from "next-intl";


export default function OurClients() {
    const t = useTranslations()
    const firstRow = [
        {id: 1, src: "/cgem.png", alt: "CGEM"},
        {id: 2, src: "/centrelec.png", alt: "centrelec"},
        {id: 3, src: "/chambre_francaise.png", alt: "Chambre Francaise"},
        {id: 4, src: "/direction_dt.png", alt: "DIRECTION REGIONALE DE L’AGRICULTURE DE DRAA TAFILALT"},
        {id: 5, src: "/bhl.png", alt: "bhl"},
        {id: 6, src: "/bh_go.png", alt: "bassin hydroulique de go"},
        {id: 7, src: "/bh_ml.png", alt: "bassin hydroulique de ml"},
        {id: 8, src: "/learning_it.png", alt: "Learning It Consulting"},
        {id: 9, src: "/rak.png", alt: "rak"},
        {id: 10, src: "/anzar.png", alt: "anzar conseil"},
        {id: 11, src: "/met.png", alt: "DIRECTION PROVINCIALE DE L'EQUIPEMENT DU TRANSPORT DE LA LOGISTIQUE LAAYOUNE"},
        {id: 12, src: "/n2h.png", alt: "N2H ISTITMAR"},
    ]
    return(
    <div className="mx-10 md:mx-20 justify-center items-center flex flex-col my-20">
        <Title title={t('ourpartners')} axAuto={true} />
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((elm) => (
                        <figure
                            key={elm.id}
                            className={cn(
                                "relative h-[150px] w-[150px] cursor-pointer overflow-hidden rounded-xl border p-4",
                                // light styles
                                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                                // dark styles
                                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                            )}
                    >
                        <div className="w-[10px] h-[100px]">
                        <Image
                            src={elm.src}
                            alt={elm.alt}
                            fill
                        />
                        </div>
                    </figure>
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    </div>
    )
}
