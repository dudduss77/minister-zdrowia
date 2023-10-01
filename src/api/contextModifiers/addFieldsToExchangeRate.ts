import { TCryptoObject } from '../../types/TCryptoObject';
import { TExchangeRate } from '../../types/TExchangeRate';

const addFieldsToExchangeRate = (cryptoObject: TCryptoObject) => {
  const emptyField: TExchangeRate = {
    link: '',
    name: '',
    currency: 'PLN',
    value: null,
  };

  cryptoObject.cryptos.forEach((crypto) => {
    const filteredArray = crypto.exchangeRate.filter(
      (el) => el.value === null && !el.name && !el.link,
    );
    const newArray = filteredArray.map(() => emptyField);

    crypto.exchangeRate = [...crypto.exchangeRate, ...newArray];
  });
};

export default addFieldsToExchangeRate;
