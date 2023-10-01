import TCryproDictionaryItem from '../types/TCryptoDictionaryItem';

export const getTodayExchangeRateUrl =
  'http://api.nbp.pl/api/exchangerates/rates/a/usd?format=json';

export const cryptoDictionary: TCryproDictionaryItem[] = [
  {
    name: 'Bitcoin',
    shortName: 'BTC',
  },
  {
    name: 'Ethereum',
    shortName: 'ETH',
  },
  {
    name: 'Tether',
    shortName: 'USDT',
  },
  {
    name: 'Binance Coin',
    shortName: 'BNB',
  },
  {
    name: 'XRP',
    shortName: 'XRP',
  },
  {
    name: 'Cardano',
    shortName: 'ADA',
  },
  {
    name: 'Dogecoin',
    shortName: 'DOGE',
  },
  {
    name: 'Polkadot',
    shortName: 'DOT',
  },
  {
    name: 'Solana',
    shortName: 'SOL',
  },
  {
    name: 'Manchaster City Fan Token',
    shortName: 'CITY',
  },
];
