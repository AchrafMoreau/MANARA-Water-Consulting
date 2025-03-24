"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { X, Upload, ImageIcon, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  value: string | null
  onChange: (url: string) => void
  onUpload?: (file: File) => Promise<string>
  className?: string
  disabled?: boolean
  maxSize?: number // in MB
  accept?: Record<string, string[]>
}

export function FileUpload({
  value,
  onChange,
  onUpload,
  className,
  disabled = false,
  maxSize = 5, // 5MB default
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  },
}: FileUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      if (!onUpload) return

      const file = acceptedFiles[0]
      if (!file) return

      setIsUploading(true)
      setError(null)

      try {
        const url = await onUpload(file)
        onChange(url)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to upload file")
        console.error("Upload error:", err)
      } finally {
        setIsUploading(false)
      }
    },
    [onChange, onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: disabled || isUploading || !onUpload,
    maxSize: maxSize * 1024 * 1024,
    accept,
    multiple: false,
  })

  const removeFile = () => {
    onChange("")
    setError(null)
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative rounded-md border bg-background p-1">
          <div className="flex items-center gap-2">
            <div className="relative h-20 w-20 overflow-hidden rounded-md border">
              <img
                src={value || "/placeholder.svg"}
                alt="Uploaded file"
                className="h-full w-full object-cover"
                onError={() => setError("Failed to load image")}
              />
            </div>
            <div className="flex-1 truncate text-sm w-[140px]">{value.split("/").pop()}</div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={removeFile}
              disabled={disabled || isUploading}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors",
            isDragActive
              ? "border-primary/50 bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5",
            disabled && "cursor-default opacity-60",
            className,
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center gap-1 text-center">
            {isUploading ? (
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            ) : (
              <div className="rounded-full bg-background p-2 text-muted-foreground shadow-sm">
                <Upload className="h-6 w-6" />
              </div>
            )}

            <div className="text-sm font-medium">
              {isUploading ? (
                "Uploading..."
              ) : isDragActive ? (
                "Drop the file here"
              ) : (
                <>
                  Drag & drop or <span className="text-primary">browse</span>
                </>
              )}
            </div>

            <p className="text-xs text-muted-foreground">{`Supports images up to ${maxSize}MB`}</p>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

interface MultiFileUploadProps {
  values: string[]
  onChange: (urls: string[]) => void
  onUpload?: (file: File) => Promise<string>
  className?: string
  disabled?: boolean
  maxSize?: number // in MB
  maxFiles?: number
  accept?: Record<string, string[]>
}

export function MultiFileUpload({
  values,
  onChange,
  onUpload,
  className,
  disabled = false,
  maxSize = 5, // 5MB default
  maxFiles = 10,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  },
}: MultiFileUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      if (!onUpload) return

      if (values.length + acceptedFiles.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files`)
        return
      }

      setIsUploading(true)
      setError(null)

      try {
        const uploadPromises = acceptedFiles.map((file) => onUpload(file))
        const urls = await Promise.all(uploadPromises)
        onChange([...values, ...urls])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to upload files")
        console.error("Upload error:", err)
      } finally {
        setIsUploading(false)
      }
    },
    [onChange, onUpload, values, maxFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: disabled || isUploading || !onUpload || values.length >= maxFiles,
    maxSize: maxSize * 1024 * 1024,
    accept,
    multiple: true,
  })

  const removeFile = (index: number) => {
    const newValues = [...values]
    newValues.splice(index, 1)
    onChange(newValues)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {values.map((url, index) => (
          <div key={index} className="relative rounded-md border bg-background p-1">
            <div className="group relative aspect-video w-full overflow-hidden rounded-md border">
              <img
                src={url || "/placeholder.svg"}
                alt={`Uploaded file ${index + 1}`}
                className="h-full w-full object-cover transition-opacity group-hover:opacity-50"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=100&width=200"
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => removeFile(index)}
                disabled={disabled || isUploading}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          </div>
        ))}

        {values.length < maxFiles && (
          <div
            {...getRootProps()}
            className={cn(
              "flex aspect-video cursor-pointer flex-col items-center justify-center rounded-md border border-dashed transition-colors",
              isDragActive
                ? "border-primary/50 bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5",
              disabled && "cursor-default opacity-60",
              className,
            )}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center gap-1 text-center">
              {isUploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              )}

              <div className="text-xs font-medium">
                {isUploading ? "Uploading..." : isDragActive ? "Drop files here" : "Add images"}
              </div>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <p className="text-xs text-muted-foreground">
        {`${values.length} of ${maxFiles} files • Supports images up to ${maxSize}MB`}
      </p>
    </div>
  )
}

