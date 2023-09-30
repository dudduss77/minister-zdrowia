import { TBinanceTickerReponse } from '../../types/TBinanceTickerResponse';
import { TBittrexTickerReponse } from '../../types/TBittrexTickerResponse';
import { TExchangeRate } from '../../types/TExchangeRate';
import { TZondaCryptoTickerReponse } from '../../types/TZondaCryptoTickerReponse';

enum ETickerSource {
  ZONDACRYPTO,
  BINANCE,
  BITTREX,
}

const buildTickerUrl = (source: ETickerSource, marketCode: string) => {
  switch (source) {
    case ETickerSource.ZONDACRYPTO:
      return `https://api.zondacrypto.exchange/rest/trading/ticker/${marketCode}-USD`;
    case ETickerSource.BINANCE:
      return `https://api.binance.com/api/v3/ticker/price?symbol=${marketCode}USDC`;
    case ETickerSource.BITTREX:
      return `https://api.bittrex.com/v3/markets/${marketCode}-USD/ticker`;
    default:
      throw new Error('Unknown ticker source');
  }
};

const processZondaCryptoTicker = (ticker: TZondaCryptoTickerReponse) => {
  if (ticker.status === 'Fail') {
    throw new Error(ticker.errors.join(', '));
  }

  const exchangeRate: TExchangeRate = {
    currency: 'USD',
    link: 'https://zondacrypto.com/',
    name: 'ZondaCrypto',
    value: +ticker.ticker.rate,
  };
  return exchangeRate;
};

const processBinanceTicker = (ticker: TBinanceTickerReponse) => {
  const exchangeRate: TExchangeRate = {
    currency: 'USD',
    link: 'https://www.binance.com/',
    name: 'Binance',
    value: +ticker.price,
  };
  return exchangeRate;
};

const processBittrexTicker = (ticker: TBittrexTickerReponse) => {
  const exchangeRate: TExchangeRate = {
    currency: 'USD',
    link: 'https://bittrexglobal.com/',
    name: 'Bittrex',
    value: +ticker.lastTradeRate,
  };
  return exchangeRate;
};

const getTicker = async (source: ETickerSource, marketCode: string) => {
  const response = await fetch(buildTickerUrl(source, marketCode));
  if (response.status !== 200) {
    throw new Error('Server error');
  }
  const data = await response.json();
  switch (source) {
    case ETickerSource.ZONDACRYPTO:
      return processZondaCryptoTicker(data);
    case ETickerSource.BINANCE:
      return processBinanceTicker(data);
    case ETickerSource.BITTREX:
      return processBittrexTicker(data);
    default:
      throw new Error('Unknown ticker source');
  }
};

export default getTicker;
