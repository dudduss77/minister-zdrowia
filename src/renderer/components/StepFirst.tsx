import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useRef } from 'react';
import { Button } from './Button';
import { StateContext } from '../contexts/StateContext';
import { cryptoDictionary } from '../../api/consts';
import RemoveButton from './RemoveButton';
import generateReport from '../../api/contextModifiers/generateReport';
import { createLog } from '../utils/createLog';

const TestSchema = Yup.object().shape({
  organizationName: Yup.string().required('Pole wymagane'),
  reasonNumber: Yup.string().required('Pole wymagane'),
  ownersData: Yup.string().required('Pole wymagane'),
  cryptos: Yup.array().of(
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

function StepFirst() {
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const { cryptoObject, setCryptoObject } = useContext(StateContext);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    console.log('cryptoObject', cryptoObject);
    if (!cryptoObject) return;
    (async () => {
      await generateReport(cryptoObject);
      navigate('/second-step');
    })();
  }, [cryptoObject, navigate]);

  useEffect(() => {
    createLog({
      type: 'START_PROCESS',
      data: {},
    });
  }, []);

  return (
    // <StateContext.Consumer>
    //   {({ cryptoObject, setCryptoObject }) => (
    <div className="p-5 max-w-screen-md mx-auto h-screen">
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
        validationSchema={TestSchema}
        onSubmit={(values) => {
          const valueToSet = {
            ...cryptoObject,
            ...values,
            cryptos: values.cryptos.map((el) => ({
              ...el,
              name: cryptoDictionary.find((i) => i.shortName === el.shortname)
                ?.name,
            })),
          };
          mapDataToContext(valueToSet, setCryptoObject);
          // TODO
          // navigate('/second-step');
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
                    <div key={`div-${crypto.name}`} className=" mb-3">
                      <div className="flex gap-3 mb-3">
                        <div className="grow">
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
                          <div className="text-sm text-red-700">
                            <ErrorMessage name={`cryptos.${index}.shortname`} />
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
              GENERUJ
            </Button>
          </Form>
        )}
      </Formik>
    </div>
    // )}
    // </StateContext.Consumer>
  );
}

export default StepFirst;
