import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { StateContext } from '../contexts/StateContext';

export const StepFirst = () => {
  const navigate = useNavigate();

  return (
    <StateContext.Consumer>
      {({ cryptoObject, setCryptoObject }) => (
        <div className="p-5">
          FIRST STEP
          <Button color="bg-red-500" onClick={() => navigate('/second-step')}>
            GENERUJ
          </Button>
        </div>
      )}
    </StateContext.Consumer>
  );
};
