"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import prisma from "@/server/db"

// Define the schema for project data
const projectSchema = z.object({
  title: z.string().min(2),
  thumbnail: z.string().min(1),
  image: z.array(z.string()).min(1),
  client: z.string().min(2),
  location: z.string().min(2),
  commenced: z.date(),
  completion: z.date(),
  categoryId: z.string(),
  description: z.string().min(10),
  solution: z.string().min(10),
  impact: z.string().min(10),
})

export type ProjectFormValues = z.infer<typeof projectSchema>

export async function createProject(formData: ProjectFormValues) {
  // Validate the form data
  const validatedData = projectSchema.parse(formData)

  try {
    // In a real app, you would save the data to your database
    await prisma.project.create({
      data:{
        title: validatedData.title,
        thumbnail: validatedData.thumbnail,
        image: validatedData.image,
        client: validatedData.client,
        location: validatedData.location,
        completion: validatedData.completion.toISOString(),
        commenced : validatedData.commenced.toISOString(),
        categoryId: validatedData.categoryId,
        description: validatedData.description,
        solution: validatedData.solution,
        impact: validatedData.impact,
        translations: {}
      }
    })
  } catch (error) {
    console.error("Error creating project:", error)
    throw new Error("Failed to create project. Please try again.")
  }
}

export async function updateProject(id: string, formData: ProjectFormValues) {
  const validatedData = projectSchema.parse(formData)

  try {
    console.log(`Updating project ${id}:`, validatedData)

    await prisma.project.update({
      where: {
        id: id
      },
      data:{
        title: validatedData.title,
        thumbnail: validatedData.thumbnail,
        image: validatedData.image,
        client: validatedData.client,
        location: validatedData.location,
        completion: validatedData.completion.toISOString(),
        commenced : validatedData.commenced.toISOString(),
        categoryId: validatedData.categoryId,
        description: validatedData.description,
        solution: validatedData.solution,
        impact: validatedData.impact,
        translations: {}
      }
    })
  } catch (error) {
    console.error(`Error updating project ${id}:`, error)
    throw new Error("Failed to update project. Please try again.")
  }
}

export async function deleteProject(id: string){
  try{
    await prisma.project.delete({
      where:{
        id
      }
    })
  }catch(error){
    console.error(`Error Deleting project ${id}:`, error)
    throw new Error("Failed to Deleting project. Please try again.")
  }
}

export async function getProjectById(id : string){
    return await prisma.project.findUnique({
        where:{
            id:id
        },
        include:{
            category: true
        }
    })
}

export async function getAllCategories(){
    return await prisma.category.findMany()
}