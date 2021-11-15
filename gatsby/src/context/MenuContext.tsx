import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

type ContextType = [boolean, Dispatch<SetStateAction<boolean>>] | []

const MenuContext = createContext<ContextType>([])

export const MenuContextProvider: FC = ({ children }): JSX.Element => {
  const [menuActive, setMenuActive] = useState<boolean>(false)

  return (
    <MenuContext.Provider value={[menuActive, setMenuActive]}>
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContext
