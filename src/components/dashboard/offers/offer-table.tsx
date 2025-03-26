"use client"
import { useRouter } from "next/navigation"
import { AlertTriangle, ArrowUpDown, Edit, Eye, Loader2, MoreHorizontal, Plus, Search, SortAsc, SortDesc, Trash2, X, Zap } from "lucide-react"
import { format, set } from "date-fns"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Link } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { bulkDeleteOffers, deleteOffer } from "@/lib/actions/offer-action";
import { useEffect, useMemo, useState } from "react";
import { offersType } from "@/lib/types";

type SortDirection = "asc" | "desc" | null
type SortField = "title" | "createdAt" | null

export default function OffersTable({ offers }: { offers: offersType[] }) {
  const t = useTranslations('dashboard.offers')
  const locale = useLocale()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOffers, setSelectedOffers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const filteredoffers = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [searchQuery, offers])

  // Sort filtered offers
  const sortedoffers = useMemo(() => {
    if (!sortField || !sortDirection) return filteredoffers

    return [...filteredoffers].sort((a, b) => {
      if (sortField === "title") {
        return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      }

      if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA
      }

      return 0
    })
  }, [filteredoffers, sortField, sortDirection])

  // Calculate pagination
  const totalPages = Math.ceil(sortedoffers.length / rowsPerPage)
  const paginatedOffers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return sortedoffers.slice(startIndex, startIndex + rowsPerPage)
  }, [sortedoffers, currentPage])

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
    setSelectedOffers((prev) => (prev.includes(id) ? prev.filter((offerId) => offerId !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    const currentPageIds = paginatedOffers.map((project) => project.id)
    const allSelected = currentPageIds.every((id) => selectedOffers.includes(id))

    if (allSelected) {
      setSelectedOffers((prev) => prev.filter((id) => !currentPageIds.includes(id)))
    } else {
      setSelectedOffers((prev) => {
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

  const handleBulkDelete = async() => {
    if (selectedOffers.length === 0) return
    setIsLoading(true)
    try{
      await bulkDeleteOffers(selectedOffers)
      toast.success(t('toast.success.offers_removed.title'), {
          description: t('toast.success.offers_removed.description'),
          className: "bg-earth text-white",
          classNames:{toast: "bg-primary"},
          position: "top-center",
      })
      setSelectedOffers([])
      router.refresh();
    }catch (err){
      toast.error(t('toast.error.failed_delete_offers.title'), {
        description: t('toast.error.failed_delete_offers.description'),
        className: "bg-earth text-white",
        classNames: { toast: "bg-primary" },
        position: "top-center",
      });
    }finally{
      setIsLoading(false)
    }
  }

  const handleDeleteOffers = async(id: string) => {
    try{
      await deleteOffer(id)
      router.refresh();
      toast.success(t('toast.success.project_deleted.title'), {
        description: t('toast.success.project_deleted.description'),
        className: "bg-earth text-white",
        classNames:{toast: "bg-primary"},
        position: "top-center",
      })
    }catch(err){
      toast.error(t('toast.error.project_deleted.title'), {
        description: t('toast.error.project_deleted.description'),
        className: "bg-earth text-white",
        classNames:{toast: "bg-primary"},
        position: "top-center",
      })
    }
  }


  const clearSearch = () => {
    setSearchQuery("")
  }

  const renderPaginationItems = () => {
        const items = []
        items.push(
        <PaginationItem key="first">
            <PaginationLink 
            className="cursor-pointer"
            isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
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
            <PaginationLink 
                className="cursor-pointer"
                isActive={currentPage === i} onClick={() => setCurrentPage(i)}>
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
                isActive={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">
            {t('description')}
          </p>
        </div>
        <Link
            href={`/dashboard/offers/new`}
        >
            <InteractiveHoverButton className="rounded-lg">
                <div className="flex justify-center items-center gap-2">
                  {t('add_offer')}
                </div>
            </InteractiveHoverButton>
        </Link>
      </div>

      <Card>
        <CardHeader className="p-4 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('search.placeholder')}
                  className="pl-8 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {searchQuery && (
                  <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={clearSearch}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">
                      {t('search.clear')}
                    </span>
                  </Button>
                )}
              </div>
            </div>

            {selectedOffers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t('bulk_actions.selected', { count : selectedOffers.length })}</span>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="h-8" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (
                      <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      {t('bulk_actions.delete')}
                      </>
                    )
                  }
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
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        paginatedOffers.length > 0 &&
                        paginatedOffers.every((offer) => selectedOffers.includes(offer.id))
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label={t('table.select_all')}
                    />
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex h-8 items-center gap-1 p-1 hover:bg-muted"
                      onClick={() => handleSort("title")}
                    >
                      {t('table.title')}
                      {getSortIcon("title")}
                    </Button>
                  </TableHead>
                  <TableHead>{t('table.department')}</TableHead>
                  <TableHead>{t('table.type')}</TableHead>
                  <TableHead>{t('table.status')}</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex h-8 items-center gap-1 p-1 hover:bg-muted"
                      onClick={() => handleSort("createdAt")}
                    >
                      {t('table.created')}
                      {getSortIcon("createdAt")}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[100px] text-right">{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOffers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      {t('table.no_offers')}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOffers.map((offer) => {
                    return (
                    <TableRow key={offer.id} className="group">
                      <TableCell>
                        <Checkbox
                          className="text-white"
                          checked={selectedOffers.includes(offer.id)}
                          onCheckedChange={() => toggleRowSelection(offer.id)}
                          aria-label={`Select ${offer.title}`}
                        />
                      </TableCell>
                      <TableCell>
                        {offer.title}
                      </TableCell>
                      <TableCell className="font-medium">{offer.department}</TableCell>
                      <TableCell>{t(`type.${typeOfEmployment(offer.employmentType)}`)}</TableCell>
                      <TableCell>
                        {offer.urgent ? (
                            <Badge className="hover:bg-destructive px-4 rounded-full font-medium border transition-colors flex items-center gap-2 bg-destructive">
                                <AlertTriangle className="h-4 w-4" />
                                {t('table.urgent')}
                            </Badge>
                        ) : (
                            <Badge className="hover:bg-transparent px-4 rounded-full font-medium border transition-colors flex items-center gap-2 bg-transparent">
                                {t('table.normal')}
                            </Badge>
                        )}
                      </TableCell>
                      <TableCell>{format(offer.createdAt, "MMM d, yyyy")}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              {t('actions_menu.label')}
                            </DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link href={`/dashboard/offers/${offer.id}`} className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                {t('actions_menu.view')}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                              <Link href={`/dashboard/offers/${offer.id}/edit`} className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                {t('actions_menu.edit')}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteOffers(offer.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {t('actions_menu.delete')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )})
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              {t('pagination.showing', 
                { start: Math.min((currentPage - 1) * rowsPerPage + 1, sortedoffers.length),
                  end: Math.min(currentPage * rowsPerPage, sortedoffers.length),
                  total: sortedoffers.length
                }
              )}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    isdisabled={currentPage === 1}
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    isdisabled={currentPage === totalPages}
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


const typeOfEmployment = (type : string) => {
    switch(type){
        case "FULL_TIME":
            return 'full_time';
        case "PART_TIME":
            return 'part_time';
        case "CONTRACT":
            return 'contract';
        case "INTERNSHIP":
            return "internship";
        case "TEMPORARY":
            return 'temporary';
        case "VOLUNTEER":
            return 'volunteer';
        default:
            return 'other'
    }
}