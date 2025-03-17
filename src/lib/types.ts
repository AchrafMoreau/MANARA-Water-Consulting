import { ReactNode } from "react"

type ProjetType = {
  id: string
  title:string
  thumbnail:string
  image:string[]
  client:string
  location:string
  commenced:string
  completion: string
  description: string
  solution: string
  impact: string
  createdAt: Date
  updatedAt: Date
  category: CategoryType
  categoryId: string
  translations: {} | translationsType | null
}
 
type CategoryType = {
  id: string,
  name: string,
  icon: ReactNode,
  color: string,
  activeColor: string,
  createdAt: Date,
  updatedAt: Date,
  translations: translationsType
}

type translationsType = {
  en: string,
  fr: string,
  ar: string,
}
export type { ProjetType, CategoryType } 