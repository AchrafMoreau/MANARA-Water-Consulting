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
import { useTranslations } from "next-intl"


// Form schema
const projectFormSchema = z.object({
  title: z.string().min(2, {
    message: "fields.title.error",
  }),
  thumbnail: z.string().min(1, {
    message: "fields.thumbnail.error",
  }),
  image: z.array(z.string()).min(1, {
    message: "fields.image.error",
  }),
  client: z.string().min(2, {
    message: "fields.client.error",
  }),
  location: z.string().min(2, {
    message: "fields.location.error",
  }),
  commenced: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({
    required_error: "fields.commencement_date.error",
  })),
  completion: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({
    required_error: "fields.completion_date.error",
  })),
  categoryId: z.string({
    required_error: "fields.category.error",
  }),
  description: z.string().min(10, {
    message: "fields.description.error",
  }),
  solution: z.string().min(10, {
    message: "fields.solution.error",
  }),
  impact: z.string().min(10, {
    message: "fields.impact.error",
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
  const t = useTranslations('dashboard.projects');
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
            toast.success(
              t('form.toast.success.edit.title'), {
                description: t('form.toast.success.edit.description'),
                className: "bg-earth text-white",
                classNames:{toast: "bg-primary"},
                position: "top-center",
            })
        }else{
          await onSubmit(data)
          router.push(onCancelUrl)
          toast.success(t('from.toast.success.create.title'), {
              description: t('form.toast.success.create.description'),
              className: "bg-earth text-white",
              classNames:{toast: "bg-primary"},
              position: "top-center",
          })
        }
    } catch (error) {
      toast.success(t('form.toast.error.title'), {
        description: t('form.toast.error.description'),
        className: "bg-earth text-white",
        classNames:{toast: "bg-primary"},
        position: "top-center",
      })
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
        <CardTitle>{project ? 
          t('form.title.edit') :
          t('form.title.create')
        }</CardTitle>
        <CardDescription>
          {project ? 
            t('form.description.edit') :
            t('form.description.create')
           }
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
                    <FormLabel>
                      {t('form.fields.title.label')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t('form.fields.title.placeholder')} {...field} />
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
                    <FormLabel>
                      {t('form.fields.client.label')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t('form.fields.client.placeholder')} {...field} />
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
                    <FormLabel>
                      {t('form.fields.location.label')}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('form.fields.location.placeholder')}
                         {...field} />
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
                    <FormLabel>
                      {t('form.fields.category.label')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                            placeholder={t('form.fields.category.placeholder')} 
                          />
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
                    <FormLabel>
                      {t('form.fields.commencement_date.label')}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span> {t('form.fields.commencement_date.placeholder')}  </span>}
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
                    <FormLabel>
                      {t('form.fields.completion_date.label')}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>{t('form.fields.completion_date.placeholder')}  </span>}  
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
                  <FormLabel>
                    {t('form.fields.thumbnail.label')}
                  </FormLabel>
                  <FormControl>
                    <FileUpload value={field.value} onChange={field.onChange} onUpload={handleFileUpload} />
                  </FormControl>
                  <FormDescription>
                    {t('form.fields.thumbnail.description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('form.fields.images.label')}
                  </FormLabel>
                  <FormControl>
                    <MultiFileUpload
                      values={field.value}
                      onChange={field.onChange}
                      onUpload={handleFileUpload}
                      maxFiles={10}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('form.fields.images.description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('form.fields.description.label')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('form.fields.description.placeholder')}
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
                  <FormLabel>
                    {t('form.fields.solution.label')}
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('form.fields.solution.placeholder')}
                      className="min-h-[100px]" {...field} />
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
                  <FormLabel>
                    {t('form.fields.impact.label')}
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('form.fields.impact.placeholder')}
                      className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
              {t('form.buttons.cancel')}
            </Button>

            <Button type="submit" className="text-white" disabled={isSubmitting}>

              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {project ? 
                t('form.buttons.submit.edit') :
                t('form.buttons.submit.create')
              }
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

