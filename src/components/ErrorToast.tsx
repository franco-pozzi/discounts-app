import { useContext } from 'react'
import { ErrorContext } from '../context/ErrorContext'

import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { AiOutlineClose } from 'react-icons/ai'



export default function ErrorToast() {

    const { selectedToast, setSelectedToast } = useContext(ErrorContext)


    if (selectedToast.length === 0) {
        return <></>
    }

    if (selectedToast === 'discount-added') {
        return (
            <>
                <ToastContainer className="p-3">
                    <Toast bg={'success'} onClose={() => setSelectedToast([])} delay={1800} autohide>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Descuento agregado</strong>
                            <button className='toast-button' onClick={() => setSelectedToast([])} > <AiOutlineClose /> </button>
                        </Toast.Header>
                        <Toast.Body>Haz agregado correctamente el descuento</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }

    if (selectedToast === 'discount-deleted') {
        return (
            <>
                <ToastContainer className="p-3">
                    <Toast bg={'success'}  onClose={() => setSelectedToast([])} delay={1800} autohide>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Descuento eliminado</strong>
                            <button className='toast-button' onClick={() => setSelectedToast([])} > <AiOutlineClose /> </button>
                        </Toast.Header>
                        <Toast.Body>Haz eliminado correctamente el descuento</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }

    if (selectedToast === 'purchase-added') {
        return (
            <>
                <ToastContainer className="p-3">
                    <Toast bg={'success'}  onClose={() => setSelectedToast([])} delay={1800} autohide>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Compra agregada</strong>
                            <button className='toast-button' onClick={() => setSelectedToast([])} > <AiOutlineClose /> </button>
                        </Toast.Header>
                        <Toast.Body>Haz agregado correctamente la compra a tu lista</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }

    if (selectedToast === 'purchase-deleted') {
        return (
            <>
                <ToastContainer className="p-3">
                    <Toast bg={'success'}  onClose={() => setSelectedToast([])} delay={1800} autohide>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Compra eliminada</strong>
                            <button className='toast-button' onClick={() => setSelectedToast([])} > <AiOutlineClose /> </button>
                        </Toast.Header>
                        <Toast.Body>Haz eliminado correctamente la compra de tu lista</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }

    else {
        return (
            <>
                <ToastContainer className="p-3">
                    <Toast bg={'danger'}  onClose={() => setSelectedToast([])} delay={1800} autohide>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">ERROR</strong>
                            <button className='toast-button' onClick={() => setSelectedToast([])} > <AiOutlineClose /> </button>
                        </Toast.Header>
                        <Toast.Body>{''}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }
}