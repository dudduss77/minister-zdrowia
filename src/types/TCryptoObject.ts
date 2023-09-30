import { TExchangeRate } from './TExchangeRate';

export type TCrypto = {
  name: string; // Bitcoin
  shortName: string; // BTC
  quantity: number;
  exchangeRate: TExchangeRate[];
};

export type TCryptoObject = {
  ID: string;
  raportName: 'Szacowanie wartości kryptoaktywów';
  dateOfGenerate: string; // Date
  reasonNumber: string;
  ownersData: string;
  averagePrice: number | null;
  averageNbpExchangeRate: number;
  cryptos: TCrypto[];
};
