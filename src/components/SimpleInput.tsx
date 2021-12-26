export default function SimpleInput({ inputId, labelText, placeHolder, inputType, OnChangeFunction, errorMessage, value }: any) {
    return (
        <>
            <label className='col px-2 pt-3 m-0 fw-bold fs-5' htmlFor={inputId}>{labelText}</label>
            <div className="col m-0 px-2 pt-2">
                <div className="input-group flex-nowrap input__border">
                    <input className={`form-control text-center ${errorMessage && 'input-error'}`} id={inputId} placeholder={placeHolder} type={inputType} onChange={OnChangeFunction} value={value || ''} />
                </div>
            </div>
            {errorMessage && <div className='mt-2 fw-light text-center error__font' style={{ color: 'red' }}>* {errorMessage}</div>}
        </>
    )
}
