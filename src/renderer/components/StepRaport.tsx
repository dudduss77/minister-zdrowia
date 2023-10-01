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
      {/* <pre>{`${JSON.stringify(cryptoObject)}`}</pre> */}
      <h1 className="text-3xl text-center">
        Raport windykacji {cryptoObject?.ID}
      </h1>
      <div className="flex flex-col pt-10">
        <span>
          <label className="font-bold">Nazwa organu egzekucyjnego:</label>{' '}
          {cryptoObject?.organizationName}
        </span>
        <span>
          <label className="font-bold">Numer sprawy:</label>{' '}
          {cryptoObject?.reasonNumber}
        </span>
        <span>
          <label className="font-bold">
            Dane identyfikujące właściciela kryptoaktywa:
          </label>{' '}
          {cryptoObject?.ownersData}
        </span>
      </div>
      {/* <div className="flex font-bold text-center">
        <div className="flex-1 border-solid border-2 ">Nazwa kryptoaktywa</div>
        <div className="flex-1 border-solid border-2">Ilość kryptoaktywa</div>
        <div className="flex-1 border-solid border-2">Kantor/GIełda</div>
        <div className="flex-1 border-solid border-2">Link</div>
      </div> */}

      {/* {cryptoObject?.cryptos.map((crypto) => (
        <div className="flex">
          <div className="flex-1 border-solid border-2">{crypto.name}</div>
          <div className="flex-1 border-solid border-2">{crypto.quantity}</div>
          <div className="flex-1 flex flex-col border-solid border-2">
            {crypto.exchangeRate.map((exchange) => (
              <>
                <div>{exchange.name}</div>
              </>
            ))}
          </div>
          <div className="flex-1 flex flex-col border-solid border-2">
            {crypto.exchangeRate.map((exchange) => (
              <>
                <div>{exchange.link}</div>
              </>
            ))}
          </div>
        </div>
      ))} */}
      <div className="pt-10"></div>
      <table className="">
        <tbody>
          <tr className="text-center">
            <th>Nazwa kryptoaktywa</th>
            <th>Ilość kryptoaktywa</th>
            <th>Kantor/GIełda</th>
            <th>Link</th>
            <th>Koszt za jedną kryptowalute</th>
            <th>Suma</th>
            <th>Czy przeliczono z USD?</th>
            <th>Kurs USD NBP</th>
          </tr>
        </tbody>
        <tbody>
          {cryptoObject?.cryptos.map((crypto, index) => (
            <tr key={index}>
              <td className="border-r border-b border-solid border-black">
                {crypto.name}
              </td>
              <td className="border-r border-b border-solid border-black">
                {crypto.quantity}
              </td>
              <td className="border-r border-b border-solid border-black">
                {crypto.exchangeRate.map((exchange, index) => (
                  <tr>
                    <td>{exchange.name}</td>
                  </tr>
                ))}
              </td>
              <td className="border-r border-b border-solid border-black">
                {crypto.exchangeRate.map((exchange, index) => (
                  <tr key={index}>
                    <td>{exchange.link}</td>
                  </tr>
                ))}
              </td>
              <td className="border-r border-b border-solid border-black">
                {crypto.exchangeRate.map((exchange, index) => (
                  <tr key={index}>
                    <td>{exchange.value ? exchange.value + 'PLN' : 'Brak'}</td>
                  </tr>
                ))}
              </td>
              <td className="border-r border-b border-solid border-black">
                {crypto.exchangeRate.map((exchange, index) => (
                  <tr key={index}>
                    <td>
                      {exchange.value
                        ? exchange.value * crypto.quantity + 'PLN'
                        : 'Brak'}
                    </td>
                  </tr>
                ))}
              </td>
              <td className="border-r border-b border-solid border-black">
                {crypto.exchangeRate.map((exchange, index) => (
                  <tr key={index}>
                    <td>TAK</td>
                  </tr>
                ))}
              </td>
              <td className="border-r border-b border-solid border-black">
                {crypto.exchangeRate.map((exchange, index) => (
                  <tr key={index}>
                    <td>{cryptoObject.averageNbpExchangeRate}</td>
                  </tr>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="pt-10"></div>
      <h1 className='text-3xl text-right'>Podsumowanie</h1>
      <h1 className='text-2xl text-right'>Suma: {cryptoObject?.averagePrice} PLN</h1>

      <Button color="bg-red-500" onClick={handleClick}>
        POBIERZ PDF
      </Button>
    </div>
    // </StateContext.Consumer>
  );
};
