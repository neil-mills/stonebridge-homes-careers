export interface CategoryType {
  id: string
  slug: { current: string }
  title: string
}

export interface ImageType {
  asset: {
    fluid: {
      srcSet?: string
      src: string
    }
  }
  crop?: {
    left: number
    right: number
    top: number
    bottom: number
  }
}

export interface MarkDefsType {
  _key: string
  _type: string
  href?: string
}

export interface RawTextType {
  _key: string
  _type: string
  children: { _key: string; _type: string; marks: string[]; text: string }[]
  markDefs: MarkDefsType[]
  level?: number
  listItem?: string
  style: string
}

export interface TextBlockType {
  _key?: string
  _type?: string
  heading?: string
  subHeading?: string
  _rawText?: RawTextType[]
  marginTop?: boolean
  marginBottom?: boolean
  className?: string
}

export interface Slug {
  slug: { current: string }
}

export interface Block {
  children: [{ text: string }]
}

export interface ImageAndTextBlockType {
  _key?: string
  _type?: string
  heading?: string
  textBlock?: Block[]
  alignText?: string
  buttonLabel?: string
  buttonLink?: Link[]
  tint?: boolean
  videoSrc?: string
  srcAlt?: string
  srcMobile?: ImageType
  src?: ImageType
  marginTop?: boolean
  marginBottom?: boolean
  buttonRef?: React.MutableRefObject<HTMLButtonElement> | null
  buttonCallback?: (e: Event) => void | null
}

export interface ParallaxImageBlockType {
  _key?: string
  _type?: string
  src?: ImageType
  srcLarge?: ImageType
  title?: string
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
  videoLinkLabel?: string
  imageAlt?: string
  categories?: CategoryType[]
  animateOnLoad?: boolean
  showImage?: boolean
  articleSectionType?: Array<
    TextBlockType | ImageAndTextBlockType | ParallaxImageBlockType
  >
  width?: string
}

export interface SlugType {
  current: string
}

export interface Link {
  slug: { current: string }
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
  TradeOrProfession?: string
  Description?: string
  DocumentName?: string
  FileRef?: File | null
  CV?: string
  HoneyPot?: string
}
