import { StateContext } from '../contexts/StateContext';
import { Button } from './Button';

export const StepRaport = () => {
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