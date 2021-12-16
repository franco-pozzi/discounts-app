import { useState, useEffect,useContext } from 'react'
import ComplexInput from './ComplexInput'

import { inputPorcentajeHandle, inputTopeReintegroHandle } from '../services/inputLogic'

import {DiscountsContext} from '../context/DiscountsContext'

interface IState {
    maximumRefund: string,
    userDiscount: number,
    userRefund: number,
    error: string
}

export default function CreateForm() {

    const [maximumRefund, setMaximumRefund] = useState<IState['maximumRefund']>()

    const [userDiscount, setUserDiscount] = useState<IState['userDiscount']>(15)

    const [userRefund, setUserRefund] = useState<IState['userRefund']>(1000)

    const [discountError, setDiscountError] = useState<IState['error']>()

    const [refundError, setRefundError] = useState<IState['error']>()


    useEffect(() => {
        if (userDiscount <= 100 && userDiscount >= 1 && userRefund >= 0 && userRefund <= 10000000) {
            const calcMaximumRefund = (userRefund * (100 / userDiscount)).toFixed(2)
            setMaximumRefund(calcMaximumRefund)
        }
    }, [userDiscount, userRefund])

    const {setGlobalDiscount, setGlobalRefund} = useContext(DiscountsContext)


    const addDiscountAction = () => {
        if (!discountError && !refundError){
            setGlobalDiscount(userDiscount)
            setGlobalRefund(userRefund)
        }
    }

    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2">
                <ComplexInput
                    inputId='porcentajeAhorro'
                    labelText='Porcentaje de ahorro: '
                    placeHolder='Ej: 15'
                    inputType='number'
                    OnChangeFunction={
                        (e: any) => {
                            if (inputPorcentajeHandle(e) === 'inputError') {
                                setDiscountError('El porcentaje minimo es 1 y el maximo 100')
                            } else {
                                setUserDiscount(inputPorcentajeHandle(e))
                                setDiscountError('')
                            }
                        }
                    }
                    inputText='%'
                    errorMessage={discountError}
                />

                <ComplexInput
                    inputId='topeReintegro'
                    labelText='Tope de reintegro: '
                    placeHolder='Ej: 1000'
                    inputType='number'
                    OnChangeFunction={
                        (e: any) => {
                            if (inputTopeReintegroHandle(e) === 'inputError') {
                                setRefundError('El tope de reintegro minimo es 0 y el maximo 10000000')
                            } else {
                                setUserRefund(inputTopeReintegroHandle(e))
                                setRefundError('')
                            }
                        }
                    }
                    inputText='$'
                    errorMessage={refundError}
                />
            </div>

            {maximumRefund && !discountError && !refundError && <p className='my-3 text-center'>¡ Podes gastar <b>$ {maximumRefund}</b> para aprovechar el total del descuento !</p>}

            <div className="d-flex justify-content-center align-items-center py-3">
                <a href="#AddDiscount" className='btn btn-outline-success' onClick={addDiscountAction}>Agregar descuento</a>
            </div>
        </>
    )
}