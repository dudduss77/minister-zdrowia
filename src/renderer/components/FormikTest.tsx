import React from 'react';
import Input from './Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputSelect from './InputSelect';
import { StaticCryptoList } from '../static/StaticCryptoSelect';
import InputCryptoWrapper from './InputCryptoWrapper';

const TestSchema = Yup.object().shape({
  testName: Yup.string().required('Pole wymagane'),
  test: Yup.array().of(
    Yup.object().shape({
      shortname: Yup.string().required('Pole wymagane'),
    }),
  ),
});

const FormikTest = () => {
  const formik = useFormik({
    initialValues: {
      testName: '',
      test: [
        {
          shortname: '',
        },
        {
          shortname: '',
        },
      ],
    },
    validationSchema: TestSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(formik.errors.test);
  console.log(formik.values);
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
        inputSelectOnChange={(value: any) =>
          (formik.values.test[0].shortname = value)
        }
        inputSelectValue={formik.values.test[0].shortname}
        inputSelectName={`test.0`}
        inputSelectErrorMessage={
          ''
          // formik.errors.test && formik.touched.test
          //   ? formik.errors.test
          //   : ''
        }
        OptionsList={StaticCryptoList}
      />

      <InputSelect
        inputSelectPlaceholder="Wybierz kryptowalute"
        inputSelectOnChange={(value: any) =>
          (formik.values.test[1].shortname = value)
        }
        inputSelectValue={formik.values.test[1].shortname}
        inputSelectName={`test.1`}
        inputSelectErrorMessage={
          
          (formik.errors.test?.[1] as any)?.shortname && (formik.touched.test?.[1] as any).shortname
            ? (formik.errors.test?.[1] as any).shortname
            : ''
        }
        OptionsList={StaticCryptoList}
      />

      {/* <InputCryptoWrapper/> */}

      <button onClick={() => formik.handleSubmit()}>Test</button>
    </div>
  );
};

export default FormikTest;
