import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

type ContextType = [boolean, Dispatch<SetStateAction<boolean>>] | []

const AppContext = createContext<ContextType>([])

export const AppContextProvider: FC = ({ children }): JSX.Element => {
  const [dialogActive, setDialogActive] = useState<boolean>(false)
  return (
    <AppContext.Provider value={[dialogActive, setDialogActive]}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
