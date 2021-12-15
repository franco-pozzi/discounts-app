export default function SimpleInput({ inputId, labelText, placeHolder, inputType, OnChangeFunction, errorMessage }: any) {
    return (
        <>
            <div className='col my-2'>
                <label className='form-label' htmlFor={inputId}>{labelText}</label>
                <input className='form-control text-center' id={inputId} placeholder={placeHolder} type={inputType} onChange={OnChangeFunction} />
            </div>
            {errorMessage && <span className='col my-3 w-100 text-center'>* {errorMessage}</span>}
        </>
    )
}
