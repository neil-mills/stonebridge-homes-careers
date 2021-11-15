import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

type ContextType = [boolean, Dispatch<SetStateAction<boolean>>] | []

const DialogContext = createContext<ContextType>([])

export const DialogContextProvider: FC = ({ children }): JSX.Element => {
  const [dialogActive, setDialogActive] = useState<boolean>(false)
  return (
    <DialogContext.Provider value={[dialogActive, setDialogActive]}>
      {children}
    </DialogContext.Provider>
  )
}

export default DialogContext
