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
enum EmploymentType {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    CONTRACT = "CONTRACT",
    TEMPORARY = "TEMPORARY",
    INTERNSHIP = "INTERNSHIP",
    VOLUNTEER = "VOLUNTEER",
    PER_DIEM = "PER_DIEM",
    OTHER = "OTHER",
}
type offersType = {
  id: string
  title: string
  location: string
  description: string
  translations: {} | null
  createdAt: Date
  updatedAt: Date
  department: string
  urgent: boolean
  employmentType: EmploymentType
  IndeedUrl: string
}
export type { ProjetType, CategoryType, offersType } 