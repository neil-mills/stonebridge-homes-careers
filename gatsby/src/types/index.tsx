export interface CategoryType {
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

export interface TextBlockType {
  _key?: string
  _type?: string
  heading?: string
  subHeading?: string
  text?: {
    list: null
    style: string
    children: { text: string; _type: string }[]
  }[]
  marginTop?: boolean
  marginBottom?: boolean
  className?: string
}

export interface ImageAndTextBlockType {
  _key?: string
  _type?: string
  heading?: string
  sectionText?: string
  alignText?: string
  buttonLabel?: string
  buttonLink?: string
  tint?: boolean
  videoSrc?: string
  srcAlt?: string
  src?: ImageType
  marginTop?: boolean
  marginBottom?: boolean
  buttonCallback?: (e: MouseEvent) => void
}

export interface ParallaxImageBlockType {
  _key?: string
  _type?: string
  src?: ImageType
  srcLarge?: ImageType
}

export interface ArticleType {
  id: string
  title: string
  slug: SlugType
  date?: string
  subTitle?: string
  author?: string
  image: ImageType
  videoUrl?: string
  imageAlt?: string
  categories?: CategoryType[]
  articleSectionType?: Array<
    TextBlockType | ImageAndTextBlockType | ParallaxImageBlockType
  >
  width?: string
}

export interface SlugType {
  current: string
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
  JobDescription: string
  VacancyName: string
  VacancyType: string
}

export interface CheckDuplicateApplicantResult {
  IsDuplicate: string
}

export interface CreateNewApplicantResult {
  IsDuplicate: string
  ApplicantId: string
}

// export interface UploadApplicantDocumentResult {}

export interface ResponseType<T> {
  Message: string
  Result: T
  Status: number
  isError: boolean
}

export interface ApplicantData {
  ApplicantId?: string
  Title?: string
  FirstName?: string
  LastName?: string
  Email?: string
  PhoneNumber?: string
  Terms?: string
  VacancyReference?: string
  OtherContactDetails?: string
  File?: string
  Description?: string
  DocumentName?: string
  FileRef?: File | null
  CV?: string
}
