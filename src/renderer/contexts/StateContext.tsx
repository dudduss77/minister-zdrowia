import { useEffect, useState, ReactNode, createContext } from 'react';
import { TCryptoObject } from '../../types/TCryptoObject';

type TStateContext = {
  cryptoObject?: TCryptoObject;
  setCryptoObject?: React.Dispatch<any>;
};

export const StateContext = createContext<TStateContext>({});

type Props = {
  children: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const [cryptoObject, setCryptoObject] = useState<TCryptoObject>({
    ID: null,
    raportName: 'Szacowanie wartości kryptoaktywów',
    dateOfGenerate: null,
    reasonNumber: null,
    ownersData: null,
    averagePrice: null,
    averageNbpExchangeRate: null,
    cryptos: [],
  });

  return (
    <StateContext.Provider value={{ cryptoObject, setCryptoObject }}>
      {children}
    </StateContext.Provider>
  );
};
