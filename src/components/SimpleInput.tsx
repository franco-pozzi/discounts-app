export default function SimpleInput({ inputId, labelText, inputType, OnChangeFunction, errorMessage, value }: any) {
    return (
        <>
            <div className="col my-2 px-3">
                <div className="m-0 input__border">
                    <label className='input__label' htmlFor={inputId}>{labelText}</label>
                    <input className='input__style w-100 text-end' id={inputId} type={inputType} onChange={OnChangeFunction} value={value || ''} />
                </div>
                {errorMessage && <div className='mt-2 fw-light text-center error__font w-100' style={{ color: 'red' }}>* {errorMessage}</div>}
            </div>
        </>
    )
}