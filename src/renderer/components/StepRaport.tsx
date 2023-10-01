import { useEffect } from 'react';
import { StateContext } from '../contexts/StateContext';
import { Button } from './Button';
import { createLog } from '../utils/createLog';

export const StepRaport = () => {

  useEffect(() => {
    createLog({
      type: 'UPDATE_DATA',
      data: {}
    })
  }, [])
  
  return (
    <StateContext.Consumer>
      {({ cryptoObject, setCryptoObject }) => (
        <div className="p-5">
          RAPORT STEP
          <Button color="bg-red-500" onClick={() => console.log('pobierz')}>
            POBIERZ PDF
          </Button>
        </div>
      )}
    </StateContext.Consumer>
  );
};
