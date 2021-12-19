export const inputPorcentajeHandle = (e: any) => {
    const value: any = parseInt(e.target.value)

    if (value > 0 && value <= 100) {
        return value
    }
    else {
        return 'inputError'
    }
}

export const inputTopeReintegroHandle = (e: any) => {
    const value: any = parseInt(e.target.value)

    if (value >= 0 && value <= 10000000) {
        return value
    }
    else {
        return 'inputError'
    }
}

export const inputFechaVencimientoHandle = (e: any) => {  //Comprobamos que el usuario ingrese una fecha posterior a la actual
    const value: string = (e.target.value)
    const formatValue: number = parseInt(value.split('-').join(''))

    const actualDate: Date = new Date()
    const formatActualDate: number = parseInt([actualDate.getFullYear(), (actualDate.getMonth() + 1), actualDate.getDate()].join(''))

    if (formatActualDate - formatValue <= 0) {
        return value.split('-').reverse().join('-')
    }
    else {
        return 'inputError'
    }
}