"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "next-intl"

// Define the employment types based on the schema
const employmentTypes = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "VOLUNTEER", label: "Volunteer" },
  { value: "PER_DIEM", label: "Per Diem" },
  { value: "OTHER", label: "Other" },
]

// Define the form schema using Zod
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
  IndeedUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
})

type OfferFormValues = z.infer<typeof offerFormSchema>

// Define the props for the component
interface OfferFormProps {
  offer?: {
    id: string
    title: string
    description: string
    department: string
    location: string
    urgent: boolean
    employmentType: string
    IndeedUrl: string
    translations: any
    createdAt: Date
    updatedAt: Date
  }
  isEditing?: boolean
}

export default function OfferForm({ offer, isEditing = false }: OfferFormProps) {
  const t = useTranslations("dashboard.offers")
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Set default values for the form
  const defaultValues: Partial<OfferFormValues> = {
    title: offer?.title || "",
    description: offer?.description || "",
    department: offer?.department || "",
    location: offer?.location || "",
    urgent: offer?.urgent || false,
    employmentType: (offer?.employmentType as any) || "FULL_TIME",
    IndeedUrl: offer?.IndeedUrl || "",
  }

  // Initialize the form
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues,
  })

  // Handle form submission
  const onSubmit = async (data: OfferFormValues) => {
    setIsSubmitting(true)
    try {
      // Create the API endpoint based on whether we're editing or creating
      const endpoint = isEditing ? `/api/offers/${offer?.id}` : "/api/offers"
      const method = isEditing ? "PATCH" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to save offer")
      }

      toast.success(isEditing ? t("toast.success.offer_updated.title") : t("toast.success.offer_created.title"), {
        description: isEditing
          ? t("toast.success.offer_updated.description")
          : t("toast.success.offer_created.description"),
        className: "bg-earth text-white",
        classNames: { toast: "bg-primary" },
        position: "top-center",
      })

      // Redirect back to the offers list
      router.push("/dashboard/offers")
      router.refresh()
    } catch (error) {
      toast.error(isEditing ? t("toast.error.offer_updated.title") : t("toast.error.offer_created.title"), {
        description: isEditing
          ? t("toast.error.offer_updated.description")
          : t("toast.error.offer_created.description"),
        className: "bg-earth text-white",
        classNames: { toast: "bg-primary" },
        position: "top-center",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{isEditing ? t("edit_offer") : t("add_offer")}</h1>
        <p className="text-muted-foreground">{isEditing ? t("edit_offer_description") : t("add_offer_description")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? t("edit_offer_form.title") : t("add_offer_form.title")}</CardTitle>
          <CardDescription>
            {isEditing ? t("edit_offer_form.description") : t("add_offer_form.description")}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.title.label")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("form.title.placeholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.department.label")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("form.department.placeholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.description.label")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("form.description.placeholder")} className="min-h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.location.label")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("form.location.placeholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.employment_type.label")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("form.employment_type.placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employmentTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {t(`type.${typeOfEmployment(type.value)}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="IndeedUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.indeed_url.label")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("form.indeed_url.placeholder")} {...field} />
                    </FormControl>
                    <FormDescription>{t("form.indeed_url.description")}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="urgent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{t("form.urgent.label")}</FormLabel>
                      <FormDescription>{t("form.urgent.description")}</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/offers")}>
                {t("form.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("form.saving")}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? t("form.update") : t("form.save")}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

// Helper function to convert employment type to translation key
const typeOfEmployment = (type: string) => {
  switch (type) {
    case "FULL_TIME":
      return "full_time"
    case "PART_TIME":
      return "part_time"
    case "CONTRACT":
      return "contract"
    case "INTERNSHIP":
      return "internship"
    case "TEMPORARY":
      return "temporary"
    case "VOLUNTEER":
      return "volunteer"
    case "PER_DIEM":
      return "per_diem"
    default:
      return "other"
  }
}

