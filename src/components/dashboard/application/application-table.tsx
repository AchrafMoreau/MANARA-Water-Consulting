"use client"
import { useState, useMemo, useEffect } from "react"
import { AppleIcon, ArrowUpDown, FileText, Loader2, Search, SortAsc, SortDesc, Trash2, X } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ApplicationType } from "@/lib/types"
import { ApplicationStatusUpdate, ApplicattionBulkDelete } from "@/lib/actions/application-action"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"




type SortDirection = "asc" | "desc" | null
type SortField = "name" | "createdAt" | null

export default function ApplicationsTable({ applications }: { applications: ApplicationType[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [selectedApplication, setSelectedApplication] = useState<ApplicationType | null>(null)
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<ApplicationType["status"]>("PENDING")
  const t = useTranslations("dashboard.application")
  const route = useRouter()
  const rowsPerPage = 10

  // Filter applications based on search query
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.email.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [searchQuery])

  // Sort filtered applications
  const sortedApplications = useMemo(() => {
    if (!sortField || !sortDirection) return filteredApplications

    return [...filteredApplications].sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" ? a.lastName.localeCompare(b.lastName) : b.lastName.localeCompare(a.lastName)
      }

      if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA
      }

      return 0
    })
  }, [filteredApplications, sortField, sortDirection])

  // Calculate pagination
  const totalPages = Math.ceil(sortedApplications.length / rowsPerPage)
  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return sortedApplications.slice(startIndex, startIndex + rowsPerPage)
  }, [sortedApplications, currentPage])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortField(null)
        setSortDirection(null)
      }
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />
    if (sortDirection === "asc") return <SortAsc className="h-3 w-3" />
    return <SortDesc className="h-3 w-3" />
  }

  const toggleRowSelection = (id: string) => {
    setSelectedApplications((prev) => (prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    const currentPageIds = paginatedApplications.map((app) => app.id)
    const allSelected = currentPageIds.every((id) => selectedApplications.includes(id))

    if (allSelected) {
      setSelectedApplications((prev) => prev.filter((id) => !currentPageIds.includes(id)))
    } else {
      setSelectedApplications((prev) => {
        const newSelection = [...prev]
        currentPageIds.forEach((id) => {
          if (!newSelection.includes(id)) {
            newSelection.push(id)
          }
        })
        return newSelection
      })
    }
  }

  const handleBulkDelete = async () => {
    if (selectedApplications.length === 0) return
    setIsLoading(true)

    try{
      await ApplicattionBulkDelete(selectedApplications)
      toast.success( t('toasts.success.bulkDelete.title') , {
        description: t('toasts.success.bulkDelete.description', {
          count: selectedApplications.length,
        }),
        className: "bg-primary text-white",
        position: "top-center",
      })
      setSelectedApplications([])
      window.location.reload()
    }catch(err){
      toast.error( t('toasts.error.bulkDelete.title') , {
        description: t('toasts.error.bulkDelete.description', {
          count: selectedApplications.length,
        }),
        className: "bg-earth text-white",
        position: "top-center",
      })
    }finally{
      setIsLoading(false)
    }
  }


  const clearSearch = () => {
    setSearchQuery("")
  }

  const openPdfViewer = (application: ApplicationType) => {
    setSelectedApplication(application)
    setIsPdfDialogOpen(true)
  }

  const openStatusDialog = (application: ApplicationType) => {
    setSelectedApplication(application)
    setNewStatus(application.status)
    setIsStatusDialogOpen(true)
  }

  const updateApplicationStatus = async() => {
    if (!selectedApplication) return
    setIsLoading(true)
    try{
        await ApplicationStatusUpdate(selectedApplication.id, newStatus)
        toast.success(t('toasts.success.statusUpdate.title'), {
            description: t('toasts.success.statusUpdate.description', 
                { status: newStatus }
            ),
            className: "bg-primary text-white",
            position: "top-center",
        })
        window.location.reload()
        setIsStatusDialogOpen(false)

    }catch(error){ 
        toast.error(t('toasts.error.statusUpdate.title'), {
            description: t('toasts.error.statusUpdate.description'),
            className: "bg-earth text-white",
            position: "top-center",
        })
    }
    setIsLoading(false)

  }

  const getStatusBadge = (status: ApplicationType["status"]) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-secondary hover:bg-secondary/80">{t('statusBadges.PENDING')}</Badge>
      case "ACCEPTED":
        return <Badge className="bg-secondary hover:bg-secondary/80">{t('statusBadges.ACCEPTED')}</Badge>
      case "REVIEWED":
        return <Badge className="bg-earth hover:bg-earth/80">{t("statusBadges.REVIEWED")}</Badge>
      case "REJECTED":
        return <Badge className="bg-red-500 hover:bg-red-600">{t('statusBadges.REJECTED')}</Badge>
      default:
        return <Badge>{t("statusBadges.UNKNOWN")}</Badge>
    }
  }

  const renderPaginationItems = () => {
    const items = []
    items.push(
      <PaginationItem key="first">
        <PaginationLink className="cursor-pointer" isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
          1
        </PaginationLink>
      </PaginationItem>,
    )

    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink className="cursor-pointer" isActive={currentPage === i} onClick={() => setCurrentPage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            className="cursor-pointer"
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  return (
    <div className="flex flex-col gap-4">
      <Toaster richColors={true} />

      {/* PDF Viewer Dialog */}
      <Dialog open={isPdfDialogOpen} onOpenChange={setIsPdfDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                    {t('dialogs.pdfViewer.title', {
                        firstName: selectedApplication.firstName.toUpperCase(),
                        lastName: selectedApplication.lastName.toUpperCase()
                    })}
                </DialogTitle>
              </DialogHeader>

              <div className="h-[70vh] border rounded-md overflow-hidden bg-muted">
                <iframe
                  src={selectedApplication.resume}
                  className="w-full h-full"
                  title={t('dialogs.pdfViewer.title', {
                    firstName: selectedApplication.firstName,
                    lastName: selectedApplications.lastName
                  })}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPdfDialogOpen(false)}>
                  {t('close')}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle>{t('dialogs.statusUpdate.title')}</DialogTitle>
                <DialogDescription>
                    {t('dialogs.statusUpdate.description', {
                      firstName: selectedApplication.firstName.toUpperCase(),
                      lastName: selectedApplication.lastName.toUpperCase()
                    })}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <RadioGroup
                  value={newStatus}
                  onValueChange={(value) => setNewStatus(value as ApplicationType["status"])}
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="PENDING" id="pending" />
                    <Label htmlFor="pending" className="flex items-center gap-2">
                      <Badge className="bg-secondary hover:bg-secondary/80">
                        {t('statusBadges.PENDING')}
                      </Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="REVIEWED" id="reviewed" />
                    <Label htmlFor="reviewed" className="flex items-center gap-2">
                      <Badge className="bg-primary text-gray-200">
                        {t('statusBadges.REVIEWED')}
                      </Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="ACCEPTED" id="accepted" />
                    <Label htmlFor="accepted" className="flex items-center gap-2">
                      <Badge className="bg-earth text-white hover:bg-earth/80">
                        {t('statusBadges.ACCEPTED')}
                      </Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="REJECTED" id="rejected" />
                    <Label htmlFor="rejected" className="flex items-center gap-2">
                      <Badge className="bg-red-500 text-white hover:bg-red-400">
                        {t('statusBadges.REJECTED')}
                      </Badge>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                  {t('dialogs.statusUpdate.cancel')}
                </Button>
                <Button className="bg-gradient-to-br from-secondary to-primary text-white hover:opacity-80" 
                    onClick={updateApplicationStatus} 
                    disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t("dialogs.statusUpdate.submit")}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('searchPlaceholder')}
                  className="pl-8 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {searchQuery && (
                  <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={clearSearch}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">{t('clearSearch')}</span>
                  </Button>
                )}
              </div>
            </div>

            {selectedApplications.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground"> 
                    {t('selectedCount', {
                        count:selectedApplications.length
                    })}
                </span>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="h-8" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      {t('bulkDelete')}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      checked={
                        paginatedApplications.length > 0 &&
                        paginatedApplications.every((app) => selectedApplications.includes(app.id))
                      }
                      className="text-white"
                      onCheckedChange={toggleSelectAll}
                      aria-label={t('tableHeaders.selectAll')}
                    />
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex h-8 items-center gap-1 p-1 hover:bg-muted"
                      onClick={() => handleSort("name")}
                    >
                      {t('tableHeaders.applicant')}
                      {getSortIcon("name")}
                    </Button>
                  </TableHead>
                  <TableHead>{t('tableHeaders.status')}</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex h-8 items-center gap-1 p-1 hover:bg-muted"
                      onClick={() => handleSort("createdAt")}
                    >
                      {t('tableHeaders.appliedOn')}
                      {getSortIcon("createdAt")}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[80px] text-center">
                    {t('tableHeaders.resume')}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t('tableHeaders.actions')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {paginatedApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      {t('noApplications')}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedApplications.map((application) => (
                    <TableRow key={application.id} className="group">
                      <TableCell className="w-12 text-center">
                        <Checkbox
                          checked={selectedApplications.includes(application.id)}
                          className="text-white"
                          onCheckedChange={() => toggleRowSelection(application.id)}
                          aria-label={`Select ${application.firstName} ${application.lastName}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {application.firstName.toUpperCase()} {application.lastName.toUpperCase()}
                        <div className="text-sm text-muted-foreground">{application.email}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>{format(application.createdAt, "MMM d, yyyy")}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openPdfViewer(application)}
                          className="h-8 w-8"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">
                            {t('buttons.viewResume')}
                          </span>
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" onClick={() => openStatusDialog(application)} className="h-8">
                          {t('buttons.updateStatus')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
                {t('pagination.showing', {
                    from: Math.min((currentPage - 1) * rowsPerPage + 1, sortedApplications.length),
                    to: Math.min(currentPage * rowsPerPage, sortedApplications.length),
                    total: sortedApplications.length
                })}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
