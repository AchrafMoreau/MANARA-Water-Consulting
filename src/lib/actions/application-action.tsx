'use server'
import prisma from "@/server/db"
import { ApplicationType } from "../types"


export async function ApplicationStatusUpdate(id: string, status: 
  "PENDING" |
  "REVIEWED" |
  "REJECTED" |
  "ACCPTED"
 ){
    console.log("Updating application status:", id, status)
  try{
    await prisma.application.update({
        where: { id },
        data: { status }
    })
  }catch(error){
    console.error("Error creating application:", error)
    throw new Error("Failed to create application. Please try again.")
  }
}

export async function ApplicattionBulkDelete(ids: string[]){
  try{
    await prisma.application.deleteMany({
      where:{
        id: {
          in: ids
        }
      }
    })
  }catch(err){
    console.error("Error Delete application:", err)
    throw new Error("Fiald to Delete application, Please Try Again")
  }
}