import { useContext, useState } from 'react'

import ComplexInput from './ComplexInput'
import SimpleInput from './SimpleInput'

import { inputPorcentajeHandle, inputTopeReintegroHandle, inputFechaVencimientoHandle } from '../services/inputLogic'

import { DiscountsContext } from '../context/DiscountsContext'

interface IState {
    discountName: string,
    discountExpiration: string,
    remainingAmount: number,
    remainingDays: number,
    error: string
}


export default function CreadorDescuento() {

    const { globalDiscount, setGlobalDiscount, globalRefund, setGlobalRefund, allUserDiscounts, setAllUserDiscounts } = useContext(DiscountsContext)

    const [discountName, setDiscountName] = useState<IState['discountName']>()

    const [discountExpiration, setDiscountExpiration] = useState<IState['discountExpiration']>()

    const [discountError, setDiscountError] = useState<IState['error']>()

    const [refundError, setRefundError] = useState<IState['error']>()

    const [discountExpirationError, setDiscountExpirationError] = useState<IState['error']>()

    const onSubmit = (e: any) => {

        e.preventDefault()

        if (!discountError && !refundError && !discountExpirationError) {

            

            const maximumSpending = (globalRefund * (100 / globalDiscount)).toFixed(2)

            const createDiscount = {
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
            console.log('error')
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
                    OnChangeFunction={(e: any) => setDiscountName(e.target.value)}
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
                    <input type="submit" value="Guardar descuento" className='btn btn-success my-3' />
                </div>
            </form>
        </>
    )
}
