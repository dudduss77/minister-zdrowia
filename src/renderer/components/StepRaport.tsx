import { useContext, useEffect } from 'react';
import { StateContext } from '../contexts/StateContext';
import { Button } from './Button';
import { createLog } from '../utils/createLog';
import { generatePdf } from '../../utils/pdfService';

export const StepRaport = () => {
  const { cryptoObject, setCryptoObject } = useContext(StateContext);
  useEffect(() => {
    createLog({
      type: 'UPDATE_DATA',
      data: {},
    });
  }, []);

  const handleClick = () => {
    window.electron.ipcRenderer.sendMessage('generate-pdf', cryptoObject);
  };

  return (
    // <StateContext.Consumer>

    <div className="p-5">
      <pre>{`${JSON.stringify(cryptoObject)}`}</pre>
      <Button color="bg-red-500" onClick={handleClick}>
        POBIERZ PDF
      </Button>
    </div>
    // </StateContext.Consumer>
  );
};
