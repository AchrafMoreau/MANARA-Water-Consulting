"use server"

// Upload a file from the client side
export async function uploadFileFromClient(file: File) {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    console.log("change-----------------------------")
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

