import { useState, useEffect, useContext } from 'react'
import ComplexInput from '../components/ComplexInput'

import { inputPorcentajeHandle, inputTopeReintegroHandle } from '../services/inputLogic'

import { DiscountsContext } from '../context/DiscountsContext'

interface IState {
    maximumRefund: string,
    userDiscount: number,
    userRefund: number,
    error: string
}

export default function DiscountCalculator() {

    const [maximumRefund, setMaximumRefund] = useState<IState['maximumRefund']>()

    const [userDiscount, setUserDiscount] = useState<IState['userDiscount']>()

    const [userRefund, setUserRefund] = useState<IState['userRefund']>()

    const [discountError, setDiscountError] = useState<IState['error']>()

    const [refundError, setRefundError] = useState<IState['error']>()


    useEffect(() => {
        if (userDiscount && userRefund) {
            const calcMaximumRefund = (userRefund * (100 / userDiscount)).toFixed(2)
            setMaximumRefund(calcMaximumRefund)
        }
    }, [userDiscount, userRefund])

    const { setGlobalDiscount, setGlobalRefund } = useContext(DiscountsContext)


    const addDiscountAction = () => {
        if (!discountError && !refundError) {
            userDiscount && setGlobalDiscount(userDiscount)
            userRefund && setGlobalRefund(userRefund)
        }
    }

    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 m-0">
                <ComplexInput
                    inputId='porcentajeAhorro'
                    labelText='Porcentaje de ahorro: '
                    placeHolder='Ej: 15'
                    inputType='number'
                    OnChangeFunction={
                        (e: any) => {
                            if (inputPorcentajeHandle(e) === 'inputError') {
                                setDiscountError('El porcentaje mínimo es 1 y el máximo 100 ')
                                setUserDiscount(undefined)
                            } else {
                                setDiscountError(undefined)
                                setUserDiscount(inputPorcentajeHandle(e))
                            }
                        }
                    }
                    inputText='%'
                    errorMessage={discountError}
                    value={userDiscount ? userDiscount : ''}
                />

                <ComplexInput
                    inputId='topeReintegro'
                    labelText='Tope de reintegro: '
                    placeHolder='Ej: 1000'
                    inputType='number'
                    OnChangeFunction={
                        (e: any) => {
                            if (inputTopeReintegroHandle(e) === 'inputError') {
                                setRefundError('El tope de reintegro mínimo es 1 y el máximo 10000000')
                                setUserRefund(undefined)
                            } else {
                                setRefundError(undefined)
                                setUserRefund(inputTopeReintegroHandle(e))
                            }
                        }
                    }
                    inputText='$'
                    errorMessage={refundError}
                    value={userRefund}

                />
            </div>

            {maximumRefund && !discountError && !refundError && <p className='px-2 pt-4 m-0 text-center fs-6'>¡ Podes gastar <strong>$ {maximumRefund}</strong> para aprovechar el total del descuento !</p>}

            <div className="d-flex justify-content-center align-items-center py-4">
                <a href="#AddDiscount" className='btn btn-outline-success btn__border' onClick={addDiscountAction}>Agregar descuento</a>
            </div>
        </>
    )
}