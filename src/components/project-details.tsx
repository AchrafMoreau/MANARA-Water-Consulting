"use client"

import * as LucideIcons from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"
import { TracingBeam } from "./ui/tracing-beam"
import Lenis from "lenis"
import type { ProjetType } from "@/lib/types"
import { useLocale, useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react"

export function ProjectDetails({ project }: { project: ProjetType }) {
  const locale = useLocale()
  const Icon = LucideIcons[project.category.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle
  const t = useTranslations("project_page");

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
            <div className="space-y-10">
              <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                <Image src={project.thumbnail} alt={project.client} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <Badge className="bg-gradient-to-r from-secondary to-primary border-none mb-2 text-white text-sm">
                      {t('project')}
                    </Badge>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{project.client}</h1>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-secondary to-primary border-none text-white text-sm">
                      {t('description')}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">{project.description}</div>
                  {project.image[0] && (
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden mt-6">
                      <Image src={project.image[0]} alt="Solution visualization" fill className="object-cover" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Solution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-secondary to-primary border-none  text-white text-sm">
                      {t('solution')}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">{project.solution}</div>
                  {project.image[1] && (
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden mt-6">
                      <Image src={project.image[1]} alt="Solution visualization" fill className="object-cover" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-secondary to-primary border-none text-white text-sm">
                      {t('impact')}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">{project.impact}</div>
                  {project.image[2] && (
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden mt-6">
                      <Image src={project.image[2]} alt="Solution visualization" fill className="object-cover" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
        </div>

        {/* Sidebar - 1/4 width on large screens */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Card className="bg-muted/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {t('project_details')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Client */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      {t('client')}
                    </h3>
                  </div>
                  <p className="text-sm">{project.client}</p>
                  <Separator className="my-2" />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      {t('location')}
                    </h3>
                  </div>
                  <p className="text-sm">{project.location}</p>
                  <Separator className="my-2" />
                </div>

                {/* Key Dates */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      {t('key_dates')}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <span className="text-muted-foreground">{t('started')}:</span>
                    <span>{project.commenced}</span>
                    <span className="text-muted-foreground">{t('completed')}:</span>
                    <span>{project.completion}</span>
                  </div>
                  <Separator className="my-2" />
                </div>

                {/* Expertise */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {t('expertise')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`px-3 py-1 flex items-center gap-1.5 ${project.category.activeColor}`}>
                      <Icon className="h-3.5 w-3.5" />
                      <span>
                        {project.category.translations[locale]
                          ? project.category.translations[locale]
                          : project.category.name}
                      </span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

