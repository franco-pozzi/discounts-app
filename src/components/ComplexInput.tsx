export default function ComplexInput({ inputId, labelText, placeHolder, inputType, OnChangeFunction, inputText, errorMessage, value }: any) {
    return (
        <>
            <div className="col my-2 px-3">
                <div className="input__border">
                    <label className='input__label' htmlFor={inputId}>{labelText}</label>
                    <div className='input__span'>
                        {inputText === '$' && <span className='input__style pe-2'>{inputText}</span>}

                        <input className='input__style text-center w-50' id={inputId} type={inputType} onChange={OnChangeFunction} value={value || ''} />

                        {inputText === '%' && <span className='input__style ps-2'>{inputText}</span>}
                    </div>
                </div>
                {errorMessage && <div className='fw-light mt-2 text-center error__font w-100' style={{ color: 'red' }}>* {errorMessage}</div>}
            </div>
        </>
    )
}