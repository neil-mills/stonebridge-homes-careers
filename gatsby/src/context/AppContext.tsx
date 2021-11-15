import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

type ContextType = {
  dialogActive: boolean
  setDialogActive: Dispatch<SetStateAction<boolean>> | null
  menuActive: boolean
  setMenuActive: Dispatch<SetStateAction<boolean>> | null
  bodyNoScroll: boolean
  setBodyNoScroll: Dispatch<SetStateAction<boolean>> | null
}

const AppContext = createContext<ContextType>({
  dialogActive: false,
  setDialogActive: null,
  menuActive: false,
  setMenuActive: null,
  bodyNoScroll: false,
  setBodyNoScroll: null,
})

export const AppContextProvider: FC = ({ children }): JSX.Element => {
  const [dialogActive, setDialogActive] = useState<boolean>(false)
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [bodyNoScroll, setBodyNoScroll] = useState<boolean>(false)
  return (
    <AppContext.Provider
      value={{
        dialogActive,
        setDialogActive,
        menuActive,
        setMenuActive,
        bodyNoScroll,
        setBodyNoScroll,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
