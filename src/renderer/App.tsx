import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { StepFirst } from './components/StepFirst';
import ExchangeRates from './components/ExchangeRates';
import InputCryptoWrapper from './components/InputCryptoWrapper';
import { StepSecond } from './components/StepSecond';
import { StepRaport } from './components/StepRaport';
import { TCryptoObject } from '../types/TCryptoObject';
import generateReport from '../api/contextModifiers/generateReport';
import StateProvider from './contexts/StateContext';
// import { useState } from 'react';
// import RemoveButton from './components/RemoveButton';
// import FormikTest from './components/FormikTest';

// import { Button } from './components/Button';
// import { StateContext } from './contexts/StateContext';


function Hello() {
  return (
    <div className="p-5">
      {/* <div className="p-4">
        <RemoveButton />
      </div>
      <FormikTest />
      <div className="w-36 h-36 bg-red-700">abc</div>
      <Button
        color="bg-red-500"
        className="w-full"
        loading={loading}
        onClick={handleClickGeneratePdf}
      >
        GENERUJ
      </Button> */}
      <ExchangeRates />
    </div>
  );
}

export default function App() {
  // const xd: TCryptoObject = {
  //   ID: 'dasdasdsa',
  //   raportName: 'Szacowanie wartości kryptoaktywów',
  //   dateOfGenerate: '12-01-2023',
  //   reasonNumber: '23123132321',
  //   ownersData: 'Andrzej Duad',
  //   averagePrice: null,
  //   averageNbpExchangeRate: null,
  //   // averageNbpExchangeRate: 4.23,
  //   cryptos: [
  //     {
  //       name: 'Polkadot',
  //       shortName: 'DOT',
  //       quantity: 5000,
  //       exchangeRate: [
  //         // {
  //         //   link: 'dasdsa',
  //         //   name: 'dasdasdsa',
  //         //   value: 25000,
  //         //   currency: 'USD',
  //         // },
  //         // {
  //         //   link: '',
  //         //   name: '',
  //         //   value: null,
  //         //   currency: 'USD',
  //         // },
  //       ],
  //     },
  //   ],
  // };

  // generateReport(xd);

  return (
    <Router>
      <StateProvider>
        <Routes>
          {/* <Route path="/" element={<Hello />} /> */}
          <Route path="/" element={<StepFirst />} />
          <Route path="/second-step" element={<StepSecond />} />
          <Route path="/raport" element={<StepRaport />} />
        </Routes>
      </StateProvider>
    </Router>
  );
}
