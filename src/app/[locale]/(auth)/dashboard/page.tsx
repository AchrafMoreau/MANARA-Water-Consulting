import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/server/db"
import { currentUser } from '@clerk/nextjs/server'
import { FileText, FolderKanban } from "lucide-react"
import { getTranslations } from "next-intl/server"


const getTotalProjects = async () => {
  return await prisma.project.count()
} 
const getTotalOffers = async () => {
  return await prisma.offer.count()
}

export default async function DashboardPage() {
  const totalProjects = await getTotalProjects()
  const t = await getTranslations("dashboard")
  const totalOffers = await getTotalOffers()
  const user = await currentUser()


  if (!user) {
    return <div>{t('not_signed_in')}</div>;
  }

  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat(
    'en-US', 
    {
      weekday: t.raw('date_format.weekday'),
      year: t.raw('date_format.year'),
      month: t.raw('date_format.month'),
      day: t.raw('date_format.day')
    }
  ).format(currentDate);

  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return t('greeting.morning');
    if (hour < 18) return t('greeting.afternoon');
    return t('greeting.evening');
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {getGreeting()}, <span className="uppercase">{user?.username}</span>
          </h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('cards.projects.title')}
            </CardTitle>
            <FolderKanban className="w-5 h-5"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('cards.offers.title')}
            </CardTitle>
            <FileText className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOffers}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

