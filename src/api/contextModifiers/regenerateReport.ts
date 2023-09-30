import { TCryptoObject } from '../../types/TCryptoObject';
import calculateFinalValue from './calculateFinalValue';
import convertUsdToPln from './convertUsdToPln';

const regenerateReport = async (cryptoObject: TCryptoObject) => {
  convertUsdToPln(cryptoObject);

  calculateFinalValue(cryptoObject);
};

export default regenerateReport;
