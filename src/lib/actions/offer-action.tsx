"use server"
import prisma from "@/server/db"
import { z } from "zod";
import { ApplicationType } from "../types";

const offerFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  department: z.string().min(2, { message: "Department is required." }),
  location: z.string().min(2, { message: "Location is required." }),
  urgent: z.boolean().default(false),
  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "TEMPORARY",
    "VOLUNTEER",
    "PER_DIEM",
    "OTHER",
  ]),
  IndeedUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
})

export type OfferFormValues = z.infer<typeof offerFormSchema>

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

export async function CreateOffer(data: OfferFormValues){
  const validatedData = offerFormSchema.parse(data)
  try{
    await prisma.offer.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        department: validatedData.department,
        location: validatedData.location,
        urgent: validatedData.urgent,
        employmentType: validatedData.employmentType,
        IndeedUrl: validatedData.IndeedUrl,
        translations: {}
      }
    })
  }catch(error){
    console.error("Error creating offer:", error)
    throw new Error("Failed to create offer. Please try again.")
  }
}

export const UpdateOffer = async(data: OfferFormValues, id: string) => {
  const validatedData = offerFormSchema.parse(data)
  return prisma.offer.update({
      where:{
        id
      },
      data: validatedData
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

export async function applicationDeploy(application: ApplicationType){
  try{
    await prisma.application.create({
      data: application
    })
  }catch(error){
    console.error("Error creating application:", error)
    throw new Error("Failed to create application. Please try again.")
  }
}