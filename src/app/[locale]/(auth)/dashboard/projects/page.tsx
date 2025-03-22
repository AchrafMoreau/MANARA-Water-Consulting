import ProjectsTable from "@/components/dashboard/projects/project-table"
import prisma from "@/server/db"


async function getCategories(){
    return await prisma.category.findMany()
}


async function getProjects(){
    return await prisma.project.findMany({
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export default async function ProjectsPage() {
    const projects = await getProjects()
    const categories = await getCategories()
  return (
    <ProjectsTable categories={categories} projects={projects} />
  )
}