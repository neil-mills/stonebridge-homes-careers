export interface CategoriesType {
  slug: string
  title: string
}

export interface ImageType {
  asset: {
    fluid: {
      srcSet?: string
      src: string
    }
  }
}

export interface ArticleItemType {
  subTitle?: string
  date?: string
  title: string
  link?: string
  video?: boolean
  image: ImageType
  imageAlt?: string
  width?: string
}

export interface VacancyType {
  id: string
  City: string
  ClosingDate: string
  Company: string
  Department: string
  Country: string
  Experience: string
  IsHideSalary: boolean
  JobTitle: string
  Location: string
  Reference: string
  SalaryRange: string
  Status: number
  VacancyDescription: string
  VacancyName: string
  VacancyType: string
}
