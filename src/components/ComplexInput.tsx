export default function ComplexInput({ inputId, labelText, placeHolder, inputType, OnChangeFunction, inputText, errorMessage, value }: any) {
    return (
        <>
            <label className='col my-2' htmlFor={inputId}>{labelText}</label>
            <div className="col my-2">
                <div className="input-group flex-nowrap ">
                    {inputText === '$' && <span className='input-group-text'>{inputText}</span>}
                    <input className={`form-control text-center ${errorMessage && 'input-error'}`}  id={inputId} placeholder={placeHolder} type={inputType} onChange={OnChangeFunction} value={value || ''}/>
                    {inputText === '%' && <span className='input-group-text'>{inputText}</span>}
                </div>
            </div>

            {errorMessage && <span className='col mb-2 w-100 text-center' style={{ color: 'red' }}>* {errorMessage}</span>}
        </>
    )
}
