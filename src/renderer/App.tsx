import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Button } from './components/Button';


function Hello() {
  const [loading, setLoading] = useState(false);

  const handleClickGeneratePdf = () => {
    window.electron.ipcRenderer.sendMessage('generate-pdf', {
      id: uuid(),
      reasonNumber: 'Numer sprawy',
      ownersData: 'Jarosław Bińczyk ul Bawełniana 74 94-222 Torun',
      averagePrice: 10,
      averageNbpExchangeRate: 50,
      cryptos: [
        {
          name: 'Bitcoin',
          shortName: 'BTC',
          quantity: 10,
          exchangeRate: [
            {
              link: "https://www.chmes.pl/produkt/benzoesan-denatonium-bitrex",
              name: 'wadwa',
            },
            {
              link: "https://www.chmes.pl/produkt/benzoesan-denatonium-bitrex",
              name: 'wadwa',
            },
            {
              link: "https://www.chmes.pl/produkt/benzoesan-denatonium-bitrex",
              name: 'wadwa',
            },
          ]
        }
      ]
    });
  }

  return (
    <div>
      <div className="w-36 h-36 bg-red-700">abc</div>
      <Button
        color="bg-red-500"
        loading={loading}
        onClick={handleClickGeneratePdf}
      >
        GENERUJ
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
