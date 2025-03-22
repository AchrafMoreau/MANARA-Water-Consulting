import prisma from "@/server/db"

export const GetAllOffers = async() => {
    return prisma.offer.findMany();
}
