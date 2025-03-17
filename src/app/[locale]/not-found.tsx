import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Droplets, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { getTranslations } from "next-intl/server"

export default async function NotFound() {
  const t = await getTranslations("not_found")
  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center notfound p-4"
    >
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <div className="w-48 h-48 relative">
          <Image
            src='/logo.png'
            alt="Manara Water Consulting Logo"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>

        <div className="text-center md:text-left max-w-md">
          <div className="inline-block bg-sky-100 text-[#003b7a] px-3 py-1 rounded-full text-sm font-medium mb-4">
            {t('error')}
          </div>

          <h1 className="text-3xl font-bold text-primary mb-4">
            {t('title')}
          </h1>

          <p className="text-gray-300 mb-6 dark:text-gray-400">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="inline-block">
              <Button className="bg-[#003b7a] hover:bg-[#00295a] text-white w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('back_home')}
              </Button>
            </Link>

            <Link href="/contact-us" className="inline-block">
              <Button variant="outline" className="border-[#003b7a] text-[#003b7a] bg-white hover:bg-sky-50 w-full sm:w-auto">
                <Droplets className="mr-2 h-4 w-4" />
                {t('contact_support')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

