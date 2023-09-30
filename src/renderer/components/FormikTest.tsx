import React from 'react';
import Input from './Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputSelect from './InputSelect';
import { StaticCryptoList } from '../static/StaticCryptoSelect';

const TestSchema = Yup.object().shape({
  testName: Yup.string().required('Pole wymagane'),
  currency: Yup.string().required('Pole wymagane'),
});

const FormikTest = () => {
  const formik = useFormik({
    initialValues: {
      testName: '',
      currency: '',
    },
    validationSchema: TestSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <Input
        inputPlaceholder="Test input"
        inputOnChange={formik.handleChange}
        inputName="testName"
        inputValue={formik.values.testName}
        inputErrorMessage={
          formik.errors.testName && formik.touched.testName
            ? formik.errors.testName
            : ''
        }
        inputLabel="TestName"
      />

      <InputSelect
        inputSelectPlaceholder="Wybierz kryptowalute"
        inputSelectOnChange={formik.handleChange}
        inputSelectValue={formik.values.currency}
        inputSelectName="currency"
        inputSelectErrorMessage={
          formik.errors.currency && formik.touched.currency
            ? formik.errors.currency
            : ''
        }
        CryptoList={StaticCryptoList}
      />
      <button onClick={() => formik.handleSubmit()}>Test</button>
    </div>
  );
};

export default FormikTest;
