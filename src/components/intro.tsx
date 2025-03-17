"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image';
import Background from '../../public/images/2.jpg';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { LineSvg } from './svg-line';
import GridOne from './grid-contents/grid-one';
import GridTwo from './grid-contents/grid-two';
import GridThree from './grid-contents/grid-three';
import { Title } from './title';
import { useTranslations } from 'next-intl';

export default function Intro() {
    const container = useRef(null);
    const [activeItem, setActiveItem] = useState<string>("gridOne")
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end start']

    })
  
    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "130vh"])
    const t = useTranslations("intro")
  
    return (
    <motion.div style={{y}} className='relative h-full mt-0'>
        <div className="px-10 md:pl-20 flex flex-col justify-center items-center w-full">
            <div className="self-end">
                <LineSvg />
            </div>
            <div className="flex flex-col self-start max-w-[600px]">
              <Title title={t('workingWithManara')} />
              <p className='text-lg text-gray-600 dark:text-gray-400'>
                {t('collaboratingWithManara')}
              </p>
            </div>
            <div className="flex self-start gap-1 mt-10 flex-col md:flex-row ">
                <Sidebar setActiveItem={setActiveItem} active={activeItem} />

                {/* Right Content */}
                <div className="flex-1 mx-0 md:mr-20">
                {activeItem == "gridOne" && <GridOne />}
                {activeItem == "gridTwo" && <GridTwo />}
                {activeItem == "gridThree" && <GridThree />}
                </div>
            </div>
        </div>
    </motion.div>
    )
}

const Sidebar = ({ setActiveItem, active } : { setActiveItem :  Dispatch<SetStateAction<string>>, active : string}) => {
  const t = useTranslations('intro')
  return (

    <aside className="mr-20 md:mr-0 p-6 flex flex-col gap-6 pr-20 ">
      <nav className="flex flex-col gap-4">
        <p 
          onClick={() => setActiveItem("gridOne")}
          className={`cursor-pointer flex items-center gap-2 text-xl transition-all group ${active == "gridOne" ? "text-secondary" : "text-gray-500"}`}>
          <span className="group-hover:translate-x-1 transition-transform">↗</span>
          <span className={active == "gridOne" ? "border-l-2 font-bold border-secondary pl-2" : "pl-2"}>{t('team')}</span>
        </p>
        <p 
          onClick={() => setActiveItem("gridTwo")}
          className={`cursor-pointer flex items-center gap-2 text-xl transition-all group ${active == "gridTwo" ? "text-secondary" : "text-gray-500"}`}>
          <span className="group-hover:translate-x-1 transition-transform">↗</span>
          <span className={active == "gridTwo" ? "border-l-2 font-bold border-secondary pl-2" : "pl-2"}>{t('clients')}</span>
        </p>
        <p 
          onClick={() => setActiveItem("gridThree")}
          className={`cursor-pointer flex items-center gap-2 text-xl transition-all group ${active == "gridThree" ? "text-secondary" : "text-gray-500"}`}>
          <span className="group-hover:translate-x-1 transition-transform">↗</span>
          <span className={active == "gridThree" ? "border-l-2 font-bold border-secondary pl-2" : "pl-2"}>{t('ourGoal')}</span>
        </p>
      </nav>
    </aside>
  );
};