import { TTickerReponse } from '../../types/TTickerResponse';
import { getTickerUrl } from '../consts';

const getTicker = async (marketCode: string) => {
  const response = await fetch(getTickerUrl + marketCode);
  if (response.status !== 200) {
    throw new Error('Server error');
  }
  const data = (await response.json()) as TTickerReponse;
  if (data.status === 'Fail') {
    throw new Error(data.errors.join(', '));
  }
  return data.ticker;
};

export default getTicker;
