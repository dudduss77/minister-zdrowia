import { useContext, useEffect } from 'react';
import { StateContext } from '../contexts/StateContext';
import { Button } from './Button';
import { createLog } from '../utils/createLog';
// import { usePDF } from 'react-to-pdf';
import generatePDF from 'react-to-pdf';

const options = {
  method: 'build',
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
    console.log(a.output('arraybuffer'));
    window.electron.ipcRenderer.sendMessage('generate-pdf', {
      blob: a.output('arraybuffer'),
      id: cryptoObject?.ID,
    });
    // toPDF();
    // console.log(a.output("datauri"))
  };

  return (
    <div className="p-5 ">
      <div className="p-5" id="PDF_Raport">
        <h1 className="text-3xl text-center">Raport {cryptoObject?.ID}</h1>
        <h1 className="text-3xl text-center">{cryptoObject?.raportName}</h1>
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
          <tr className="text-center">
            <th className="zero-margin">Nazwa kryptoaktywa</th>
            <th className="zero-margin">Ilość kryptoaktywa</th>
            <th className="zero-margin">Kantor/GIełda</th>
            <th className="zero-margin">Link</th>
            <th className="zero-margin">Koszt za jedną kryptowalute</th>
            <th className="zero-margin">Suma</th>
            <th className="zero-margin">Czy przeliczono z USD?</th>
            <th className="zero-margin">Kurs USD NBP</th>
          </tr>
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
                      {exchange.value
                        ? exchange.currency === 'USD'
                          ? (
                              +(cryptoObject.averageNbpExchangeRate || 0) *
                              +exchange.value
                            ).toFixed(2) + ' PLN'
                          : +exchange.value.toFixed(2) + ' PLN'
                        : 'Brak'}
                    </td>
                  </tr>
                ))}
              </td>
              <td className="border-r border-b border-solid border-black">
                {crypto.exchangeRate.map((exchange, index) => (
                  <tr key={index}>
                    <td>
                      {exchange.value
                        ? exchange.currency === 'USD'
                          ? (
                              +(
                                exchange.value *
                                +(cryptoObject.averageNbpExchangeRate || 0)
                              ) * +crypto.quantity
                            ).toFixed(2) + ' PLN'
                          : (+exchange.value * +crypto.quantity).toFixed(2) +
                            ' PLN'
                        : 'Brak'}
                    </td>
                  </tr>
                ))}
              </td>
              <td className="border-r border-b border-solid border-black">
                {crypto.exchangeRate.map((exchange, index) => (
                  <tr key={index}>
                    <td>{exchange.currency === 'USD' ? 'TAK' : 'NIE'}</td>
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
        </table>

        <div className="pt-10"></div>
        <h1 className="text-3xl text-right">Podsumowanie</h1>
        <h2 className="text-2xl text-right">
          Suma:{' '}
          {cryptoObject?.cryptos
            .reduce((accumulator, currentValue) => {
              const sum = currentValue.exchangeRate.reduce(
                (acc, cur) =>
                  acc +
                  (cur.currency === 'USD' && cur.value
                    ? currentValue.quantity *
                      cur.value *
                      (cryptoObject.averageNbpExchangeRate || 0)
                    : currentValue.quantity * (cur.value || 0)),
                0,
              );
              return accumulator + sum;
            }, 0)
            .toFixed(2)}{' '}
          PLN
        </h2>
        <span className="text-xs">
          Szacunkową średnią wartość kryptoaktywa została oszacowana na
          podstawie średniej wyceny z 3 źródeł*
        </span>
      </div>

      <Button color="bg-red-500" onClick={handleClick}>
        POBIERZ PDF
      </Button>
    </div>
    // </StateContext.Consumer>
  );
};
