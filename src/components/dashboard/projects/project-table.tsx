"use client"
import * as LucideIcons from "lucide-react";
import { useRouter } from "next/navigation"
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Plus, Search, SortAsc, SortDesc, Trash2, X } from "lucide-react"
import { format } from "date-fns"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { deleteProject } from "@/lib/actions/project-action";
import { useEffect, useMemo, useState } from "react";

type SortDirection = "asc" | "desc" | null
type SortField = "title" | "createdAt" | null

export default function ProjectsTable({ projects, categories }: { projects: any[]; categories: any[] }) {
  const locale = useLocale()
  const router = useRouter()
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || project.categoryId === categoryFilter

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, categoryFilter, projects])

  // Sort filtered projects
  const sortedProjects = useMemo(() => {
    if (!sortField || !sortDirection) return filteredProjects

    return [...filteredProjects].sort((a, b) => {
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
  }, [filteredProjects, sortField, sortDirection])

  // Calculate pagination
  const totalPages = Math.ceil(sortedProjects.length / rowsPerPage)
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return sortedProjects.slice(startIndex, startIndex + rowsPerPage)
  }, [sortedProjects, currentPage])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, categoryFilter, sortField, sortDirection])

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction or clear sort
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortField(null)
        setSortDirection(null)
      }
    } else {
      // Set new sort field with ascending direction
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />
    if (sortDirection === "asc") return <SortAsc className="h-3 w-3" />
    return <SortDesc className="h-3 w-3" />
  }

  const toggleRowSelection = (id: string) => {
    setSelectedProjects((prev) => (prev.includes(id) ? prev.filter((projectId) => projectId !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    const currentPageIds = paginatedProjects.map((project) => project.id)
    const allSelected = currentPageIds.every((id) => selectedProjects.includes(id))

    if (allSelected) {
      setSelectedProjects((prev) => prev.filter((id) => !currentPageIds.includes(id)))
    } else {
      setSelectedProjects((prev) => {
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

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedProjects.length === 0) return

    // In a real app, you would call an API to delete the selected projects
    alert(`Deleting projects: ${selectedProjects.join(", ")}`)

    setSelectedProjects([])
  }

  const handleDeleteProject = async(id: string) => {
    try{
      await deleteProject(id)
      toast.success("Project deleted Successfully", {
          description: "Project deleted Successfully",
          className: "bg-earth text-white",
          classNames:{toast: "bg-primary"},
          position: "top-center",
      })
      router.refresh();
    }catch(err){
      toast.error("Project Faild to Be Deleted", {
          description: "Project Faild to Be Deleted",
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
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your construction projects</p>
        </div>
        <Link
            href={`/dashboard/projects/new`}
        >
            <InteractiveHoverButton className="rounded-lg">
                <div className="flex justify-center items-center gap-2">
                    Add Project
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
                  placeholder="Search projects..."
                  className="pl-8 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {searchQuery && (
                  <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={clearSearch}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProjects.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedProjects.length} selected</span>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="h-8">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
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
                        paginatedProjects.length > 0 &&
                        paginatedProjects.every((project) => selectedProjects.includes(project.id))
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="w-[80px]">Preview</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex h-8 items-center gap-1 p-1 hover:bg-muted"
                      onClick={() => handleSort("title")}
                    >
                      Title
                      {getSortIcon("title")}
                    </Button>
                  </TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex h-8 items-center gap-1 p-1 hover:bg-muted"
                      onClick={() => handleSort("createdAt")}
                    >
                      Created
                      {getSortIcon("createdAt")}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No projects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProjects.map((project) => {
                    const Icon = LucideIcons[project.category.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
                    
                    return (
                    <TableRow key={project.id} className="group">
                      <TableCell>
                        <Checkbox
                          className="text-white"
                          checked={selectedProjects.includes(project.id)}
                          onCheckedChange={() => toggleRowSelection(project.id)}
                          aria-label={`Select ${project.title}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="h-12 w-16 overflow-hidden rounded-md border">
                          <img
                            src={project.thumbnail || "/placeholder.svg"}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.client}</TableCell>
                      <TableCell>{project.location}</TableCell>
                      <TableCell>
                        <button
                            className={`rounded-full font-medium border transition-colors flex items-center gap-2 w-full justify-center ${project.category.color} py-2`}
                        >
                            <Icon className="h-4 w-4" />
                            {project.category.translations[locale] ? project.category?.translations[locale] : project.category.name}
                        </button>
                      </TableCell>
                      <TableCell>{format(project.createdAt, "MMM d, yyyy")}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link href={`/dashboard/projects/${project.id}`} className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                              <Link href={`/dashboard/projects/${project.id}/edit`} className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
              Showing <strong>{Math.min((currentPage - 1) * rowsPerPage + 1, sortedProjects.length)}</strong> to{" "}
              <strong>{Math.min(currentPage * rowsPerPage, sortedProjects.length)}</strong> of{" "}
              <strong>{sortedProjects.length}</strong> projects
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

