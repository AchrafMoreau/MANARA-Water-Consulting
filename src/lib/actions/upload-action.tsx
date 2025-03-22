"use server"
import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"

// Upload a single file to Vercel Blob Storage
export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      throw new Error("No file provided")
    }

    // Generate a unique filename
    const filename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    })

    return { success: true, url: blob.url }
  } catch (error) {
    console.error("Error uploading file:", error)
    return { success: false, error: "Failed to upload file" }
  }
}

// Upload a file from the client side
export async function uploadFileFromClient(file: File) {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Upload failed")
    }

    return data.url
  } catch (error) {
    console.error("Error uploading file:", error)
    throw new Error("Failed to upload file")
  }
}

