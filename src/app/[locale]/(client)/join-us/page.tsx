'use client'
import ApplicationForm from "@/components/application-form";
import JobListings from "@/components/job-list";
import { Title } from "@/components/title";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/motion";
import { Award, Briefcase, Users } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
export default function Page(){
  const [jobs, setJobs] = useState()
  const t = useTranslations('joinUs')
  
  useEffect(() => {
    fetch('/api/jobs')
      .then(response => response.json())
      .then(({jobs}) => {
        setJobs(jobs)
      })
  },[])


    return(
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
                        {t("title")}
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
                        {t("description")}
                    </motion.p>
                    </div>
                </motion.div>
                </div>
            </motion.div>
        </section>
        <section
          className="relative   overflow-hidden"
        >
        <div className="container mx-auto">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <Title title={t('features.title')} axAuto={true} titleClass="mx-auto text-center"/>
            <p className="text-muted-foreground text-lg">
              {t('features.description')}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mx-5 md:mx-10">
            {[
              {
                icon: <Briefcase className="h-12 w-12" />,
                title: t('features.projects.title'),
                description: t('features.projects.description')
              },
              {
                icon: <Users className="h-12 w-12" />,
                title: t('features.team.title'),
                description: t('features.team.description')
              },
              {
                icon: <Award className="h-12 w-12" />,
                title: t('features.growth.title'),
                description: t('features.growth.description'),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border border-primary/10 bg-secondary/5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 ease-in-out ">
                  <CardContent className="p-6">
                    <div className="text-primary mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        </section>

      {/* Open Positions Section */}
      <section
        className="relative py-24 md:py-32  overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <Title title={t('possition.title')} axAuto={true} titleClass="mx-auto text-center"/>
            <p className="text-muted-foreground text-lg">
              {t('possition.description')}
            </p>
          </FadeIn>


          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
            <JobListings jobs={jobs} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section
        className="relative pb-12 md:pb-16  overflow-hidden"
      >

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <Title title={t('application.title')} axAuto={true} titleClass="mx-auto text-center"/>
            <p className="text-muted-foreground text-lg">
              {t('application.description')}
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <ApplicationForm jobs={jobs}/>
          </div>
        </div>
      </section>
    </>
    )
}