import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { useStaticQuery, graphql } from 'gatsby'

type ContextType = {
  dialogActive: boolean
  setDialogActive: Dispatch<SetStateAction<boolean>> | null
  menuActive: boolean
  setMenuActive: Dispatch<SetStateAction<boolean>> | null
  bodyNoScroll: boolean
  setBodyNoScroll: Dispatch<SetStateAction<boolean>> | null
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
  setBodyNoScroll: null,
  address: '',
})

export const AppContextProvider: FC = ({ children }): JSX.Element => {
  const [dialogActive, setDialogActive] = useState<boolean>(false)
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [bodyNoScroll, setBodyNoScroll] = useState<boolean>(false)

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
        bodyNoScroll,
        setBodyNoScroll,
        ...settings.nodes[0],
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
