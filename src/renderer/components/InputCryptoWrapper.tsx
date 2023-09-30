import React from 'react';
import InputSelect from './InputSelect';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StaticCryptoList } from '../static/StaticCryptoSelect';
import Input from './Input';

interface IInputCryptoWrapper {
  onSubmit: any;
}

const TestSchema = Yup.object().shape({
  cryptoShortname: Yup.string().required('Pole wymagane'),
  cryptoValue: Yup.number().required('Pole wymagane'),
});

const InputCryptoWrapper = () => {
  const formik = useFormik({
    initialValues: {
      cryptoShortname: '',
      cryptoValue: '',
    },
    validationSchema: TestSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="flex">
      <InputSelect
        inputSelectPlaceholder="Wybierz kryptowalute"
        inputSelectOnChange={formik.handleChange}
        inputSelectValue={formik.values.cryptoShortname}
        inputSelectName="cryptoShortname"
        inputSelectErrorMessage={
          formik.errors.cryptoShortname && formik.touched.cryptoShortname
            ? formik.errors.cryptoShortname
            : ''
        }
        OptionsList={StaticCryptoList}
      />
      <Input
        inputPlaceholder="Wartość"
        inputOnChange={formik.handleChange}
        inputName="testName"
        inputValue={formik.values.cryptoValue}
        inputErrorMessage={
          formik.errors.cryptoValue && formik.touched.cryptoValue
            ? formik.errors.cryptoValue
            : ''
        }
        inputLabel="Wartość"
      />
    </div>
  );
};

export default InputCryptoWrapper;
