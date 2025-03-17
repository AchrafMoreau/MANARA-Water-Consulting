'use client'
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function Section() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const t = useTranslations("global_vision");
    const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

    return (
        <div
            ref={container} 
            className='relative flex items-center justify-center h-[80vh] overflow-hidden'
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
        <div className='fixed top-[-10vh] left-0 h-[130vh] w-full'>
            <motion.div style={{y}} className='relative w-full h-full'>
                <video  
                    className="absolute inset-0 w-full h-full object-cover"
                    preload="none"
                    autoPlay
                    loop
                    muted
                >
                    <source src="/global.mp4" type="video/mp4" />
                    <track
                        src="/global.mp4"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                    />
                    {t('videoUnssuported')}
                </video>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6 bg-black/50">
                    <div className="flex flex-col justify-center items-start">
                        <motion.h1
                            className="text-4xl font-bold mx-auto text-white mb-4 md:text-6xl lg:text-7xl"
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
                            {t('content')}
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </div>
        </div>
    )
}
//<Image src="/water_consulting.jpg" fill alt="image" style={{objectFit: "cover"}}/>