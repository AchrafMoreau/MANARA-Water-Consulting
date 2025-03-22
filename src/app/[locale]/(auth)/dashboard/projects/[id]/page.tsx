import { usePathname } from "@/i18n/navigation"
import prisma from "@/server/db"
import { ProjectDetail } from "@/components/dashboard/projects/project-details"


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
        return <div>Project not found!</div>;
    }
    const project = await getProject(params.id)
    if (!project) {
        return <div>Project not found!</div>;
    }

    return(
        <ProjectDetail project={project} />
    )
}