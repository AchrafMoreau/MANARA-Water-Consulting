import prisma from "@/server/db"

export const GetAllOffers = async() => {
    return prisma.offer.findMany();
}

export const GetOfferById = async(id: string) => {
    return prisma.offer.findUnique({
        where:{
            id
        }
    })
}


export async function deleteOffer(id: string){
  try{
    await prisma.offer.delete({
      where:{
        id
      }
    })
  }catch(error){
    console.error(`Error Deleting project ${id}:`, error)
    throw new Error("Failed to Deleting project. Please try again.")
  }
}

export async function bulkDeleteOffers(ids: string[]){
  try{
    console.log(`Deleting projects:`, ids)
    await prisma.offer.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }catch(error){
    console.error(`Error Deleting project ${ids.join(',')}:`, error)
    throw new Error("Failed to Deleting project. Please try again.")
  }
}