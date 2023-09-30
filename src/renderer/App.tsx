import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FormikTest from './components/FormikTest';

function Hello() {
  return (
    <div className='p-5'>
      <FormikTest/>
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
