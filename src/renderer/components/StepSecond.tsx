import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { StateContext } from '../contexts/StateContext';
import { useEffect } from 'react';
import { createLog } from '../utils/createLog';

export const StepSecond = () => {
  const navigate = useNavigate();

  useEffect(() => {
    createLog({
      type: 'SET_DATA',
      data: {}
    })
  }, [])

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
