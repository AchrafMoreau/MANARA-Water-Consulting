import ApplicationsTable from "@/components/dashboard/application/application-table"
import OffersTable from "@/components/dashboard/offers/offer-table"
import { CreateOffer } from "@/lib/actions/offer-action"
import prisma from "@/server/db"




async function getApplications(){
    return await prisma.application.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export default async function Page() {
    const app = await getApplications()
    return app && (
        <ApplicationsTable applications={app} />
    )
}