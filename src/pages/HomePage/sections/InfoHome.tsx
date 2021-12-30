import { useContext } from "react"

import { DiscountsContext } from "../../../context/DiscountsContext"

export default function InfoHome() {

    const { allUserDiscounts } = useContext(DiscountsContext)

    return (
        <section className={`col-12 col-md-10 col-lg-6 p-3 ${allUserDiscounts.length > 0 && 'col-xl-3 '}`}>
            <div className='modified__border p-2 info__home'>
                <h1 className="text-center py-2 m-0">Calculadora y seguimiento de descuentos</h1>
                <p className='px-2 py-2 m-0 info__paragraph'>
                    El objetivo de esta aplicación es mejorar tus finanzas, no solo con una calculadora de descuentos
                    que te indica el monto máximo que puedes gastar, sino que también puedes agregar tus descuentos,
                    tus compras diarias y así llevar un seguimiento de cuánto estás ahorrando.
                </p>
            </div>
        </section>
    )
}
