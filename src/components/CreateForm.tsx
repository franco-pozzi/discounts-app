import { useState, useEffect } from 'react'
import ComplexInput from './ComplexInput'

import { inputPorcentajeHandle, inputTopeReintegroHandle } from '../services/inputLogic'

interface IState {
    maxTope: string,
    porcentajeAhorro: number,
    topeReintegro: number,
    error: string
}

export default function CreateForm() {

    const [maxTope, setMaxTope] = useState<IState['maxTope']>()

    const [porcentajeAhorro, setPorcentajeAhorro] = useState<IState['porcentajeAhorro']>(15)

    const [topeReintegro, setTopeReintegro] = useState<IState['topeReintegro']>(1000)

    const [errorPorcentaje, setErrorPorcentaje] = useState<IState['error']>()

    const [errorTope, setErrorTope] = useState<IState['error']>()


    useEffect(() => {
        if (porcentajeAhorro <= 100 && porcentajeAhorro >= 1 && topeReintegro >= 0 && topeReintegro <= 10000000) {
            const calculateMaxTope = (topeReintegro * (100 / porcentajeAhorro)).toFixed(2)
            setMaxTope(calculateMaxTope)
        }
    }, [porcentajeAhorro, topeReintegro])

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
                                setErrorPorcentaje('El porcentaje minimo es 1 y el maximo 100')
                            } else {
                                setPorcentajeAhorro(inputPorcentajeHandle(e))
                                setErrorPorcentaje('')
                            }
                        }
                    }
                    inputText='%'
                    errorMessage={errorPorcentaje}
                />

                <ComplexInput
                    inputId='topeReintegro'
                    labelText='Tope de reintegro: '
                    placeHolder='Ej: 1000'
                    inputType='number'
                    OnChangeFunction={
                        (e: any) => {
                            if (inputTopeReintegroHandle(e) === 'inputError') {
                                setErrorTope('El tope de reintegro minimo es 0 y el maximo 10000000')
                            } else {
                                setTopeReintegro(inputTopeReintegroHandle(e))
                                setErrorTope('')
                            }
                        }
                    }
                    inputText='$'
                    errorMessage={errorTope}
                />
            </div>

            {maxTope && !errorPorcentaje && !errorTope && <p className='my-3 text-center'>¡ Podes gastar <b>$ {maxTope}</b> para aprovechar el total del descuento !</p>}

            <div className="d-flex justify-content-center align-items-center py-3">
                <a href="#AddDiscount" className='btn btn-outline-success '>Agregar descuento</a>
            </div>
        </>
    )
}