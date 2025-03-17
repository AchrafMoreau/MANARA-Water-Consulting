'use client'

import { Link } from "@/i18n/navigation"
import { TextAnimate } from "./magicui/text-animate"
import { InteractiveHoverButton } from "./magicui/interactive-hover-button"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"

function HeroSection(){

  const t = useTranslations('');
  return(
    <>
      <TextAnimate className="text ml-10 text-7xl text-wrap leading-none" animation="blurInUp" by="word" once as="h1">
        {t('manara')}
      </TextAnimate>
      <TextAnimate className="text ml-10 text-7xl text-wrap leading-none" animation="blurInUp" by="word" once as="h1">
        {t('water_consulting')}
      </TextAnimate>
      <div className="mt-4 ml-10">
        <Link href="/services">
          <InteractiveHoverButton className="shadow-xl text-black dark:text-white">{t('hero.discoverSolution')}</InteractiveHoverButton>
        </Link>
      </div>
      <div className="hidden shadow-xl w-[400px] p-10 md:flex flex-col note rounded-t-[2vw]">
        <h5>{t('hero.needExpertise')}</h5>
        <p className="leading-[1.3rem] py-3 text-lg">
          {t('hero.expertSupport')}
        </p>
        <Link href="/contact-us">
          <Button variant="link" className="p-0 text-white self-start text-md">{t('hero.seeMore')}</Button>
        </Link>
      </div>
    </>
  )
}

export default HeroSection