import { createContext, useState, useEffect } from "react"

interface IState {
    globalMaximumRefund: string,
    globalDiscount: number,
    globalRefund: number,
    remainingValue: number,
    allUserDiscounts: any

}

export const DiscountsContext: any = createContext('no-provider')


export default function DiscountsContextProvider({ children }: any) {


    const getLocalStorage = (localStorage.getItem("userDiscounts"))

    const initialUserDiscounts = () => (
        getLocalStorage ? JSON.parse(getLocalStorage) : []
    )

    const [globalMaximumRefund, setGlobalMaximumRefund] = useState<IState['globalMaximumRefund']>()

    const [globalDiscount, setGlobalDiscount] = useState<IState['globalDiscount']>()

    const [globalRefund, setGlobalRefund] = useState<IState['globalRefund']>()

    const [allUserDiscounts, setAllUserDiscounts] = useState<IState['allUserDiscounts']>(initialUserDiscounts())


    useEffect(() => {
        if (globalDiscount && globalRefund) {
            setGlobalMaximumRefund((globalRefund * (100 / globalDiscount)).toFixed(2))  // Calculated Maximum Refund
        }        
        
    }, [globalDiscount, globalRefund])

    const createNewDiscount = (discount: any) => {
        const allDiscounts = [...allUserDiscounts, discount]
        setAllUserDiscounts(allDiscounts)
        localStorage.setItem("userDiscounts", JSON.stringify(allDiscounts))
    }

    const deleteDiscount = (discount: any) => {
        const newDiscountArray = allUserDiscounts.filter((i: any) => i.id !== discount.id)

        setAllUserDiscounts(newDiscountArray)
        localStorage.setItem("userDiscounts", JSON.stringify(newDiscountArray))
    }

    const addUserPurchase = (discount:any, userPurchase:number) =>{
        const newDiscountArray = allUserDiscounts.filter((i: any) => i.id === discount.id)
        
        newDiscountArray[0].newPurchase = [...newDiscountArray[0].newPurchase, userPurchase]

        newDiscountArray[0].remainingAmount = (newDiscountArray[0].remainingAmount - userPurchase).toFixed(2)

        const refreshAllUserDiscount = allUserDiscounts.map((e:any) => e)        

        setAllUserDiscounts(refreshAllUserDiscount)

        localStorage.setItem("userDiscounts", JSON.stringify(refreshAllUserDiscount))
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
                deleteDiscount,
                addUserPurchase
            }
        }>
            {children}
        </DiscountsContext.Provider>
    )
}