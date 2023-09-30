import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { StateContext } from '../contexts/StateContext';

export const StepSecond = () => {
  const navigate = useNavigate();

  return (
    <StateContext.Consumer>
      {({ cryptoObject, setCryptoObject }) => (
        <div className="p-5">
          SECOND STEP
          <Button color="bg-red-500" onClick={() => navigate('/second-step')}>
            PRZEGENERUJ
          </Button>
        </div>
      )}
    </StateContext.Consumer>
  );
};
