import { createContext, useState, useEffect } from "react"

interface IState {
    globalMaximumRefund: string,
    globalDiscount: number,
    globalRefund: number,
    globalDiscountExpiration: string,
    globalMaximumSpending: number,
    globalRemainingAmount: number,
    globalRemainingDays: number
}




export const DiscountsContext: any = createContext('no-provider')


export default function DiscountsContextProvider({ children }: any) {

    const [globalMaximumRefund, setGlobalMaximumRefund] = useState<IState['globalMaximumRefund']>()

    const [globalDiscount, setGlobalDiscount] = useState<IState['globalDiscount']>()

    const [globalRefund, setGlobalRefund] = useState<IState['globalRefund']>()

    const [globalDiscountExpiration, setGlobalDiscountExpiration] = useState<IState['globalDiscountExpiration']>()

    const [globalMaximumSpending, setGlobalMaximumSpending] = useState<IState['globalMaximumSpending']>()

    const [globalRemainingAmount, setGlobalRemainignAmount] = useState<IState['globalRemainingAmount']>()

    const [globalRemainingDays, setGlobalRemainingDays] = useState<IState['globalRemainingDays']>()


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
                globalDiscountExpiration,
                setGlobalDiscountExpiration,
                globalMaximumSpending,
                setGlobalMaximumSpending,
                globalRemainingAmount,
                setGlobalRemainignAmount,
                globalRemainingDays,
                setGlobalRemainingDays
            }
        }>
            {children}
        </DiscountsContext.Provider>
    )
}