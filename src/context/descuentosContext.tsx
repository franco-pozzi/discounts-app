import { createContext, useState, useEffect } from "react"

interface IState {
    nombreDescuento: string,
    porcentajeDescuento: number,
    topeDescuento: number,
    vencimientoDescuento: string,
    gastoMaximo: number,
    importeRestante: number,
    diasRestantes: number
}




export const descuentosContext = createContext('no-provider')


export default function DescuentosContextProvider({ children }: any) {

    const [nombreDescuento, setNombreDescuento] = useState<IState['nombreDescuento']>()

    const [porcentajeDescuento, setPorcentajeDescuento] = useState<IState['porcentajeDescuento']>()

    const [topeDescuento, setTopeDescuento] = useState<IState['topeDescuento']>()

    const [vencimientoDescuento, setVencimientoDescuento] = useState<IState['vencimientoDescuento']>()

    const [gastoMaximo, setGastoMaximo] = useState<IState['gastoMaximo']>()

    const [importeRestante, setImporteRestante] = useState<IState['importeRestante']>()

    const [diasRestantes, setDiasRestantes] = useState<IState['diasRestantes']>()






    useEffect(() => {
        if (topeDescuento && porcentajeDescuento) {
            setGastoMaximo(parseInt((topeDescuento * (100 / porcentajeDescuento)).toFixed(2)))
        }

    }, [topeDescuento, porcentajeDescuento])





    return (
        <descuentosContext.Provider value={'hola'}>
            {children}
        </descuentosContext.Provider>
    )
}