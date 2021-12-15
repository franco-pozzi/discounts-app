import { useState } from 'react'

import ComplexInput from './ComplexInput'
import SimpleInput from './SimpleInput'

import { inputPorcentajeHandle, inputTopeReintegroHandle, inputFechaVencimientoHandle } from '../services/inputLogic'

interface IState {
    nombreDescuento: string,
    porcentajeAhorro: number,
    topeReintegro: number,
    fechaVencimiento: string,
    error: string
}


export default function CreadorDescuento() {

    const [nombreDescuento, setNombreDescuento] = useState<IState['nombreDescuento']>('Ultimo descuento')

    const [porcentajeAhorro, setPorcentajeAhorro] = useState<IState['porcentajeAhorro']>(25)

    const [topeReintegro, setTopeReintegro] = useState<IState['topeReintegro']>(1000)

    const [fechaVencimiento, setFechaVencimiento] = useState<IState['fechaVencimiento']>('Ultimo descuento')

    const [errorPorcentaje, setErrorPorcentaje] = useState<IState['error']>()

    const [errorTope, setErrorTope] = useState<IState['error']>()

    const [errorFechaVencimiento, setErrorFechaVencimiento] = useState<IState['error']>()

    const onSubmit = (e:any) => {

        e.preventDefault()

        

    }



    return (
        <>
            <form className="row row-cols-1 row-cols-sm-2">
                <SimpleInput
                    inputId='nuevoAhorro'
                    labelText='Nombre: '
                    placeHolder='Ej: 40 % supermercados'
                    inputType='text'
                    OnChangeFunction={(e: any) => setNombreDescuento(e.target.value)}
                />

                <ComplexInput
                    inputId='newPorcentajeAhorro'
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
                    inputId='newTopeAhorro'
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

                <SimpleInput
                    inputId='nuevoVencimiento'
                    labelText='Vencimiento: '
                    inputType='date'
                    OnChangeFunction={
                        (e: any) => {
                            if (inputFechaVencimientoHandle(e) === 'inputError') {
                                setErrorFechaVencimiento('La fecha ingresada es anterior a la actual')
                            } else {
                                setFechaVencimiento(inputFechaVencimientoHandle(e))
                                setErrorFechaVencimiento('')
                            }
                        }
                    }
                    errorMessage={errorFechaVencimiento}
                />
                <div className="d-flex justify-content-center align-items-center py-3">
                    <input type="submit" value="Guardar descuento" className='btn btn-success my-3' />
                </div>
            </form>
        </>
    )
}
