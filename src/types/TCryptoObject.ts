import { TExchangeRate } from './TExchangeRate';

export type TCrypto = {
  name: string; // Bitcoin
  shortName: string; // BTC
  quantity: number;
  exchangeRate: TExchangeRate[];
};

export type TCryptoObject = {
  ID: string | null;
  raportName: 'Szacowanie wartości kryptoaktywów';
  dateOfGenerate: string | null; // Date
  reasonNumber: string | null;
  ownersData: string | null;
  averagePrice: number | null;
  averageNbpExchangeRate: number | null;
  cryptos: TCrypto[];
};

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
//       exchangeRate: [
//         {
//           link: 'dasdsa',
//           name: 'dasdasdsa',
//           value: 25000,
//           currency: 'USD',
//         },
//         {
//           link: '',
//           name: '',
//           value: null,
//           currency: 'USD',
//         },
//       ],
//     },
//   ],
// };

// const xd = {
//   ID: 'dasdasdsa',
//   raportName: 'Szacowanie wartości kryptoaktywów',
//   dateOfGenerate: '12-01-2023',
//   reasonNumber: '23123132321',
//   ownersData: 'Andrzej Duad',
//   averagePrice: 568932,
//   averageNbpExchangeRate: 4.23,
//   cryptos: [
//     {
//       name: 'Bitcoin', // Bitcoin
//       shortName: 'BTC', // BTC
//       quantity: 5000,
//       exchangeRate: [
//         {
//           link: 'dasdsa',
//           name: 'dasdasdsa',
//           value: 105750,
//           currency: 'PLN',
//         },
//       ],
//     },
//   ],
// };
