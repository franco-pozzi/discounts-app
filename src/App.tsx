import './App.css';
import DiscountCalculator from './sections/DiscountCalculator';
import CreateDiscount from './sections/CreateDiscount';
import ListOfDiscount from './sections/ListOfDiscount';
import ErrorToast from './components/ErrorToast';

import DiscountsContextProvider from './context/DiscountsContext';
import ErrorContextProvider from './context/ErrorContext';




function App() {

  return (
    <DiscountsContextProvider>
      <ErrorContextProvider>
      <section className='container my-3 py-2'>
        <div className='py-2'>
          <h1 className="text-center">Calculadora de beneficios cuenta dni</h1>
        </div>
        <div className="py-2">
          <p>
            Podrás ingresar los descuentos que vayas a utilizar, llevar la cuenta de cuánto gastas y cuánto te queda por gastar.
          </p>
        </div>
        <div className="py-2">
          <h2>Cómo utilizar la calculadora:</h2>
          <p className='my-1'>Lo único que deberás hacer es completar los campos solicitados a continuación.</p>
        </div>
        <div className="py-2">
          <DiscountCalculator />
        </div>
      </section>

      <section className="container my-2 py-2">
        <h2 className="py-2 text-center">Mis descuentos</h2>
        <p className="my-1">
          Podrás llevar la cuenta de los descuentos que estás utilizando y maximizar tu ahorro.
        </p>
        <CreateDiscount />
      </section>

      <section className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
          <ListOfDiscount />
        </div>
      </section>    
      <ErrorToast/>
    </ErrorContextProvider>
    </DiscountsContextProvider>
  );
}

export default App;
