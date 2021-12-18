import { useContext, useState, useEffect } from 'react'

import ComplexInput from './ComplexInput'
import SimpleInput from './SimpleInput'

import { inputPorcentajeHandle, inputTopeReintegroHandle, inputFechaVencimientoHandle } from '../services/inputLogic'

import { DiscountsContext } from '../context/DiscountsContext'

interface IState {
    discountName: string,
    discountExpiration: string,
    remainingAmount: number,
    remainingDays: number,
    error: string | boolean
}


export default function CreadorDescuento() {

    const { globalDiscount, setGlobalDiscount, globalRefund, setGlobalRefund, allUserDiscounts, setAllUserDiscounts } = useContext(DiscountsContext)

    const [discountName, setDiscountName] = useState<IState['discountName']>()

    const [discountExpiration, setDiscountExpiration] = useState<IState['discountExpiration']>()

    const [discountNameError, setDiscountNameError] = useState<IState['error']>()

    const [discountError, setDiscountError] = useState<IState['error']>()

    const [refundError, setRefundError] = useState<IState['error']>()

    const [discountExpirationError, setDiscountExpirationError] = useState<IState['error']>()

    const [isSubmitError, setSubmitError] = useState<IState['error']>(false)


    useEffect(() => {
        if (!discountError && !refundError && !discountExpirationError) {
            setSubmitError(false)
        }
        else {
            setSubmitError(true)
        }

    }, [discountName, globalDiscount, globalRefund, discountExpiration, discountError, refundError, discountExpirationError])


    const onSubmit = (e: any) => {

        e.preventDefault()

        if (!discountError && !refundError && !discountExpirationError) {

            if (discountName && globalDiscount && globalRefund && discountExpiration) {
                setSubmitError(false)

                // Create Id to single discount
                const createDate: Date = new Date()
                const randomNumber: number = Math.floor(Math.random() * 101)

                const discountId: string = `${randomNumber} ${createDate}`

                // Calculate Maximum Spending
                const maximumSpending = (globalRefund * (100 / globalDiscount)).toFixed(2)

                // Create single discount Object
                const createDiscount: Object = {
                    id: discountId,
                    discountName: discountName,
                    discountAmount: globalDiscount,
                    refundAmount: globalRefund,
                    discountExpiration: discountExpiration,
                    maximumSpending: maximumSpending,
                }

                setAllUserDiscounts([...allUserDiscounts, createDiscount])

                console.log('succed')
            }

            else {
                !discountName && setDiscountNameError('Debes ingresar un nombre valido')

                !globalDiscount && setDiscountError('Debes ingresar el porcentaje de ahorro')

                !globalRefund && setRefundError('Debes ingresar el tope de reintegro')

                !discountExpiration && setDiscountExpirationError('Debes ingresar una fecha de vencimiento')

                setSubmitError(true)
            }
        }

        else {
            setSubmitError(true)
        }
    }

    return (
        <>
            <form className="row row-cols-1 row-cols-sm-2" onSubmit={onSubmit}>
                <SimpleInput
                    inputId='nuevoAhorro'
                    labelText='Nombre: '
                    placeHolder='Ej: 40 % supermercados'
                    inputType='text'
                    OnChangeFunction={
                        (e: any) => {
                            if (discountNameError) {
                                setDiscountName(e.target.value)
                                setDiscountNameError(false)
                            }
                            else {
                                setDiscountName(e.target.value)
                            }
                        }
                    }
                    errorMessage={discountNameError}
                />

                <ComplexInput
                    inputId='newPorcentajeAhorro'
                    labelText='Porcentaje de ahorro: '
                    placeHolder='Ej: 15'
                    inputType='number'
                    OnChangeFunction={
                        (e: any) => {
                            if (inputPorcentajeHandle(e) === 'inputError') {
                                setDiscountError('El porcentaje minimo es 1 y el maximo 100')
                                setGlobalDiscount(undefined)
                            } else {
                                setGlobalDiscount((inputPorcentajeHandle(e)))
                                setDiscountError(undefined)
                            }
                        }
                    }
                    inputText='%'
                    errorMessage={discountError}
                    value={globalDiscount}
                />

                <ComplexInput
                    inputId='newTopeAhorro'
                    labelText='Tope de reintegro: '
                    placeHolder='Ej: 1000'
                    inputType='number'
                    OnChangeFunction={
                        (e: any) => {
                            if (inputTopeReintegroHandle(e) === 'inputError') {
                                setRefundError('El tope de reintegro minimo es 0 y el maximo 10000000')
                                setGlobalRefund(undefined)
                            } else {
                                setGlobalRefund((inputTopeReintegroHandle(e)))
                                setRefundError(undefined)
                            }
                        }
                    }
                    inputText='$'
                    errorMessage={refundError}
                    value={globalRefund}
                />

                <SimpleInput
                    inputId='nuevoVencimiento'
                    labelText='Vencimiento: '
                    inputType='date'
                    OnChangeFunction={
                        (e: any) => {
                            if (inputFechaVencimientoHandle(e) === 'inputError') {
                                setDiscountExpirationError('La fecha ingresada es anterior a la actual')
                            } else {
                                setDiscountExpiration((inputFechaVencimientoHandle(e)))
                                setDiscountExpirationError(undefined)
                            }
                        }
                    }
                    errorMessage={discountExpirationError}
                />
                <div className="d-flex justify-content-center align-items-center py-3">
                    {!isSubmitError ?
                        <input type="submit" value="Guardar descuento" className='btn btn-success my-3' /> :
                        <input type="submit" value="Error" className='btn btn-danger my-3' />
                    }
                </div>
            </form>
        </>
    )
}
