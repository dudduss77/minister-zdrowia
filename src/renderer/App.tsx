import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RemoveButton from './components/RemoveButton';
import FormikTest from './components/FormikTest';
import { useState } from 'react';

import { Button } from './components/Button';

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
        loading={loading}
        onClick={() => setLoading(true)}
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
