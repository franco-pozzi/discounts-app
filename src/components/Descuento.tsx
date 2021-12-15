import { BsTrash } from 'react-icons/bs'

export default function Descuento() {





    return (
        <div className='container my-3'>
            <div className='row border' style={{ maxWidth: '334px' }}>
                <div className='d-flex justify-content-end my-1 px-1'>
                    <button type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <ul className='text-center my-2 fs-4'>
                    <li >40% en supermercados</li>
                    <li className='my-2'>25% de ahorro, tope de $1000</li>
                    <li className='my-2'>vencimiento: 18-12-2021</li>
                </ul>
                <div className="border-top my-1"></div>
                <ul className='my-2'>
                    <li className="d-flex justify-content-between fs-5" style={{ paddingRight: '22%' }}>
                        <span className='fw-bolder '>Gasto maximo </span>
                        <span className='text-end'> $5000</span>
                    </li>

                    <div className='my-1 text-end' style={{ paddingRight: '44%' }}>-</div>

                    <div className='d-flex flex-row'>
                        <div className='d-flex flex-column w-100'>
                            <li className="d-flex justify-content-between fs-5">
                                <span className='fw-bolder'>Compra</span>
                                <span className='text-end'> $4000</span>
                            </li>
                            <li className='my-0 fs-6'>09-12-2021</li>
                        </div>
                        <div className='d-flex justify-content-end align-items-center me-2' style={{ width: '25%' }}>
                            <BsTrash />
                        </div>
                    </div>

                    <div className='my-1 text-end' style={{ paddingRight: '44%' }}>-</div>

                    <div className='d-flex flex-row'>
                        <div className='d-flex flex-column w-100'>
                            <li className="d-flex justify-content-between fs-5">
                                <span className='fw-bolder'>Compra</span>
                                <span className='text-end'> $500</span>
                            </li>
                            <li className='my-0 fs-6'>10-12-2021</li>
                        </div>
                        <div className='d-flex justify-content-end align-items-center me-2' style={{ width: '25%' }}>
                            <BsTrash />
                        </div>
                    </div>
                    
                </ul>
                <div className="border-top my-2"></div>
                <ul className='my-2'>
                    <li className="d-flex justify-content-between fs-5" style={{ paddingRight: '22%' }} >
                        <span className='fw-bolder'>Restan:</span>
                        <span className='text-end'> $1000</span>
                    </li>
                    <li className='my-0 fs-6'>09 dias restantes</li>
                </ul>
                <div className='input-group my-3 fs-5'>
                    <span className='input-group-text col-7 px-1 justify-content-between'>
                        <span className="text-start">Agregar compra:</span>
                        <span className="text-end">$</span>
                    </span>
                    <input type="number" placeholder='500' className='form-control col-2 text-center' />
                    <button className='btn btn-outline-success col-2' >+</button>
                </div>
            </div>

        </div>
    )
}
