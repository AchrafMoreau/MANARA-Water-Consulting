"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { MagicCard } from "./magicui/magic-card"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { ResumeUpload } from "./ui/file-upload"
import { uploadResumeFromClient } from "@/lib/actions/upload-action"
import { applicationDeploy } from "@/lib/actions/offer-action"
import { offersType } from "@/lib/types"

const formSchema = z.object({
  firstName: z.string().min(2, { message: "joinUs.form.validation.firstName" }),
  lastName: z.string().min(2, { message: "joinUs.form.validation.lastName" }),
  email: z.string().email({ message: "joinUs.form.validation.email" }),
  phone: z.string().min(10, { message: "joinUs.form.validation.phone" }),
  resume: z.string().min(1, { message: "joinUs.form.validation.resume",}),
  coverLetter: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ApplicationForm() {
  const { theme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations("joinUs.form")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      coverLetter: "",
    },
  })

  const handleFileUpload = async (file: File) => {
    try {
      return await uploadResumeFromClient(file)
    } catch (error) {
      console.error("Error uploading file:", error)
      throw new Error("Failed to upload file")
    }
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      await applicationDeploy(data)
      toast.success(
        t('toast.success.title'), {
          description: t('toast.success.description'),
          className: "bg-earth text-white",
          classNames:{toast: "bg-primary"},
          position: "top-center",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(
        t('toast.error.title'), {
          description: t('toast.error.description'),
          className: "bg-earth text-white",
          classNames:{toast: "bg-primary"},
          position: "top-center",
      })
    } finally {
      setIsSubmitting(false)
      form.reset()
    }
  }
  return (
    <Card className=" mx-auto">
      <MagicCard gradientColor={theme == "dark" ? "#262626" : "#D9D9D955"}>
        <CardHeader>
          <CardTitle>{t('header')}</CardTitle>
          <CardDescription>
            {t('subheader')}
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('fields.firstName')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholders.firstName')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('fields.lastName')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholders.lastName')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('fields.email')}
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('placeholders.email')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('fields.phone')}
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={t('placeholders.phone')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('fields.resume')}
                  </FormLabel>
                  <FormControl>
                    <ResumeUpload value={field.value} onChange={field.onChange} onUpload={handleFileUpload} maxSize={10} />
                  </FormControl>
                  <FormDescription>
                    {t('descriptions.resume')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('fields.coverLetter')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('placeholders.coverLetter')}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('descriptions.coverLetter')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-white" disabled={isSubmitting}>
              {isSubmitting ? t('submit.submitting') : t('submit.text')}
            </Button>
          </form>
        </Form>
        </CardContent>
      </MagicCard>
    </Card>
  )
}

