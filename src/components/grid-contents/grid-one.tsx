'use client'
import Image from "next/image";
import { WobbleCard } from "../ui/wobbel-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faLocationCrosshairs, faLocationDot, faLocationPin, faLocationPinLock } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";



const GridOne = () => {
  const t = useTranslations('intro')
    return(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-slate-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            {t('oneLocation')}
          </h2>
          <div className="flex gap-3 justify-center items-center text-neutral-200">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="mt-4 text-left text-base/6 ">
              {t('address')}
            </p>
          </div>
        </div>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-earth ">
        <h2 className="max-w-80  text-left  text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          {t('oneTeam')}
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          {t('teamDescription')}
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-primary min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            {t('founderDirector')} <br />
            Dr. ASMA BEN MOUSSA 
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            {t('asmaDescription')}
          </p>
        </div>
      </WobbleCard>
    </div>
    )
}

export default GridOne;