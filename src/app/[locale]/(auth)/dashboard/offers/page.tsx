import OffersTable from "@/components/dashboard/offers/offer-table"
import { CreateOffer } from "@/lib/actions/offer-action"
import prisma from "@/server/db"




async function getOffers(){
    return await prisma.offer.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export default async function ProjectsPage() {
    const offers = await getOffers()
  return (
    <OffersTable offers={offers}/>
  )
}