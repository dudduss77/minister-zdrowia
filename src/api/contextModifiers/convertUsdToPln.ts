import { TCryptoObject } from '../../types/TCryptoObject';
import getExchangeRate from '../requests/getExchangeRate';

const convertUsdToPln = async (cryptoObject: TCryptoObject) => {
  if (!cryptoObject.averageNbpExchangeRate) {
    const plnExchangeRate = await getExchangeRate();
    cryptoObject.averageNbpExchangeRate = plnExchangeRate.mid;
  }

  cryptoObject.cryptos.forEach((crypto) => {
    crypto.exchangeRate.forEach((exchangeRate) => {
      if (exchangeRate.value === null) {
        return;
      }

      if (exchangeRate.currency === 'USD') {
        exchangeRate.value *= cryptoObject.averageNbpExchangeRate!;
        exchangeRate.value = +exchangeRate.value.toFixed(2);
        exchangeRate.currency = 'PLN';
      }
    });
  });
};

export default convertUsdToPln;
