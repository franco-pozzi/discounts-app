import { createContext, useState, useEffect } from "react"

interface IState {
    globalMaximumRefund: string,
    globalDiscount: number,
    globalRefund: number,
    allUserDiscounts: object | []
    
}




export const DiscountsContext: any = createContext('no-provider')


export default function DiscountsContextProvider({ children }: any) {

    const [globalMaximumRefund, setGlobalMaximumRefund] = useState<IState['globalMaximumRefund']>()

    const [globalDiscount, setGlobalDiscount] = useState<IState['globalDiscount']>()

    const [globalRefund, setGlobalRefund] = useState<IState['globalRefund']>()

    const [allUserDiscounts, setAllUserDiscounts] = useState<IState['allUserDiscounts']>([])

  


    useEffect(() => {
        if (globalDiscount && globalRefund) {
            setGlobalMaximumRefund((globalRefund * (100 / globalDiscount)).toFixed(2))  // Calculated Maximum Refund
        }
    }, [globalDiscount, globalRefund])    
    
    return (
        <DiscountsContext.Provider value={
            {
                globalMaximumRefund,
                globalDiscount,
                setGlobalDiscount,
                globalRefund,
                setGlobalRefund,
                allUserDiscounts,
                setAllUserDiscounts
            }
        }>
            {children}
        </DiscountsContext.Provider>
    )
}