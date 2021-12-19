import { createContext, useState, useEffect } from "react"

interface IState {
    globalMaximumRefund: string,
    globalDiscount: number,
    globalRefund: number,
    allUserDiscounts: Array<any>

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

    const createNewDiscount = (discount:any) => {
        const allDiscounts = [...allUserDiscounts, discount]
        setAllUserDiscounts(allDiscounts)
        localStorage.setItem("userDiscounts", JSON.stringify(allDiscounts))
    }

    const deleteDiscount = (discount: any) => {
        const newDiscountArray = allUserDiscounts.filter(i => i.id !== discount.id)

        setAllUserDiscounts(newDiscountArray)
        localStorage.setItem("userDiscounts", JSON.stringify(newDiscountArray))
    }


    return (
        <DiscountsContext.Provider value={
            {
                globalMaximumRefund,
                globalDiscount,
                setGlobalDiscount,
                globalRefund,
                setGlobalRefund,
                allUserDiscounts,
                createNewDiscount,
                deleteDiscount
            }
        }>
            {children}
        </DiscountsContext.Provider>
    )
}