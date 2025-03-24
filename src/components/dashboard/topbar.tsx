import { Bell, ChevronDown, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "../ui/toggel-mode"
import { LanguageSelector } from "../navbar"
import { SidebarTrigger } from "../ui/sidebar"


export default function Topbar() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="md:hidden w-6" />
          <div className="flex flex-1 items-center gap-4 md:gap-8">
            <div className="relative flex-1 md:grow-0 md:basis-1/3">
                <SidebarTrigger />
            </div>
            <div className="relative flex-1 md:grow-0 md:basis-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[240px]"
              />
            </div>
            <div className="flex-1 md:flex md:justify-end">
              <div className="flex items-center gap-4">
                <LanguageSelector />
                <ModeToggle />
                <SignedIn>
                  <UserButton 
                    appearance={{
                      elements: {
                        footer: "hidden",
                      },
                    }}
                  />
                </SignedIn>
              </div>
            </div>
          </div>
        </header>
    )
}