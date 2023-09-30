import ETickerSource from '../../types/ETickerSource';
import { TCryptoObject } from '../../types/TCryptoObject';
import getTicker from '../requests/getTicker';
import calculateFinalValue from './calculateFinalValue';
import convertUsdToPln from './convertUsdToPln';

const generateReport = async (cryptoObject: TCryptoObject) => {
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

  cryptoObject.cryptos.forEach(async (crypto) => {
    const [binance, bittrex, zondacrypto] = await Promise.all([
      getTicker(ETickerSource.BINANCE, crypto.shortname),
      getTicker(ETickerSource.BITTREX, crypto.shortname),
      getTicker(ETickerSource.ZONDACRYPTO, crypto.shortname),
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

    console.log(cryptoObject);
  });
};

export default generateReport;