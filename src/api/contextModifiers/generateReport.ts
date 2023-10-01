import ETickerSource from '../../types/ETickerSource';
import { TCryptoObject } from '../../types/TCryptoObject';
import getTicker from '../requests/getTicker';
import addFieldsToExchangeRate from './addFieldsToExchangeRate';
import calculateFinalValue from './calculateFinalValue';
import convertUsdToPln from './convertUsdToPln';

const generateReport = async (
  cryptoObject: TCryptoObject,
  callback: () => void,
) => {
  // const xd = {
  //   ID: 'dasdasdsa',
  //   raportName: 'Szacowanie wartości kryptoaktywów',
  //   dateOfGenerate: '12-01-2023',
  //   reasonNumber: '23123132321',
  //   ownersData: 'Andrzej Duad',
  //   averagePrice: null,
  //   averageNbpExchangeRate: 4.23,
  //   cryptos: [
  //     {
  //       name: 'Bitcoin', // Bitcoin
  //       shortName: 'BTC', // BTC
  //       quantity: 5000,
  //       exchangeRate: [],
  //     },
  //   ],
  // };

  const pobierz = cryptoObject.cryptos.map(async (crypto) => {
    const [binance, bittrex, zondacrypto] = await Promise.all([
      getTicker(ETickerSource.BINANCE, crypto.shortName),
      getTicker(ETickerSource.BITTREX, crypto.shortName),
      getTicker(ETickerSource.ZONDACRYPTO, crypto.shortName),
    ]);

    if (!crypto.exchangeRate) {
      crypto.exchangeRate = [];
    }

    if (binance) {
      crypto.exchangeRate.push(binance);
    }
    if (bittrex) {
      crypto.exchangeRate.push(bittrex);
    }
    if (zondacrypto) {
      crypto.exchangeRate.push(zondacrypto);
    }

    await convertUsdToPln(cryptoObject);

    calculateFinalValue(cryptoObject);
  });

  await Promise.allSettled(pobierz);
  addFieldsToExchangeRate(cryptoObject);
  console.log(cryptoObject);
  callback();
};

export default generateReport;
