'use client'

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl"
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import FocusCards from "./ui/focuse-card";
import { ProjetType } from "@/lib/types";
import { Title } from "./title";

function LastProjects({ projects }: { projects: ProjetType[] }){
    const t = useTranslations();
    return(
    <div className="projects mt-12 mx-10 md:mx-20 ">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 text-foreground">
        <Title title={t('lastProjects')} />
        <Link href="/projects">
          <InteractiveHoverButton className="shadow-xl">{t('seeMoreProjects')}</InteractiveHoverButton>
        </Link>
      </div>
      <FocusCards cards={projects} />
    </div>
    )
}

export default LastProjects