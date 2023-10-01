import { useContext, useEffect } from 'react';
import { StateContext } from '../contexts/StateContext';
import { Button } from './Button';
import { createLog } from '../utils/createLog';
// import { usePDF } from 'react-to-pdf';
import generatePDF from 'react-to-pdf';

const options = {
  method: 'build'
};

const getTargetElement = () => document.getElementById('PDF_Raport');

export const StepRaport = () => {
  // const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const { cryptoObject, setCryptoObject } = useContext(StateContext);
  useEffect(() => {
    createLog({
      type: 'UPDATE_DATA',
      data: {},
    });
  }, []);

  const handleClick = async () => {
    const a = await generatePDF(getTargetElement, options);
    // window.electron.ipcRenderer.sendMessage('generate-pdf', a.output(''));
    // toPDF();
    console.log(a.output("datauri"))
    
  };

  return (
    // <StateContext.Consumer>

    <div className="p-5 ">
      {/* <pre>{`${JSON.stringify(cryptoObject)}`}</pre> */}
      <div className='p-5' id="PDF_Raport">
      <h1 className="text-3xl text-center">
          Raport
        </h1>
        <h1 className="text-3xl text-center">
          {cryptoObject?.raportName}
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
        <div className="pt-10"></div>
        <table className=" text-[10px] mx-auto">
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
                      <td>
                        {exchange.value ? exchange.value + 'PLN' : 'Brak'}
                      </td>
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
        <h1 className="text-3xl text-right">Podsumowanie</h1>
        <h2 className="text-2xl text-right">
          Suma: {cryptoObject?.averagePrice} PLN
        </h2>
        <span className='text-xs'>Szacunkową średnią wartość kryptoaktywa została oszacowana na podstawie średniej wyceny z 3 źródeł*</span>
      </div>

      <Button color="bg-red-500" onClick={handleClick}>
        POBIERZ PDF
      </Button>
    </div>
    // </StateContext.Consumer>
  );
};
