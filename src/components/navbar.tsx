"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, Globe } from "lucide-react"
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import type React from "react"
import { forwardRef, useEffect, useState } from "react"
import { Link } from "@/i18n/navigation"
import { useTheme } from "next-themes"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./ui/toggel-mode";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { usePathname } from "@/i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingOverlay from "./loading";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()
  const t = useTranslations()
  const locale = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Add custom CSS for RTL dropdown positioning
    if (locale === "ar" || document.dir === "rtl") {
      const style = document.createElement("style")
      style.innerHTML = `
      .NavigationMenuContent {
        --radix-navigation-menu-viewport-width: var(--width) !important;
        --radix-navigation-menu-viewport-height: var(--height) !important;
        transform-origin: var(--radix-popper-transform-origin);
      }
    `
      document.head.appendChild(style)
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [locale])

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 py-3 px-6 flex justify-between items-center ${
        isScrolled ? (theme === "dark" ? "bg-black shadow-md" : "bg-white shadow-md") : "bg-transparent text-white"
      } `}
    >
      <Link href="/" className="flex justify-center items-center">
        <Image src="/logo_sm.png" alt="Manara Water Consulting" height={50} width={50} />
        <p className="font-medium text-primary">
          Manara Water <span className="text-gray-700 dark:text-gray-300">Consulting</span>
        </p>
      </Link>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="rtl:flex-row-reverse [&_[data-state=open]>.NavigationMenuContent]:rtl:right-0 [&_[data-state=open]>.NavigationMenuContent]:rtl:right-auto">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent border-none outline-none">{t("services")}</NavigationMenuTrigger>
              <NavigationMenuContent className="text-foreground bg-background">
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md text-white service p-6 no-underline outline-none focus:shadow-md"
                        href="/services"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">{t("overview")}</div>
                        <p className="text-sm leading-tight text-gray-100 capitalize">{t("tagline")}</p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/services/FormationsSIG" title={t("trainings")}>
                    {t("trainingsDesc")}
                  </ListItem>
                  <ListItem href="/services/EtudedesNappes" title={t("aquifersStudy")}>
                    {t("aquifersStudyDesc")}
                  </ListItem>
                  <ListItem href="/services/Reetulisation" title={t("waterReuse")}>
                    {t("waterReuseDesc")}
                  </ListItem>
                  <ListItem href="/services/Protection" title={t("floodProtection")}>
                    {t("floodProtectionDesc")}
                  </ListItem>
                  <ListItem href="/services/Assainissement" title={t("sanitation")}>
                    {t("sanitationDesc")}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/projects" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent`}>
                  {t("projects")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about-us" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent `}>
                  {t("aboutUs")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact-us" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent`}>
                  {t("contactUs")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSelector />
        <ModeToggle />

        {/* Mobile Menu Button - Only visible on mobile */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px] pr-0">
            <div className="mt-8 flex flex-col gap-4">
              <div className="px-2 py-4">
                <h3
                  className={`font-medium mb-2 text-2xl text-primary hover:text-primary/80"
                    ${pathname === "/services/**" ? "text-secondary " : ""}
                  `}
                >
                  {t("ourSolutions")}
                </h3>
                <div className="pl-4 flex flex-col gap-2">
                  <Link
                    href="/services"
                    className={`text-muted-foreground hover:text-foreground transition-colors"
                      ${pathname === "/services" ? "text-secondary font-bold" : ""}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("overview")}
                  </Link>
                  <Link
                    href="/services/FormationsSIG"
                    className={`text-muted-foreground hover:text-foreground transition-colors"
                      ${pathname === "/services/FormationsSIG" ? "text-secondary font-bold" : ""}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("trainings")}
                  </Link>
                  <Link
                    href="/services/EtudedesNappes"
                    className={`text-muted-foreground hover:text-foreground transition-colors"
                      ${pathname === "/services/EtudedesNappes" ? "text-secondary font-bold" : ""}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("aquifersStudy")}
                  </Link>
                  <Link
                    href="/services/Reetulisation"
                    className={`text-muted-foreground hover:text-foreground transition-colors"
                      ${pathname === "/services/Reetulisation" ? "text-secondary font-bold" : ""}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("waterReuse")}
                  </Link>
                  <Link
                    href="/services/Assainissement"
                    className={`text-muted-foreground hover:text-foreground transition-colors"
                      ${pathname === "/services/Assainissement" ? "text-secondary font-bold" : ""}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("sanitation")}
                  </Link>
                  <Link
                    href="/services/Protection"
                    className={`text-muted-foreground hover:text-foreground transition-colors"
                      ${pathname === "/services/Protection" ? "text-secondary font-bold" : ""}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("floodProtection")}
                  </Link>
                </div>
              </div>

              <div className="px-2 py-4 flex flex-col gap-2">
                <Link
                  href="/projects"
                  className={`text-2xl font-medium text-primary hover:text-primary/80 transition-colors"
                    ${pathname === "/projects" ? "text-secondary font-bold" : ""}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {t("projects")}
                </Link>
                <Link
                  href="/about-us"
                  className={`text-2xl font-medium text-primary hover:text-primary/80 transition-colors"
                    ${pathname === "/about-us" ? "text-secondary font-bold" : ""}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {t("aboutUs")}
                </Link>
                <Link
                  href="/contact-us"
                  className={`text-2xl font-medium text-primary hover:text-primary/80 transition-colors"
                    ${pathname === "/contact-us" ? "text-secondary font-bold" : ""}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {t("contactUs")}
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

const ListItem = forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none rtl:text-right space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground overflow-hidden ">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)


ListItem.displayName = "ListItem"


function LanguageSelector() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = useState(0)
  const pathname = usePathname();
  const localActive = useLocale();
  const t = useTranslations();

  const onSelectChange = (nextLocale: string) => {
    setLoadingProgress(0)
    startTransition(() => {
      router.replace(`/${nextLocale}${pathname}`);
      setLoadingProgress(50)
    });
    setLoadingProgress(100)

  };
  return isPending ? <LoadingOverlay progress={loadingProgress} language={localActive} /> : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className=" bg-transparent border-transparent" size="icon">
            <Image
              src={localActive === 'en' ? '/us.svg' : localActive === 'ar' ? '/ma.svg' : '/gf.svg'}
              alt="Langauge"
              width={20}
              height={20}
            />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSelectChange("en")}>
          <Image
            src="/us.svg"
            width={20}
            height={20}
            alt="English"
          />
          {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectChange("ar")}>
          <Image
            src="/ma.svg"
            width={20}
            height={20}
            alt="English"
          />
          {t("arabic")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectChange("fr")}>
          <Image
            src="/gf.svg"
            width={20}
            height={20}
            alt="English"
          />
          {t("french")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}



export default Navbar

