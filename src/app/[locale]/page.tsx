import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { TextAnimate } from "@/components/magicui/text-animate";
import FocusCards from "@/components/ui/focuse-card";
import Intro from "@/components/intro";
import Section from "@/components/sections";
import Contact from "@/components/contact";
import  OurClients  from "@/components/clinets";
import prisma from "@/server/db";
import { Title } from "@/components/title";
import { LinkPreview } from "@/components/ui/link-preview";
import Mission from "@/components/mission";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import LilCard from "@/components/hero";
import HeroSection from "@/components/hero";
import LastProjects from "@/components/last-projects";


const getLastProject = async () => {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc', 
    },
    include:{
      category: true
    },
    take: 3,
  });
}


export default async function Home() {
  const projects = await getLastProject();
  console.log(projects)

  return (
    <>
    <div className="flex text-white flex-col hero pl-10 h-[90vh] justify-center items-start rounded-b-[2vw]">
      <HeroSection />
    </div>

    <OurClients />

    <LastProjects projects={projects} />
    <Mission />
    <div className="">
      <Intro />
      <div className='h-screen'></div>
      <Section />
      <Contact />
    </div>
    </>
  );
}

