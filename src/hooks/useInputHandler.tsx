import { useState } from "react"

interface IState {
    maximumRefund: string,
    userDiscount: number,
    userRefund: number,    
    discountName: string,
    discountExpiration: string,
    remainingAmount: number,
    remainingDays: number,
    error: string | boolean
}



export default function useInputHandler() {

    const [maximumRefund, setMaximumRefund] = useState<IState['maximumRefund']>()

    const [userDiscount, setUserDiscount] = useState<IState['userDiscount']>()

    const [userRefund, setUserRefund] = useState<IState['userRefund']>()    

    const [discountName, setDiscountName] = useState<IState['discountName']>()

    const [discountExpiration, setDiscountExpiration] = useState<IState['discountExpiration']>()

    const [discountNameError, setDiscountNameError] = useState<IState['error']>()

    const [discountError, setDiscountError] = useState<IState['error']>()

    const [refundError, setRefundError] = useState<IState['error']>()

    const [discountExpirationError, setDiscountExpirationError] = useState<IState['error']>()

    const [isSubmitError, setSubmitError] = useState<IState['error']>(false)
    
    
    
    return (
        <div>
            
        </div>
    )
}
