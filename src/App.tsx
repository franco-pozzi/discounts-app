import './App.css';
import CreateForm from './components/CreateForm';
import CreadorDescuento from './components/MisDescuentos';
import Descuento from './components/Descuento';




function App() {
  return (
    <>
      <section className='container my-2 py-2'>
        <div className='py-2'>
          <h1 className="text-center">Calculadora de beneficios cuenta dni</h1>
        </div>
        <div className="py-2">
          <p>
            Podras ingresar los descuentos que vayas a utilizar, llevar la cuenta de cuanto gastaste y cuanto te queda por gastar.
          </p>
        </div>
        <div className="py-2">
          <h2>Como utilizar la calculadora:</h2>
          <p className='my-1'>Lo unico que deberas hacer es completar los campos solicitados a continuacion.</p>
        </div>
        <div className="py-2">
          <CreateForm />
        </div>
      </section>

      <section className="container my-2 py-2">
        <h2 className="py-2 text-center">Mis descuentos</h2>
        <p className="my-1">
          Podras llevar la cuenta de los descuentos que estas ultilizando y maximizar tu ahorro.
        </p>
        <CreadorDescuento />
        <Descuento />
      </section>
    </>
  );
}

export default App;
