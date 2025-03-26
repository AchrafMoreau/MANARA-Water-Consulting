"use client"

import * as React from "react"
import {  FileText, FolderKanban, Home, Inbox  } from 'lucide-react'
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Link, usePathname } from "@/i18n/navigation"
import {  useTranslations } from "next-intl"

// Menu items with expanded structure
const items = [
  {
    title: "home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "projects",
    url: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "offers",
    url: "/dashboard/offers",
    icon: FileText,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const t = useTranslations("dashboard.sidebar")
  
  // Check if a menu item is active
  const isActive = (url: string) => {
    return pathname === url
  }



  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 mb-2">
        <Link href="/" className="flex items-center gap-3 px-2">
          <Image 
            src="/logo_sm.png" 
            alt={t('logo_alt')}
            width={50} 
            height={50} 
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h6 className="font-semibold text-primary">
              {t('company_name')} <br />
              <span className="text-secondary">{t('company_tagline')}</span>
            </h6>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarSeparator />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mt-5">
            {t('main_navigation')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <React.Fragment key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild
                        isActive={isActive(item.url)}
                      >
                        <Link href={item.url} className="transition-colors">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{t(`items.${item.title}`)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
