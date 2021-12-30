import { useState, useEffect, useContext } from 'react'
import ComplexInput from '../../../components/ComplexInput'

import { inputPorcentajeHandle, inputTopeReintegroHandle } from '../../../services/inputLogic'

import { DiscountsContext } from '../../../context/DiscountsContext'

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

    const [discountCalculatorError, setDiscountCalculatorError] = useState<IState['error']>()

    const [calculatorRefundError, setCalculatorRefundError] = useState<IState['error']>()


    useEffect(() => {
        if (userDiscount && userRefund) {
            const calcMaximumRefund = (userRefund * (100 / userDiscount)).toFixed(2)
            setMaximumRefund(calcMaximumRefund)
        }
    }, [userDiscount, userRefund])

    const { setGlobalDiscount, setGlobalRefund, allUserDiscounts } = useContext(DiscountsContext)


    const addDiscountAction = () => {
        if (!discountCalculatorError && !calculatorRefundError) {
            if (userDiscount && userRefund) {
                setGlobalDiscount(userDiscount)
                setGlobalRefund(userRefund)
            }
            if (!userDiscount) {
                setDiscountCalculatorError('Debes ingresar el porcentaje de ahorro')
            }
            if (!userRefund) {
                setCalculatorRefundError('Debes ingresar el tope de reintegro')
            }
        }
    }

    return (
        <section className={`col-12 col-md-10 col-lg-6 p-3 ${allUserDiscounts.length > 0 && 'col-xl-4 order-xl-2 '}`}>
            <div className='modified__border my-4 px-2 discount__calculator'>
                <h2 className='pt-4 pb-2 text-center m-0'>Calculadora de descuentos</h2>
                <p className='px-2 pt-2 m-0 calculator__paragraph'>Completa los siguientes campos y sabé cuánto puedes gastar.</p>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-1">
                    <ComplexInput
                        inputId='porcentajeAhorro'
                        labelText='Porcentaje de ahorro: '
                        inputType='number'
                        OnChangeFunction={
                            (e: any) => {
                                if (inputPorcentajeHandle(e) === 'inputError') {
                                    setDiscountCalculatorError('El porcentaje mínimo es 1 y el máximo 100')
                                    setUserDiscount(undefined)
                                } else {
                                    setDiscountCalculatorError(undefined)
                                    setUserDiscount(inputPorcentajeHandle(e))
                                }
                            }
                        }
                        inputText='%'
                        errorMessage={discountCalculatorError}
                        value={userDiscount ? userDiscount : ''}
                    />

                    <ComplexInput
                        inputId='topeReintegro'
                        labelText='Tope de reintegro: '
                        inputType='number'
                        OnChangeFunction={
                            (e: any) => {
                                if (inputTopeReintegroHandle(e) === 'inputError') {
                                    setCalculatorRefundError('El tope de reintegro mínimo es 1 y el máximo 10000000')
                                    setUserRefund(undefined)
                                } else {
                                    setCalculatorRefundError(undefined)
                                    setUserRefund(inputTopeReintegroHandle(e))
                                }
                            }
                        }
                        inputText='$'
                        errorMessage={calculatorRefundError}
                        value={userRefund}

                    />
                </div>

                {maximumRefund && !discountCalculatorError && !calculatorRefundError && <p className='px-2 pt-4 m-0 text-center'>¡ Podes gastar <strong>$ {maximumRefund}</strong> para aprovechar el total del descuento !</p>}

                <div className="d-flex justify-content-center align-items-center py-3 ">
                    {discountCalculatorError || calculatorRefundError ?
                        <button type="submit" className='btn btn-danger btn__border calculator__button'> Error </button> :
                        <button className='btn btn-outline-success btn__border calculator__button' onClick={addDiscountAction}>Agregar descuento</button>}
                </div>
            </div>
        </section>
    )
}