import { useContext, useState, useEffect } from 'react'

import { DiscountsContext } from '../../../context/DiscountsContext'
import { ErrorContext } from '../../../context/ErrorContext'

import { inputNewPurchase } from '../../../services/inputLogic'

import { BsTrash, BsPlus } from 'react-icons/bs'

import ScrollContainer from 'react-indiana-drag-scroll'

export default function ListOfDiscount() {
    const { allUserDiscounts, deleteDiscount } = useContext(DiscountsContext)

    const { setSelectedToast } = useContext(ErrorContext)

    const initialWidth = window.matchMedia("(min-width: 768px)").matches

    const [isMobile, setIsMobile] = useState<any>(!initialWidth)

    useEffect(() => {
        const handler = (e: any) => (
            e.matches ? setIsMobile(false) : setIsMobile(true)                     //Observer de media query
        )
        window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
    })

    switch (isMobile) {
        case true:
            return (
                <>
                    <DiscountArray isMobile={isMobile} allUserDiscounts={allUserDiscounts} deleteDiscount={deleteDiscount} setSelectedToast={setSelectedToast} />
                </>
            );

        case false:
            return (
                <>
                    <ScrollContainer className="scroll-container" hideScrollbars={false} ignoreElements={'.input-group, .purchase__container'}>
                        <DiscountArray isMobile={isMobile} allUserDiscounts={allUserDiscounts} deleteDiscount={deleteDiscount} setSelectedToast={setSelectedToast}/>
                    </ScrollContainer>
                </>
            )
        default:
            return <></>
    }
}


const DiscountArray = ({ isMobile, allUserDiscounts, deleteDiscount, setSelectedToast }: any) => {    

    const onClickDeleteDiscount = (discount: any) => {
        deleteDiscount(discount)
        setSelectedToast('discount-deleted')
    }

    if (allUserDiscounts.length > 0) {
        return (
            <div className={`m-0 ${isMobile ? 'row row-cols-1' : 'list__discount__container'} ${allUserDiscounts.length < 3 && 'justify-content-center'}`}>
                {allUserDiscounts.map((discount: any) => (
                    <div className={` my-4 ${isMobile && 'col'} d-flex justify-content-center align-items-center `} key={discount.id}>

                        <div className='discount__border discount__container'>
                            <div className='d-flex justify-content-end my-1 px-1'>
                                <button type="button" className="btn-close mt-2 me-2" aria-label="Close" onClick={() => onClickDeleteDiscount(discount)}></button>
                            </div>

                            <ul className='text-center'>
                                <li className='mb-1 discount__title' >{discount.discountName}</li>
                                <li className='mb-2 discount__subtitle'>{discount.discountAmount}% de ahorro, tope de $ {discount.refundAmount}</li>
                                <li className='mb-2 discount__extra'>vencimiento: {discount.discountExpiration}</li>
                            </ul>

                            <div className="border-top my-1"></div>

                            <ul className='my-3 ms-4 purchase__container'>
                                <li className="d-flex justify-content-between discount__extra" style={PurchaseArray({ discount }).length > 0 ? { paddingRight: '16%' } : { paddingRight: '10%' }} >
                                    <span className='fw-bolder'>Gasto maximo </span>
                                    <span className='text-end'> $ {discount.maximumSpending}</span>
                                </li>

                                <PurchaseArray discount={discount} setSelectedToast={setSelectedToast} />
                            </ul>

                            <div className="border-top my-2"></div>

                            <ul className='my-3 ms-4 discount__extra'>
                                <li className="d-flex justify-content-between" style={PurchaseArray({ discount }).length > 0 ? { paddingRight: '16%' } : { paddingRight: '10%' }} >
                                    <span className='fw-bolder'>{discount.remainingAmount > 0 ? 'Restan' : 'Excediste '}</span>
                                    <span className='text-end'> $ {discount.remainingAmount > 0 ? discount.remainingAmount : -discount.remainingAmount}</span>
                                </li>

                                <RemainingDays discount={discount} />
                            </ul>
                            <div className="container">
                                <HandleUserInput discount={discount} setSelectedToast={setSelectedToast} />
                            </div>

                        </div>
                    </div>
                ))}
            </div>)
    }

    return <></>
}

const PurchaseArray = ({ discount, setSelectedToast }: any) => {

    const { deletePurchase } = useContext(DiscountsContext)

    const onClickDeletePurchase = (discount: any, purchase: any) => {
        deletePurchase(discount, purchase)
        setSelectedToast('purchase-deleted')

    }

    return discount.newPurchase.map((purchase: any) =>
        <div key={purchase.id}>
            <div className='my-1 text-end' style={{ paddingRight: '40%' }}>-</div>
            <div className='d-flex flex-row'>
                <div className='d-flex flex-column w-100 discount__extra'>
                    <li className="d-flex justify-content-between">
                        <span className='fw-bolder'>Compra</span>
                        <span className='text-end'> $ {purchase.amount}</span>
                    </li>
                    <li className='my-0 '>{purchase.day}</li>
                </div>
                <div className='d-flex justify-content-end align-items-center me-1' style={{ width: '18%' }}>
                    <button className='btn p-2' onClick={() => onClickDeletePurchase(discount, purchase)} >  {/* Colocar confirmacion para eliminar con state */}
                        <BsTrash />
                    </button>
                </div>
            </div>
        </div>
    )
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
            return <li className='my-0 '>1 día restante</li>

        case 'error':
            return <li className='mt-3 fw-bold text-center' style={{ color: '#198754' }}>Descuento Vencido</li>

        default:
            return <li className='my-0 '>{restDates()} días restantes</li>
    }
}


const HandleUserInput = ({ discount, setSelectedToast }: any) => {

    const { addUserPurchase } = useContext(DiscountsContext)

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
                setSelectedToast('purchase-added')
            }
            else {
                setInputError('* Debes ingresar un valor válido')
            }
        }
        else {
            setInputError('* Debes ingresar un valor válido')
        }
    }

    return (
        <>
            <div className={`input-group px-sm-2 pt-1 ${inputError ? 'pb-0' : 'pb-3'}`}>
                <div className='input-group-text col-7 ps-2 pe-1 justify-content-between align-items-center discount__border'>
                    <span className="text-start fw-bold discount__input">Agregar compra:</span>
                    <span className="text-end fw-bold discount__input">$</span>
                </div>
                <input type="number"
                    className='form-control col-2 text-center p-0 discount__input'
                    onChange={
                        (e: any) => {
                            if (inputNewPurchase(e) === 'inputError') {
                                setPurchaseValue(undefined)
                                setInputError('La compra mínima es 0 y la máxima es 100000')
                            }
                            else {
                                setPurchaseValue(inputNewPurchase(e))
                                setInputError(undefined)
                            }
                        }
                    }
                    value={purchaseValue || ''}
                />
                {!inputError ?
                    <button type="button" className='btn btn-outline-success col-2 discount__border' onClick={() => onClickAddButton(discount)}><BsPlus /></button> :
                    <button type="button" className='btn btn-outline-danger col-2 discount__border'>!</button>
                }
            </div>
            {inputError && <div className='p-1 text-center error__font' style={{ color: 'red' }}> {inputError} </div>}
        </>
    )
}