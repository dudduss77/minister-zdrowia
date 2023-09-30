import { TCryptoObject } from '../../types/TCryptoObject';
import getExchangeRate from '../requests/getExchangeRate';

const convertUsdToPln = async (cryptoObject: TCryptoObject) => {
  const plnExchangeRate = await getExchangeRate();

  cryptoObject.cryptos.forEach((crypto) => {
    crypto.exchangeRate.forEach((exchangeRate) => {
      if (exchangeRate.value === null) {
        return;
      }

      if (exchangeRate.currency === 'USD') {
        exchangeRate.value *= plnExchangeRate.mid;
        exchangeRate.currency = 'PLN';
      }
    });
  });
};

export default convertUsdToPln;
