import './App.css';

import InfoHome from './sections/InfoHome';
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

        <InfoHome />

        <DiscountCalculator />


        <section className="container p-3">
          <div className='modified__border my-4 px-2'>
            <h3 className="pt-4 pb-2 text-center fw-bold fs-3 m-0">Mis descuentos</h3>
            <p className='px-2 pt-2 m-0 fs-6'>
              Podrás llevar la cuenta de los descuentos que estás utilizando y maximizar tu ahorro.
            </p>
            <CreateDiscount />
          </div>
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
