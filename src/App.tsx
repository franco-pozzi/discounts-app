import './App.css';

import DiscountsContextProvider from './context/DiscountsContext';
import ErrorContextProvider from './context/ErrorContext';

import HomePage from './pages/HomePage/HomePage';


function App() {
  return (
    <DiscountsContextProvider>
      <ErrorContextProvider>
        <HomePage />
      </ErrorContextProvider>
    </DiscountsContextProvider>
  );
}

export default App;
