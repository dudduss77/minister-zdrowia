import { TCryptoObject } from '../../types/TCryptoObject';
import { TExchangeRate } from '../../types/TExchangeRate';

const addFieldsToExchangeRate = (cryptoObject: TCryptoObject) => {
  const emptyField: TExchangeRate = {
    link: '',
    name: '',
    currency: 'PLN',
    value: 0,
  };

  let id = 0;
  cryptoObject.cryptos.forEach((crypto) => {
    const filteredArray = crypto.exchangeRate.filter(
      (el) => el.value === null && !el.id,
    );
    const newArray: TExchangeRate[] = [];
    filteredArray.forEach(() => {
      newArray.push({
        ...emptyField,
        id,
        label: `${crypto.name} (${crypto.shortName})`,
      });
      id++;
    });

    crypto.exchangeRate = [...crypto.exchangeRate, ...newArray];
  });
};

export default addFieldsToExchangeRate;
