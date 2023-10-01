import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useRef } from 'react';
import { Button } from './Button';
import { StateContext } from '../contexts/StateContext';
import { cryptoDictionary } from '../../api/consts';
import RemoveButton from './RemoveButton';
import generateReport from '../../api/contextModifiers/generateReport';

const TestSchema = Yup.object().shape({
  organizationName: Yup.string().required('Pole wymagane'),
  reasonNumber: Yup.string().required('Pole wymagane'),
  ownersData: Yup.string().required('Pole wymagane'),
  cryptos: Yup.array().of(
    Yup.object().shape({
      shortName: Yup.string().required('Pole wymagane'),
      quantity: Yup.number().required('Pole wymagane'),
    }),
  ),
});

const emptyCrypto = {
  name: '',
  shortName: '',
  quantity: '',
};

const mapDataToContext = (valueToSet: any, setCryptoObject: any) => {
  setCryptoObject({ ...valueToSet });
};

export function StepFirst() {
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const { cryptoObject, setCryptoObject } = useContext(StateContext);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    (async () => {
      if (cryptoObject) {
        await generateReport(cryptoObject, () => navigate('/second-step'));
      }
    })();
  }, [cryptoObject]);

  return (
    <div className="p-5 max-w-screen-md mx-auto h-screen">
      <Formik
        initialValues={{
          organizationName: '',
          reasonNumber: '',
          ownersData: '',
          cryptos: [
            {
              name: '',
              shortName: '',
              quantity: '',
            },
          ],
        }}
        validationSchema={TestSchema}
        onSubmit={(values) => {
          const valueToSet = {
            ...cryptoObject,
            ...values,
            cryptos: values.cryptos.map((el) => ({
              ...el,
              name: cryptoDictionary.find((i) => i.shortName === el.shortName)
                ?.name,
            })),
          };
          mapDataToContext(valueToSet, setCryptoObject);
        }}
      >
        {({ values }) => (
          <Form className="h-full relative flex flex-col">
            <h1 className="text-xl mb-3 text-center">
              Uzupełnij dane do raportu
            </h1>
            <div className="content-max-height overflow-y-auto">
              <Field
                name="organizationName"
                placeholder="Nazwa organu egzekucyjnego"
              />
              <div className="text-sm text-red-700 mb-3">
                <ErrorMessage name="organizationName" />
              </div>
              <Field name="reasonNumber" placeholder="Numer sprawy" />
              <div className="text-sm text-red-700 mb-3">
                <ErrorMessage name="reasonNumber" />
              </div>
              <Field
                name="ownersData"
                placeholder="Dane identyfikujące właściciela kryptoaktywa"
              />
              <div className="text-sm text-red-700 mb-3">
                <ErrorMessage name="ownersData" />
              </div>

              <FieldArray
                name="cryptos"
                render={(arrayHelpers) =>
                  values.cryptos.map((crypto, index) => (
                    <div key={index} className=" mb-3">
                      <div className="flex gap-3 mb-3">
                        <div className="grow">
                          <Field
                            component="select"
                            name={`cryptos.${index}.shortName`}
                          >
                            <option value="">Wybierz kryptowalute</option>
                            {cryptoDictionary.map((val) => (
                              <option key={val.shortName} value={val.shortName}>
                                {`${val.name} (${val.shortName})`}
                              </option>
                            ))}
                          </Field>
                          <div className="text-sm text-red-700">
                            <ErrorMessage name={`cryptos.${index}.shortName`} />
                          </div>
                        </div>
                        <div className="grow">
                          <Field
                            type="number"
                            name={`cryptos.${index}.quantity`}
                            placeholder="Wartość"
                          />
                          <div className="text-sm text-red-700">
                            <ErrorMessage name={`cryptos.${index}.quantity`} />
                          </div>
                        </div>
                        {values.cryptos.length > 1 && (
                          <RemoveButton
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        )}
                      </div>
                      {index === values.cryptos.length - 1 && (
                        <Button
                          color="bg-green-500 mx-auto"
                          onClick={() => arrayHelpers.push(emptyCrypto)}
                        >
                          Dodaj kolejną pozycję
                        </Button>
                      )}
                    </div>
                  ))
                }
              />
            </div>
            <Button type="submit" color="bg-blue-500 w-full self-end mt-auto">
              SPRAWDŹ DANE
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
