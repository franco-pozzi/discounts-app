import { useContext, useState, useEffect } from 'react'

import ComplexInput from '../../../components/ComplexInput'
import SimpleInput from '../../../components/SimpleInput'

import { inputPorcentajeHandle, inputTopeReintegroHandle, inputFechaVencimientoHandle, inputDiscountName } from '../../../services/inputLogic'

import { DiscountsContext } from '../../../context/DiscountsContext'
import { ErrorContext } from '../../../context/ErrorContext'

interface IState {
    discountName: string,
    discountExpiration: string,
    remainingAmount: number,
    remainingDays: number,
    error: string | boolean
}


export default function CreateDiscount() {

    const { globalDiscount, setGlobalDiscount, globalRefund, setGlobalRefund, createNewDiscount, allUserDiscounts } = useContext(DiscountsContext)

    const [discountName, setDiscountName] = useState<IState['discountName']>()

    const [discountExpiration, setDiscountExpiration] = useState<IState['discountExpiration']>()

    const [discountNameError, setDiscountNameError] = useState<IState['error']>()

    const [discountError, setDiscountError] = useState<IState['error']>()

    const [refundError, setRefundError] = useState<IState['error']>()

    const [discountExpirationError, setDiscountExpirationError] = useState<IState['error']>()

    const [isSubmitError, setSubmitError] = useState<IState['error']>(false)

    const { setSelectedToast } = useContext(ErrorContext)


    useEffect(() => {
        if (!discountError && !refundError && !discountExpirationError && !discountNameError) {
            setSubmitError(false)
        }
        else {
            setSubmitError(true)
        }

    }, [discountExpiration, discountError, refundError, discountExpirationError, discountNameError])


    const onSubmit = (e: any) => {

        e.preventDefault()

        if (!discountError && !refundError && !discountExpirationError && !discountNameError) {

            if (discountName && globalDiscount && globalRefund && discountExpiration) {
                setSubmitError(false)

                // Create Id to single discount
                const createDate: Date = new Date()
                const randomNumber: number = Math.floor(Math.random() * 101)

                const discountId: string = `${randomNumber}'-'${createDate}`

                // Calculate Maximum Spending
                const maximumSpending = (globalRefund * (100 / globalDiscount)).toFixed(2)

                //format discountExpiration

                const formatDiscountExpiration = discountExpiration.split('-').reverse().join('-')

                // Create single discount Object
                const newDiscount: Object = {
                    id: discountId,
                    discountName: discountName,
                    discountAmount: globalDiscount,
                    refundAmount: globalRefund,
                    discountExpiration: formatDiscountExpiration,
                    maximumSpending: maximumSpending,
                    newPurchase: [],
                    remainingAmount: maximumSpending
                }

                createNewDiscount(newDiscount)

                setDiscountName(undefined)
                setGlobalDiscount(undefined)
                setGlobalRefund(undefined)
                setDiscountExpiration(undefined)

                setSelectedToast('discount-added')


                //console.log('succed')
            }

            else {
                !discountName && setDiscountNameError('Debes ingresar un nombre v??lido')

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
        <section className={`col-12 col-md-10 col-lg-10 p-3 ${allUserDiscounts.length > 0 && 'col-xl-5 order-xl-1 '}  `}>
            <div className='modified__border my-4 px-2 create__discount'>
                <h2 className="pt-4 pb-2 text-center m-0">Mis descuentos</h2>
                <p className='px-3 pt-2 m-0 create__paragraph'>
                    Podr??s llevar la cuenta de los descuentos que est??s utilizando y maximizar tu ahorro.
                </p>
                <form className="row row-cols-1 row-cols-sm-2 m-0" onSubmit={onSubmit}>
                    <SimpleInput
                        inputId='nuevoAhorro'
                        labelText='Nombre: '                       
                        inputType='text'
                        OnChangeFunction={
                            (e: any) => {
                                if (inputDiscountName(e) === 'inputError') {
                                    setDiscountNameError('Ingrese un nombre de descuento v??lido, max caracteres 30')
                                    setDiscountName(undefined)
                                }
                                else {
                                    setDiscountNameError(undefined)
                                    setDiscountName(inputDiscountName(e))
                                }
                            }
                        }
                        errorMessage={discountNameError}
                        value={discountName}
                    />

                    <ComplexInput
                        inputId='newPorcentajeAhorro'
                        labelText='Porcentaje de ahorro: '
                        inputType='number'
                        OnChangeFunction={
                            (e: any) => {
                                if (inputPorcentajeHandle(e) === 'inputError') {
                                    setDiscountError('El porcentaje m??nimo es 1 y el m??ximo 100')
                                    setGlobalDiscount(undefined)
                                } else {
                                    setGlobalDiscount(inputPorcentajeHandle(e))
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
                        inputType='number'
                        OnChangeFunction={
                            (e: any) => {
                                if (inputTopeReintegroHandle(e) === 'inputError') {
                                    setRefundError('El tope de reintegro m??nimo es 0 y el m??ximo 10000000')
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
                                    setDiscountExpiration(e.target.value)
                                } else {
                                    setDiscountExpiration(e.target.value)
                                    setDiscountExpirationError(undefined)
                                }
                            }
                        }
                        errorMessage={discountExpirationError}
                        value={discountExpiration}
                    />
                    <div className="d-flex justify-content-center align-items-center py-3 w-100">
                        {!isSubmitError ?
                            <input type="submit" value="Guardar descuento" className='btn btn-outline-success btn__border create__button' /> :
                            <input type="submit" value="Error" className='btn btn-danger btn__border create__button' />
                        }
                    </div>
                </form>
            </div>
        </section>
    )
}
