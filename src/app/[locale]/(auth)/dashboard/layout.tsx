"use client"
import * as React from "react"
import { usePathname } from "next/navigation"
import {  Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppSidebar } from "@/components/dashboard/sidebar"
import Topbar from "@/components/dashboard/topbar"
import { SidebarProvider } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        
        <Topbar />
        <div className="flex-1 p-4 md:p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
