import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Edit, ExternalLink, Globe, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GetOfferById } from "@/lib/actions/offer-action"

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

export default async function OfferDetailsPage({ params }: { params: { id: string } }) {
  const offer = await GetOfferById(params.id)

  if (!offer) {
    notFound()
  }

  // Format dates
  const formattedCreatedAt = format(new Date(offer.createdAt), "PPP")
  const formattedUpdatedAt = format(new Date(offer.updatedAt), "PPP")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/offers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to offers</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{offer.title}</h1>
          <p className="text-muted-foreground">View offer details and manage this job posting</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Offer Details</CardTitle>
              <CardDescription>Complete information about this job offer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="mt-2 whitespace-pre-line">{offer.description}</p>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                  <p className="mt-1 font-medium">{offer.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                  <div className="mt-1 flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{offer.location}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Employment Type</h3>
                  <p className="mt-1 font-medium capitalize">{offer.employmentType.toLowerCase().replace("_", " ")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div className="mt-1">
                    {offer.urgent ? (
                      <Badge variant="destructive">Urgent</Badge>
                    ) : (
                      <Badge variant="outline">Normal</Badge>
                    )}
                  </div>
                </div>
              </div>

              {offer.IndeedUrl && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Indeed URL</h3>
                    <a
                      href={offer.IndeedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center text-primary hover:underline"
                    >
                      <Globe className="mr-1 h-4 w-4" />
                      <span>{offer.IndeedUrl}</span>
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/dashboard/offers/${offer.id}/edit`} className="w-full">
                <Button className="w-full" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Offer
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                <div className="mt-1 flex items-center text-sm">
                  <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span>{formattedCreatedAt}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                <div className="mt-1 flex items-center text-sm">
                  <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span>{formattedUpdatedAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

