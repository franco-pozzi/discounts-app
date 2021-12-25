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
        <section className='container p-3'>
          <div className='modified__border p-2'>
            <h1 className="text-center fs-3 fw-bold py-3 m-0">Calculadora y seguimiento de descuentos</h1>
            <p className='p-2 m-0 fs-6'>
              El objetivo de esta aplicación es mejorar tus finanzas, no solo con una calculadora de descuentos
              que te indica el monto máximo que puedes gastar, sino que también puedes agregar tus descuentos,
              tus compras diarias y así llevar un seguimiento de cuánto estás ahorrando.
            </p>
          </div>

          <div className='modified__border my-5 p-2'>
            <h2 className='pt-3 pb-2 text-center fw-bold fs-3 m-0'>Calculadora de descuentos</h2>
            <p className='px-2 pt-2 m-0 fs-6'>Completa los siguientes campos y sabé cuánto puedes gastar.</p>

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
        <ErrorToast />
      </ErrorContextProvider>
    </DiscountsContextProvider>
  );
}

export default App;
