"use server"
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

// Upload a file from the client side
export async function uploadFileFromClient(file: File) {
  try {
    try {
      if (!file) {
        return NextResponse.json(
          { success: false, error: "No file provided" },
          { status: 400 }
        );
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, error: "Only image files are allowed" },
          { status: 400 }
        );
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "File size exceeds 5MB limit" },
          { status: 400 }
        );
      }

      const filename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

      const blob = await put(filename, file, {
        access: "public",
        addRandomSuffix: false,
      });

      return blob.url
    } catch (error) {
      console.error("Error uploading file:", error);
      return NextResponse.json(
        { success: false, error: "Failed to upload file" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    throw new Error("Failed to upload file")
  }
}


export async function uploadResumeFromClient(file: File) {
  try {
    try {
      if (!file) {
        return NextResponse.json(
          { success: false, error: "No file provided" },
          { status: 400 }
        );
      }

      const filename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

      const blob = await put(filename, file, {
        access: "public",
        addRandomSuffix: false,
      });

      return blob.url
    } catch (error) {
      console.error("Error uploading file:", error);
      return NextResponse.json(
        { success: false, error: "Failed to upload file" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    throw new Error("Failed to upload file")
  }
}

