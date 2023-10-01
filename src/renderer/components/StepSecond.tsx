import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { StateContext } from '../contexts/StateContext';
import { format, parseISO } from 'date-fns';
import * as Yup from 'yup';
import { useContext } from 'react';

export const StepSecond = () => {
  const navigate = useNavigate();
  const { cryptoObject, setCryptoObject } = useContext(StateContext);

  const TestSchema = Yup.object().shape({
    exchangeRate: Yup.array().of(
      Yup.object().shape({
        link: Yup.string().required('Pole wymagane'),
        name: Yup.string().required('Pole wymagane'),
        value: Yup.number().required('Pole wymagane'),
      }),
    ),
  });

  return (
    <div className="p-5 max-w-screen-md mx-auto h-screen">
      <h2>Nazwa organizacji: {cryptoObject?.raportName}</h2>
      <h2>Numer sprawy: {cryptoObject?.reasonNumber}</h2>
      <h2>Dane właściciela kryptoaktywów: {cryptoObject?.ownersData}</h2>
      <h2>Numer ID raportu: {cryptoObject?.ID}</h2>
      <h2>
        Data wykonania raportu:{' '}
        {cryptoObject?.dateOfGenerate
          ? format(parseISO(cryptoObject.dateOfGenerate), 'DD-MM-RRRR')
          : 'Oczekuje na uzupełnienie danych'}
      </h2>
      <h2>Szacunkowa średnia wartość w PLN: {cryptoObject?.averagePrice}</h2>
      <h2>
        Średni kurs USD ustalony przez NBP:{' '}
        {cryptoObject?.averageNbpExchangeRate}
      </h2>
      {cryptoObject?.cryptos.length}
      {cryptoObject?.cryptos?.map((el, i) => (
        <div key={i}>
          <h2>{`${el.name} (${el.shortName}), ilość aktywów: ${el.quantity}`}</h2>
          {el.exchangeRate?.map((exchangeRate, index) => (
            <div key={index}>
              <h3>Link: {exchangeRate.link}</h3>
              <h3>Nazwa: {exchangeRate.name}</h3>
              <h3>
                Sredni wartość za 1 coin:{' '}
                {exchangeRate.value
                  ? `${exchangeRate.value} ${exchangeRate.currency}`
                  : 'Brak aktywa na giełdzie'}
              </h3>
            </div>
          ))}
        </div>
      ))}

      <Button color="bg-red-500" onClick={() => navigate('/second-step')}>
        GENERUJ RAPORT
      </Button>
    </div>
  );
};
