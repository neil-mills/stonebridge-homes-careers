import React, {
  FC,
  createContext,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Video from '../components/Video'
import { ArticleType } from '../types'

type ContextType = {
  dialogActive: boolean
  setDialogActive: Dispatch<SetStateAction<boolean>> | null
  menuActive: boolean
  setMenuActive: Dispatch<SetStateAction<boolean>> | null
  setDialogContent: Dispatch<SetStateAction<ReactNode>> | null
  setCentreDialog: Dispatch<SetStateAction<ReactNode>> | null
  setActivePage: Dispatch<SetStateAction<boolean>> | null
  setPageTabIndex: Dispatch<SetStateAction<number>> | null
  setModalTabIndex: Dispatch<SetStateAction<number>> | null
  setPageFocusRef: Dispatch<SetStateAction<React.RefObject<HTMLElement>>> | null
  setCategoryId: Dispatch<SetStateAction<string[] | null>> | null
  categoryId: string[] | null
  setCurrentPage: Dispatch<SetStateAction<number>> | null
  currentPage: number
  centreDialog: false
  setVideoSrc: ((src: string) => void) | null
  dialogContent: ReactNode | null
  bodyNoScroll: boolean
  stopBodyScroll?: (state: boolean) => void
  activePage: boolean
  address: string
  instagram?: string
  facebook?: string
  linkedin?: string
  twitter?: string
  pageTabIndex: number
  modalTabIndex: number
  dialogRef: React.MutableRefObject<HTMLDivElement> | null
  pageFocusRef: React.RefObject<HTMLElement> | null
  setFilteredArticles: Dispatch<SetStateAction<ArticleType[]>> | null
  filteredArticles: ArticleType[]
}

const AppContext = createContext<ContextType>({
  dialogActive: false,
  setDialogActive: null,
  menuActive: false,
  setMenuActive: null,
  bodyNoScroll: false,
  dialogContent: null,
  setDialogContent: null,
  setPageTabIndex: null,
  setModalTabIndex: null,
  address: '',
  setVideoSrc: null,
  centreDialog: false,
  setCentreDialog: null,
  activePage: false,
  setActivePage: null,
  pageTabIndex: 0,
  modalTabIndex: -1,
  dialogRef: null,
  setPageFocusRef: null,
  pageFocusRef: null,
  setCategoryId: null,
  categoryId: null,
  setCurrentPage: null,
  currentPage: 1,
  setFilteredArticles: null,
  filteredArticles: [],
})

export const AppContextProvider: FC = ({ children }): JSX.Element => {
  const [dialogActive, setDialogActive] = useState<boolean>(false)
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [bodyNoScroll, setBodyNoScroll] = useState<boolean>(false)
  const [dialogContent, setDialogContent] = useState<ReactNode>(null)
  const [centreDialog, setCentreDialog] = useState<boolean>(false)
  const [activePage, setActivePage] = useState<ReactNode>(null)
  const [pageTabIndex, setPageTabIndex] = useState<number>(0)
  const [modalTabIndex, setModalTabIndex] = useState<number>(-1)
  const [categoryId, setCategoryId] = useState<string[] | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([])
  const [pageFocusRef, setPageFocusRef] =
    useState<React.RefObject<HTMLElement> | null>(null)

  const setVideoSrc = (src: string) => {
    setCentreDialog(true)
    stopBodyScroll(true)
    setDialogContent(<Video src={src} />)
    setDialogActive(true)
    setPageTabIndex(-1)
    setModalTabIndex(0)
  }

  const stopBodyScroll = (state: boolean) => {
    setBodyNoScroll(state)
    if (state) {
      const { scrollY } = window
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }
  const { settings } = useStaticQuery(graphql`
    query {
      settings: allSanitySettings {
        nodes {
          address
          instagram
          facebook
          linkedin
          twitter
        }
      }
    }
  `)
  return (
    <AppContext.Provider
      value={{
        dialogActive,
        setDialogActive,
        setActivePage,
        menuActive,
        setMenuActive,
        setDialogContent,
        dialogContent,
        bodyNoScroll,
        stopBodyScroll,
        setVideoSrc,
        setCentreDialog,
        centreDialog,
        activePage,
        pageTabIndex,
        modalTabIndex,
        setPageTabIndex,
        setModalTabIndex,
        setCategoryId,
        categoryId,
        setCurrentPage,
        currentPage,
        dialogRef,
        pageFocusRef,
        setPageFocusRef,
        setFilteredArticles,
        filteredArticles,
        ...settings.nodes[1],
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
