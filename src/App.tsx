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
        <div className='container'>
          <div className='row align-items-center justify-content-center'>
            <InfoHome />
            <DiscountCalculator />
            <CreateDiscount />
          </div>
        </div>
        <div className="container list__discount">
          <ListOfDiscount />
        </div>
        <ErrorToast />
      </ErrorContextProvider>
    </DiscountsContextProvider>
  );
}

export default App;
