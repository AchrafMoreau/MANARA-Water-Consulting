"use client"
import * as LucideIcons from "lucide-react";
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Calendar, Edit, MapPin, User } from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjetType } from "@/lib/types"
import { useLocale } from "next-intl";


interface ProjectDetailProps {
  project: ProjetType
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  // In a real app, you would fetch the project data based on the projectId
    const Icon = LucideIcons[project.category.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
    const locale = useLocale()
  // For this demo, we're using the mock data

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
            <Link href={`/dashboard/projects/`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
            </Link>
        </div>

        <div className="mt-4">
          <CardTitle className="text-2xl">{project.title}</CardTitle>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{project.client}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {format(project.commenced, "MMM yyyy")} - {format(project.completion, "MMM yyyy")}
              </span>
            </div>
              <Badge
                className={`px-4 rounded-full  font-medium border transition-colors flex items-center gap-2 ${project.category.activeColor} `}
              >
                <Icon className="h-4 w-4" />
                {project.category.translations[locale] ? project.category?.translations[locale] : project.category.name}
              </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {project.image.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg border">
              <img
                src={image || "/placeholder.svg"}
                alt={`${project.title} - Image ${index + 1}`}
                className="h-48 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>

        <Tabs defaultValue="description">
          <TabsList className="mb-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-0">
            <h3 className="mb-2 text-lg font-medium">Project Description</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </TabsContent>

          <TabsContent value="solution" className="mt-0">
            <h3 className="mb-2 text-lg font-medium">Our Solution</h3>
            <p className="text-muted-foreground">{project.solution}</p>
          </TabsContent>

          <TabsContent value="impact" className="mt-0">
            <h3 className="mb-2 text-lg font-medium">Project Impact</h3>
            <p className="text-muted-foreground">{project.impact}</p>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex flex-col items-start border-t pt-6">
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <h4 className="text-sm font-medium">Client</h4>
            <p className="text-sm text-muted-foreground">{project.client}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Location</h4>
            <p className="text-sm text-muted-foreground">{project.location}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Started</h4>
            <p className="text-sm text-muted-foreground">{format(project.commenced, "MMMM d, yyyy")}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Completed</h4>
            <p className="text-sm text-muted-foreground">{format(project.completion, "MMMM d, yyyy")}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-muted-foreground">Last updated: {format(project.updatedAt, "MMMM d, yyyy")}</p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/projects">View All Projects</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

