import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RemoveButton from './components/RemoveButton';

function Hello() {
  return (
    <div>
      <div className='p-4'>
        <RemoveButton />        
      </div>

      <div className="w-36 h-36 bg-red-700">abc</div>
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
