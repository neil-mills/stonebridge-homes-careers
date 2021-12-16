import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'
import { useStaticQuery, graphql } from 'gatsby'

type ContextType = {
  dialogActive: boolean
  setDialogActive: Dispatch<SetStateAction<boolean>> | null
  menuActive: boolean
  setMenuActive: Dispatch<SetStateAction<boolean>> | null
  setDialogContent: Dispatch<SetStateAction<ReactNode>> | null
  dialogContent: ReactNode | null
  bodyNoScroll: boolean
  stopBodyScroll?: (state: boolean) => void
  address: string
  instagram?: string
  facebook?: string
  linkedin?: string
  twitter?: string
}

const AppContext = createContext<ContextType>({
  dialogActive: false,
  setDialogActive: null,
  menuActive: false,
  setMenuActive: null,
  bodyNoScroll: false,
  dialogContent: null,
  setDialogContent: null,
  address: '',
})

export const AppContextProvider: FC = ({ children }): JSX.Element => {
  const [dialogActive, setDialogActive] = useState<boolean>(false)
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [bodyNoScroll, setBodyNoScroll] = useState<boolean>(false)
  const [dialogContent, setDialogContent] = useState<ReactNode>(null)
  const stopBodyScroll = (state: boolean) => {
    setBodyNoScroll(state)
    if (state) {
      const { scrollY } = window
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
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
        menuActive,
        setMenuActive,
        setDialogContent,
        dialogContent,
        bodyNoScroll,
        stopBodyScroll,
        ...settings.nodes[0],
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
