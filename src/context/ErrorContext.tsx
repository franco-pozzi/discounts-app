import { createContext, useState } from "react"

interface IState {
    selectToast: string | [],
}

export const ErrorContext: any = createContext('no-provider')


export default function ErrorContextProvider({ children }: any) {

    const[selectedToast, setSelectedToast] = useState<IState['selectToast']>([])

    return (
        <ErrorContext.Provider value={
            {
                selectedToast,
                setSelectedToast
            }
        }>
            {children}
        </ErrorContext.Provider>
    )
}