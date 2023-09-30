import { TCryptoObject } from '../../types/TCryptoObject';

const calculateFinalValue = (cryptoObject: TCryptoObject) => {
  let totalValue = 0;

  cryptoObject.cryptos.forEach((crypto) => {
    const marketValues: number[] = [];

    crypto.exchangeRate.forEach((exchangeRate) => {
      if (exchangeRate.value === null) {
        return;
      }

      if (exchangeRate.currency === 'PLN') {
        marketValues.push(exchangeRate.value * crypto.quantity);
      }
    });

    totalValue += marketValues.reduce((a, b) => a + b, 0) / marketValues.length;
  });

  cryptoObject.averagePrice = +totalValue.toFixed(2);
};

export default calculateFinalValue;
