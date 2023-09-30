import { TExchangeRateResponse } from '../../types/TExchangeRateResponse';
import { getTodayExchangeRateUrl } from '../consts';

const getExchangeRate = async () => {
  const response = await fetch(getTodayExchangeRateUrl);
  if (response.status !== 200) {
    throw new Error('Server error');
  }
  const data = (await response.json()) as TExchangeRateResponse;
  console.log('exchange rate', data.rates[0]);
  return data.rates[0];
};

export default getExchangeRate;
