import { TCryptoObject } from '../../types/TCryptoObject';
import calculateFinalValue from './calculateFinalValue';
import convertUsdToPln from './convertUsdToPln';

const regenerateReport = async (
  cryptoObject: TCryptoObject,
  callback: () => void,
) => {
  convertUsdToPln(cryptoObject);

  calculateFinalValue(cryptoObject);
  callback();
};

export default regenerateReport;
