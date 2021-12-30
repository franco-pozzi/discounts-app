export default function ComplexInput({ inputId, labelText, placeHolder, inputType, OnChangeFunction, inputText, errorMessage, value }: any) {
    return (
        <>
            {/* <label className='col px-2 pt-3 m-0 fw-bold fs-5' htmlFor={inputId}>{labelText}</label>
            <div className="col m-0 px-2 pt-2">
                <div className="input-group flex-nowrap input__border">
                    {inputText === '$' && <span className='input-group-text bg-light'>{inputText}</span>}
                    
                    <input className={`form-control text-center ${errorMessage && 'input-error'}`}  id={inputId} placeholder={placeHolder} type={inputType} onChange={OnChangeFunction} value={value || ''}/>
                    
                    {inputText === '%' && <span className='input-group-text bg-light'>{inputText}</span>}                    
                </div>                
            </div> */}



            <div className="col my-3">
                <div className="input__border">
                    <label className='input__label' htmlFor={inputId}>{labelText}</label>
                    <div className='input__span'>
                        {inputText === '$' && <span className='input__style pe-2'>{inputText}</span>}
                        
                        <input className='input__style text-center w-50' id={inputId} type={inputType} onChange={OnChangeFunction} value={value || ''} />
                        
                        {inputText === '%' && <span className='input__style ps-2'>{inputText}</span>} 
                    </div>
                </div>    
                {errorMessage && <div className='fw-light text-center error__font w-100' style={{ color: 'red' }}>* {errorMessage}</div>}              
            </div>
                      
        </>
    )
}



// export default function ComplexInput({ inputId, labelText, placeHolder, inputType, OnChangeFunction, inputText, errorMessage, value }: any) {
//     return (
//         <>
//             <label className='col px-2 pt-3 m-0 fw-bold fs-5' htmlFor={inputId}>{labelText}</label>
//             <div className="col m-0 px-2 pt-2">
//                 <div className="input-group flex-nowrap input__border">
//                     {inputText === '$' && <span className='input-group-text bg-light'>{inputText}</span>}
                    
//                     <input className={`form-control text-center ${errorMessage && 'input-error'}`}  id={inputId} placeholder={placeHolder} type={inputType} onChange={OnChangeFunction} value={value || ''}/>
                    
//                     {inputText === '%' && <span className='input-group-text bg-light'>{inputText}</span>}                    
//                 </div>                
//             </div>
//             {errorMessage && <div className='mt-2 fw-light text-center error__font w-100' style={{ color: 'red' }}>* {errorMessage}</div>}            
//         </>
//     )
// }

