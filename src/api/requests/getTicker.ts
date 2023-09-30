import ETickerSource from '../../types/ETickerSource';
import { TBinanceTickerReponse } from '../../types/TBinanceTickerResponse';
import { TBittrexTickerReponse } from '../../types/TBittrexTickerResponse';
import { TExchangeRate } from '../../types/TExchangeRate';
import { TZondaCryptoTickerReponse } from '../../types/TZondaCryptoTickerReponse';

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

const links: Record<ETickerSource, string> = {
  [ETickerSource.ZONDACRYPTO]: 'https://zondacrypto.com/',
  [ETickerSource.BINANCE]: 'https://www.binance.com/',
  [ETickerSource.BITTREX]: 'https://bittrexglobal.com/',
};

const names: Record<ETickerSource, string> = {
  [ETickerSource.ZONDACRYPTO]: 'ZondaCrypto',
  [ETickerSource.BINANCE]: 'Binance',
  [ETickerSource.BITTREX]: 'Bittrex',
};

const processZondaCryptoTicker = (ticker: TZondaCryptoTickerReponse) => {
  if (ticker.status === 'Fail') {
    throw new Error(ticker.errors.join(', '));
  }

  const exchangeRate: TExchangeRate = {
    currency: 'USD',
    link: links[ETickerSource.ZONDACRYPTO],
    name: names[ETickerSource.ZONDACRYPTO],
    value: +ticker.ticker.rate,
  };
  return exchangeRate;
};

const processBinanceTicker = (ticker: TBinanceTickerReponse) => {
  const exchangeRate: TExchangeRate = {
    currency: 'USD',
    link: links[ETickerSource.BINANCE],
    name: names[ETickerSource.BINANCE],
    value: +ticker.price,
  };
  return exchangeRate;
};

const processBittrexTicker = (ticker: TBittrexTickerReponse) => {
  const exchangeRate: TExchangeRate = {
    currency: 'USD',
    link: links[ETickerSource.BITTREX],
    name: names[ETickerSource.BITTREX],
    value: +ticker.lastTradeRate,
  };
  return exchangeRate;
};

const getTicker = async (source: ETickerSource, marketCode: string) => {
  try {
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
        return {
          link: '',
          name: '',
          currency: null,
          value: null,
        } as TExchangeRate;
    }
  } catch {
    const emptyExchangeRate: TExchangeRate = {
      link: links[source],
      name: names[source],
      currency: null,
      value: null,
    };
    return emptyExchangeRate;
  }
};

export default getTicker;
