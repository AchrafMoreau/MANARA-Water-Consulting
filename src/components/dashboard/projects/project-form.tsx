"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, ImagePlus, Loader2, X } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FileUpload, MultiFileUpload } from "@/components/ui/file-upload"
import { uploadFileFromClient } from "@/lib/actions/upload-action"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CategoryType } from "@/lib/types"
import { redirect } from "@/i18n/navigation"


// Form schema
const projectFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  thumbnail: z.string().min(1, {
    message: "Thumbnail is required.",
  }),
  image: z.array(z.string()).min(1, {
    message: "At least one image is required.",
  }),
  client: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  commenced: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({
    required_error: "Commencement date is required.",
  })),
  completion: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({
    required_error: "Completion date is required.",
  })),
  categoryId: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  solution: z.string().min(10, {
    message: "Solution must be at least 10 characters.",
  }),
  impact: z.string().min(10, {
    message: "Impact must be at least 10 characters.",
  }),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>

// Default values for the form
const defaultValues: Partial<ProjectFormValues> = {
  title: "",
  thumbnail: "",
  image: [],
  client: "",
  location: "",
  description: "",
  solution: "",
  impact: "",
}

interface ProjectFormProps {
  project?: ProjectFormValues
  onSubmitAction: (id?: string, formData: FormData) => Promise<void>;
  onCancelUrl: string
  categories: CategoryType[]
}

export function ProjectForm({ project, onSubmit, onCancelUrl, categories }: ProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Initialize form with project data or default values
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project || defaultValues,
  })

  const handleFileUpload = async (file: File) => {
    try {
      return await uploadFileFromClient(file)
    } catch (error) {
      console.error("Error uploading file:", error)
      throw new Error("Failed to upload file")
    }
  }

  // Handle form submission
  const handleSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
        if(project){
            await onSubmit(project.id, data)
            router.push(onCancelUrl)
            toast.success("Project Updated Successfully", {
                description: "Project Updated Successfully",
                className: "bg-earth text-white",
                classNames:{toast: "bg-primary"},
                position: "top-center",
            })
        }else{
          await onSubmit(data)
          router.push(onCancelUrl)
          toast.success("Project created Successfully", {
              description: "Project created Successfully",
              className: "bg-earth text-white",
              classNames:{toast: "bg-primary"},
              position: "top-center",
          })
        }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
      setIsSubmitting(false)
    }
  }

  // Handle cancel button click
  const handleCancel = () => {
    router.push(onCancelUrl)
  }

  return (
    <Card className="w-full">
    <Toaster richColors={true} />
      <CardHeader>
        <CardTitle>{project ? "Edit Project" : "Add New Project"}</CardTitle>
        <CardDescription>
          {project ? "Update the details of your existing project." : "Fill in the details to create a new project."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <Input placeholder="Client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Project location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="commenced"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Commencement Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={new Date(field.value)} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completion"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Completion Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}  
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={new Date(field.value)} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                  )
                }
              />
            </div>

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <FileUpload value={field.value} onChange={field.onChange} onUpload={handleFileUpload} />
                  </FormControl>
                  <FormDescription>Upload a thumbnail image for the project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Images</FormLabel>
                  <FormControl>
                    <MultiFileUpload
                      values={field.value}
                      onChange={field.onChange}
                      onUpload={handleFileUpload}
                      maxFiles={10}
                    />
                  </FormControl>
                  <FormDescription>Upload images showcasing the project. You can add up to 10 images.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the project"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the solution implemented" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="impact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impact</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the impact of the project" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </Button>

            <Button type="submit" className="text-white" disabled={isSubmitting}>

              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {project ? "Update Project" : "Create Project"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

