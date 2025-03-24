import { usePathname } from "@/i18n/navigation"
import prisma from "@/server/db"
import { ProjectDetail } from "@/components/dashboard/projects/project-details"
import { notFound } from "next/navigation"


async function getProject(id : string) {
    return await prisma.project.findUnique({
        where: {
            id
        },
        include: {
            category: true
        }
    })
}

type Props = {
    params: {
        locale: string;
        id: string;
    };
}
export default async function Project({ params }: Props) {
    if (!params.id) {
        notFound()
    }
    const project = await getProject(params.id)
    if (!project) {
        notFound()
    }

    return(
        <ProjectDetail project={project} />
    )
}