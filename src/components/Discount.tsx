import { useContext, useState } from 'react'

import { DiscountsContext } from '../context/DiscountsContext'

import { inputNewPurchase } from '../services/inputLogic'

import { BsTrash } from 'react-icons/bs'




export default function Discount() {

    const { allUserDiscounts, deleteDiscount, addUserPurchase, deletePurchase } = useContext(DiscountsContext)

    const [purchaseValue, setPurchaseValue] = useState<number | undefined>()

    const [inputError, setInputError] = useState<any>()

    const onClickAddButton = (discount: any): any => {
        if (!inputError && discount) {
            if (purchaseValue) {
                const createDate: Date = new Date()

                const purchase = {
                    amount: purchaseValue,
                    day: `${createDate.getDate()}-${(createDate.getMonth() + 1)}-${createDate.getFullYear()}`,
                    id: createDate
                }

                addUserPurchase(discount, purchase)
                setPurchaseValue(undefined)
                setInputError(undefined)
            }
            else {
                setInputError('*Deberas ingresar un valor valido*')
            }
        }
        else {
            setInputError('*Deberas ingresar un valor valido*')
        }
    }

    const onClickDelete = (discount: any, purchase: any) => {
        deletePurchase(discount, purchase)
    }

    const RemainingDays = ({ discount }: any) => {

        const actualDate: Date = new Date()

        const discountExpirationArray = discount.discountExpiration.split('-')

        const restDates = () => {
            const fActualDate = Date.UTC(actualDate.getFullYear(), (actualDate.getMonth() + 1), actualDate.getDate())
            const fdiscountExpirationArray = Date.UTC(discountExpirationArray[2], discountExpirationArray[1], discountExpirationArray[0])
            const dif = fdiscountExpirationArray - fActualDate
            const difDays = Math.floor(dif / (1000 * 60 * 60 * 24))

            if (difDays >= 0) {
                return difDays
            }
            else {
                return 'error'
            }
        }

        switch (restDates()) {
            case 1:
                return <li className='my-0 fs-6'>1 dia restante</li>

            case 'error':
                return <li className='mt-3 fs-4 fw-bold text-center' style={{ color: '#198754' }}>Descuento Vencido</li>

            default:
                return <li className='my-0 fs-6'>{restDates()} dias restantes</li>
        }
    }


    const PurchaseArray = ({ discount }: any) => {
        return discount.newPurchase.map((purchase: any) =>
            <div key={purchase.id}>
                <div className='my-1 text-end' style={{ paddingRight: '44%' }}>-</div>
                <div className='d-flex flex-row'>
                    <div className='d-flex flex-column w-100'>
                        <li className="d-flex justify-content-between fs-5">
                            <span className='fw-bolder'>Compra</span>
                            <span className='text-end'> $ {purchase.amount}</span>
                        </li>
                        <li className='my-0 fs-6'>{purchase.day}</li>
                    </div>
                    <div className='d-flex justify-content-end align-items-center me-2' style={{ width: '20%' }}>
                        <BsTrash onClick={() => onClickDelete(discount, purchase)} />                                           {/* Colocar confirmacion para eliminar con state */}
                    </div>
                </div>
            </div>
        )
    }



    return allUserDiscounts.map((discount: any) => (
        <div className='container my-3' key={discount.id}>
            <div className='row border' style={{ maxWidth: '334px' }}>
                <div className='d-flex justify-content-end my-1 px-1'>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => deleteDiscount(discount)}></button>
                </div>

                <ul className='text-center my-2'>
                    <li className='fw-bold fs-3' >{discount.discountName}</li>
                    <li className='my-2 fw-normal fs-4'>{discount.discountAmount}% de ahorro, tope de $ {discount.refundAmount}</li>
                    <li className='my-2 fw-light fs-5'>vencimiento: {discount.discountExpiration}</li>
                </ul>

                <div className="border-top my-1"></div>

                <ul className='my-2'>
                    <li className="d-flex justify-content-between fs-5" style={PurchaseArray({ discount }).length > 0 ? { paddingRight: '18%' } : { paddingRight: 0 }} >
                        <span className='fw-bolder '>Gasto maximo </span>
                        <span className='text-end'> $ {discount.maximumSpending}</span>
                    </li>

                    <PurchaseArray discount={discount} />
                </ul>

                <div className="border-top my-2"></div>

                <ul className='my-2'>
                    <li className="d-flex justify-content-between fs-5" style={PurchaseArray({ discount }).length > 0 ? { paddingRight: '18%' } : { paddingRight: 0 }} >
                        <span className='fw-bolder'>{discount.remainingAmount > 0 ? 'Restan' : 'Excediste '}</span>
                        <span className='text-end'> $ {discount.remainingAmount > 0 ? discount.remainingAmount : -discount.remainingAmount}</span>
                    </li>

                    <RemainingDays discount={discount} />

                </ul>

                <HandleUserInput discount={discount} setPurchaseValue={setPurchaseValue} onClickAddButton={onClickAddButton} />

            </div>
        </div>
    ))
}


const HandleUserInput = ({ discount, setPurchaseValue, onClickAddButton }: any) => {

    const [inputError, setInputError] = useState<string>()

    return (
        <>
            <div className='input-group my-3 fs-5'>
                <span className='input-group-text col-7 px-1 justify-content-between'>
                    <span className="text-start fw-bolder">Agregar compra:</span>
                    <span className="text-end">$</span>
                </span>

                <input type="number"
                    placeholder='Ej: 500'
                    className='form-control col-2 text-center'
                    onChange={
                        (e: any) => {
                            if (inputNewPurchase(e) === 'inputError') {
                                setPurchaseValue(e.target.value)
                                setInputError('La compra minima es 0 y la maxima es 100000')
                            }
                            else {
                                setPurchaseValue(e.target.value)
                                setInputError(undefined)
                            }
                        }
                    }
                />

                {!inputError ?
                    <button type="submit" className='btn btn-outline-success col-2' onClick={() => onClickAddButton(discount)}>+</button> :
                    <button type="button" className='btn btn-outline-danger col-2'>Error</button>
                }
            </div>
            {inputError && <span className='col mb-2 w-100 text-center' style={{ color: 'red' }}>* {inputError} *</span>}
        </>
    )

}