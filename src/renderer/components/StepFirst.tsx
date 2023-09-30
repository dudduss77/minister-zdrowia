import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { StateContext } from '../contexts/StateContext';
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { cryptoDictionary } from '../../api/consts';
import RemoveButton from './RemoveButton';
import { useContext } from 'react';

const TestSchema = Yup.object().shape({
  test: Yup.array().of(
    Yup.object().shape({
      shortname: Yup.string().required('Pole wymagane'),
      quantity: Yup.number().required('Pole wymagane'),
    }),
  ),
});

const emptyCrypto = {
  name: '',
  shortname: '',
  quantity: '',
};

const mapDataToContext = (valueToSet: any, setCryptoObject: any) => {
  setCryptoObject({ ...valueToSet });
};

export const StepFirst = () => {
  const navigate = useNavigate();
  const { cryptoObject, setCryptoObject } = useContext(StateContext);

  return (
    // <StateContext.Consumer>
    //   {({ cryptoObject, setCryptoObject }) => (
    <div className="p-5">
      <Formik
        initialValues={{
          organizationName: '',
          reasonNumber: '',
          ownersData: '',
          cryptos: [
            {
              name: '',
              shortname: '',
              quantity: '',
            },
          ],
        }}
        // validationSchema={TestSchema}
        onSubmit={(values) => {
          const valueToSet = { ...cryptoObject, ...values, cryptos: values.cryptos.map(el => ({
            ...el, name: cryptoDictionary.find(i => i.shortName === el.shortname)?.name
          })) };
          mapDataToContext(valueToSet, setCryptoObject); 
          //TODO 
          navigate('/second-step');
        }}
      >
        {({ values }) => (
          <Form>
            <Field
              name="organizationName"
              placeholder="Nazwa organu egzekucyjnego"
            />
            <Field name="reasonNumber" placeholder="Numer sprawy" />
            <Field
              name="ownersData"
              placeholder="Dane identyfikujące właściciela kryptoaktywa"
            />

            <FieldArray
              name="cryptos"
              render={(arrayHelpers) =>
                values.cryptos.map((crypto, index) => (
                  <div key={index}>
                    <div>
                      <Field
                        component="select"
                        name={`cryptos.${index}.shortname`}
                      >
                        <option value="">Wybierz kryptowalute</option>
                        {cryptoDictionary.map((val) => (
                          <option key={val.shortName} value={val.shortName}>
                            {`${val.name} (${val.shortName})`}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name={`cryptos.${index}.shortname`} />
                    </div>
                    <div>
                      <Field
                        type="number"
                        name={`cryptos.${index}.quantity`}
                        placeholder="Wartość"
                      />
                      <ErrorMessage name={`cryptos.${index}.quantity`} />
                    </div>
                    {index > 0 && (
                      <RemoveButton
                        onClick={() => arrayHelpers.remove(index)}
                      />
                    )}

                    {index === values.cryptos.length - 1 && (
                      <Button
                        color="bg-red-500"
                        onClick={() => arrayHelpers.push(emptyCrypto)}
                      >
                        Dodaj kolejną pozycję
                      </Button>
                    )}
                  </div>
                ))
              }
            />

            <Button type="submit" color="bg-red-500">
              GENERUJ
            </Button>
          </Form>
        )}
      </Formik>
    </div>
    // )}
    // </StateContext.Consumer>
  );
};
