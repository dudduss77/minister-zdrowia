import React from 'react';
import Input from './Input';
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import InputSelect from './InputSelect';
import { StaticCryptoList } from '../static/StaticCryptoSelect';
import InputCryptoWrapper from './InputCryptoWrapper';

const TestSchema = Yup.object().shape({
  test: Yup.array().of(
    Yup.object().shape({
      shortname: Yup.string().required('Pole wymagane'),
      quantity: Yup.number().required('Pole wymagane'),
    }),
  ),
});

const FormikTest = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     testName: '',
  //     test: [
  //       {
  //         shortname: '',
  //         quantity: '',
  //       },
  //       {
  //         shortname: '',
  //         quantity: '',
  //       },
  //     ],
  //   },
  //   validationSchema: TestSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

  // console.log(formik.errors.test);
  // console.log(formik.values);
  return (
    <div>
      <Formik
        initialValues={{
          testName: '',
          test: [
            {
              shortname: '',
              quantity: '',
            },
          ],
        }}
        validationSchema={TestSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="test">
              {({ arrayHelpers }) =>
                values.test.map((test, index) => (
                  <div key={index}>
                    <div>
                      <Field
                        component="select"
                        name={`test.${index}.shortname`}
                      >
                        <option value="">Wybierz kryptowalute</option>
                        <option value="BTC">Bitcoin</option>
                        <option value="ETH">Etherum</option>
                        <option value="CITY">Manchester City Fan Token</option>
                      </Field>
                      <ErrorMessage name={`test.${index}.shortname`} />
                    </div>
                    <div>
                      <Field
                        type="number"
                        name={`test.${index}.quantity`}
                        placeholder="Wartość"
                      />
                      <ErrorMessage name={`test.${index}.quantity`} />
                    </div>
                  </div>
                ))
              }
            </FieldArray>
            <button type="submit">Dodaj</button>
          </Form>
          // <Form>
          //   {/* <Field name="testName" placeholder="Field" />
          // <ErrorMessage name='testName' /> */}

          //   <FieldArray
          //     name="test"
          //     render={(arrayHelpers) =>
          //       values.test.map((test, index) => {
          //         <Form name={`test.${index}`} />;
          //       })
          //     }
          //   />

          //   <button type="submit">Dodaj</button>
          // </Form>;
        )}
      </Formik>
    </div>
  );
};

export default FormikTest;
