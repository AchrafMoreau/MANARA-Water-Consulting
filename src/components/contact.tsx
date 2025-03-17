"use client";

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "./magicui/magic-card";
import { useTheme } from "next-themes";
import { Textarea } from "./ui/textarea";
import MapComponent from "./map";
import { MapProvider } from "@/providers/map-provider";
import { Title } from "./title";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { useTranslations } from "next-intl";

const Contact = () => {

  const t = useTranslations("contact");
  const Map = useMemo(() => dynamic(
    () => import('./map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])
    return (
        <div className="flex flex-col md:flex-row mx-10 md:mx-20 pt-10 mb-10">
            <Toaster richColors={true} />
            <div className="flex flex-col md:w-[50%] mb-5 md:mb-0">
                <Title title={t('title')} />
                <p className="text-gray-600 dark:text-gray-400">
                  {t('description')}
                </p>
                <div className="rounded pt-10">
                  <Map />
                </div>
            </div>
            <div className="flex md:w-[500px] mx-auto justify-center grow items-center">
                <ContactCard />
            </div>
        </div>
    )
}


const ContactCard = () => {
  const t = useTranslations("contact.form")
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({
    name: "",
    company: "",
    email: "",
    region: "",
    message: ""
  })
  
  const handelChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInfo(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const handelSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try{
      const response = await fetch('/api/mail', {
        method: 'POST',
        body: JSON.stringify(info)
      });

      setInfo({
        name: "",
        email: "",
        message: "",
        company: "",
        region: ""
      })

      toast.success(t('toastr'), {
          description: t('toastrMessage'),
          className: "bg-earth text-white",
          classNames:{toast: "bg-primary"},
          position: "top-center",
      })
    }catch(err){
      toast.error(t('toastrError'), {
          className: "bg-earth text-white",
          classNames:{toast: "bg-primary"},
          position: "top-center",
      })
    }finally{
      setLoading(false)
    }


  }
  return (
    <Card className="md:w-[450px] mx-auto">
      <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
        <form onSubmit={handelSubmit}>
        <CardHeader>
          <CardTitle>{t('header')}</CardTitle>
          <CardDescription>
            {t('subheader')}
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('name')}</Label>
                <Input id="name" type="text" placeholder="joe" 
                  name="name"
                  value={info.name}
                  onChange={handelChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" required type="email" placeholder="name@example.com" 
                  name="email"
                  value={info.email}
                  onChange={handelChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('company')}</Label>
                <Input id="company" type="text"  placeholder="ASM Inc."
                  name="company"
                  value={info.company}
                  onChange={handelChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('region')}</Label>
                <Input id="region" placeholder="Casablanaca" type="text"  
                  name="region"
                  value={info.region}
                  onChange={handelChange}
                />
              </div>

              <div className="grid gap-2">
                <Textarea placeholder={t('messagePlaceholder')} 
                  required
                  name="message"
                  value={info.message}
                  onChange={handelChange}
                />
              </div>
            </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" 
            className='bg-gradient-to-br from-secondary to-primary text-white hover:opacity-80 w-full'>
            {loading ?  <Loader2 className="animate-spin" /> : t('submit')}
          </Button>
        </CardFooter>
        </form>
      </MagicCard>
    </Card>
  );
}

export default Contact;