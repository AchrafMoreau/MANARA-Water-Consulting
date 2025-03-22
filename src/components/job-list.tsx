"use client"

import { format } from "date-fns"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MapPin, Briefcase, Star, ChevronDown, Clock, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MagicCard } from "./magicui/magic-card"
import { useTheme } from "next-themes"
import { InteractiveHoverButton } from "./magicui/interactive-hover-button"
import { useTranslations } from "next-intl"

interface Job {
    id : string
    title: string
    department: string
    location: string
    urgent: boolean
    description: string
    IndeedUrl: string
    employmentType: string
    postedDate: string
    teamSize: string
    translations: {} | undefined
    createdAt: Date
    updatedAt: Date
}

function JobCard({ job }: { job: Job }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme } = useTheme();
  const t = useTranslations('offers')

  return (
    <motion.div whileHover={{ scale: isExpanded ? 1 : 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={`overflow-hidden border ${job.urgent ? "border-primary" : "border-border"}`}>
        <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{job.title}</h3>
                {job.urgent && (
                  <Badge variant="default" className="bg-red-500 hover:bg-red-500 text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    {t('urgent')}
                  </Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1 text-primary/70" />
                  {job.department}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-primary/70" />
                  {job.location}
                </div>
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="text-primary">
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </Button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary/70" />
                      <span className="text-muted-foreground">
                        {t('type_label')} : </span>
                      <span className="ml-1 font-medium">{t(`type.${typeOfEmployment(job.employmentType)}`)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                      <span className="text-muted-foreground">{t('posted_label')}: </span>
                      <span className="ml-1 font-medium">{format(job.createdAt, "MMM d, yyyy")}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">
                        {t('job_description')}
                    </h4>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex justify-end">
            <a href={job.IndeedUrl} target="_blank" rel="noreferrer">
                <InteractiveHoverButton className="hover:text-white rounded-lg">
                    {t('apply_now')}
                </InteractiveHoverButton>
            </a>
        </CardFooter>
        </MagicCard>
      </Card>
    </motion.div>
  )
}

export default function JobListings({ jobs }: { jobs: Job[] }) {

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {jobs.map((job, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <JobCard job={job} />
        </motion.div>
      ))}
    </div>
  )
}


const typeOfEmployment = (type : string) => {
    switch(type){
        case "FULL_TIME":
            return 'full_time';
        case "PART_TIME":
            return 'part_time';
        case "CONTRACT":
            return 'contract';
        case "INTERNSHIP":
            return "internship";
        case "TEMPORARY":
            return 'temporary';
        case "VOLUNTEER":
            return 'volunteer';
        default:
            return 'other'
    }
}