import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import RemoveButton from './components/RemoveButton';
import FormikTest from './components/FormikTest';

import { Button } from './components/Button';
import ExchangeRates from './components/ExchangeRates';
import InputCryptoWrapper from './components/InputCryptoWrapper';

function Hello() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="p-5">
      <div className="p-4">
        <RemoveButton />
      </div>
      <FormikTest />
      <div className="w-36 h-36 bg-red-700">abc</div>
      <Button
        color="bg-red-500"
        className="w-full"
        loading={loading}
        onClick={() => setLoading(true)}
      >
        GENERUJ
      </Button>
      <ExchangeRates />
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
