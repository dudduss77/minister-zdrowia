type TCryptoObject = {
  ID: string;
  raportName: 'Szacowanie wartości kryptoaktywów';
  dateOfGenerate: string; //Date
  reasonNumber: string;
  ownersData: string;
  averagePrice: number | null;
  averageNbpExchangeRate: number;
  cryptos: {
    name: string; //Bitcoin
    shortName: string; //BTC
    quantity: number;
    exchangeRate: {
      link: string;
      name: string;
      value: number;
      currency: 'PLN' | 'USD';
    }[];
  }[];
};
