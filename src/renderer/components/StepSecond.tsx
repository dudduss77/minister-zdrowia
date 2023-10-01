import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { StateContext } from '../contexts/StateContext';
import * as Yup from 'yup';
import { useContext } from 'react';
import { TExchangeRate } from '../../types/TExchangeRate';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import regenerateReport from '../../api/contextModifiers/regenerateReport';
import { useEffect } from 'react';
import { createLog } from '../utils/createLog';

export const StepSecond = () => {
  const navigate = useNavigate();
  const { cryptoObject, setCryptoObject } = useContext(StateContext);

  const TestSchema = Yup.object().shape({
    exchangeRateTemp: Yup.array().of(
      Yup.object().shape({
        link: Yup.string().required('Pole wymagane'),
        name: Yup.string().required('Pole wymagane'),
        value: Yup.number().required('Pole wymagane'),
      }),
    ),
  });

  const temp: TExchangeRate[] = [];
  cryptoObject?.cryptos.forEach((el) => {
    el.exchangeRate.forEach((item) => {
      if (item.id !== undefined) {
        temp.push(item);
      }
    });
  });

  const initialValue = {
    exchangeRateTemp: temp,
  };

  const submitForm = (values: any) => {
    if (!cryptoObject) return;

    const copy = JSON.parse(JSON.stringify(cryptoObject));

    copy?.cryptos.forEach((crypto: any) => {
      const newExchangeRate = crypto.exchangeRate.map((item: any) => {
        if (item.id !== undefined) {
          const newContent = values.exchangeRateTemp.find(
            (x: TExchangeRate) => x.id === item.id,
          );
          if (newContent) {
            return newContent;
          }
        }
        return item;
      });
      crypto.exchangeRate = newExchangeRate;
    });

    if (setCryptoObject) setCryptoObject(copy);
    regenerateReport(cryptoObject, () => navigate('/raport'));
  };

  useEffect(() => {
    createLog({
      type: 'SET_DATA',
      data: {},
    });
  }, []);

  return (
    <div className="p-5 max-w-screen-md mx-auto h-screen">
      <Formik
        initialValues={initialValue}
        validationSchema={TestSchema}
        onSubmit={(values) => {
          submitForm(values);
        }}
      >
        {({ values }) => (
          <Form className="h-full relative flex flex-col">
            <FieldArray
              name="exchangeRateTemp"
              render={() =>
                values.exchangeRateTemp.map((exchangeRateItem, index) => (
                  <div key={index} className=" mb-3">
                    <h2>{exchangeRateItem.label}</h2>
                    <div className="flex gap-3 mb-3">
                      <div className="grow">
                        <Field
                          name={`exchangeRateTemp.${index}.link`}
                          placeholder="Link"
                        />
                        <div className="text-sm text-red-700">
                          <ErrorMessage
                            name={`exchangeRateTemp.${index}.link`}
                          />
                        </div>
                      </div>
                      <div className="grow">
                        <Field
                          name={`exchangeRateTemp.${index}.name`}
                          placeholder="Nazwa"
                        />
                        <div className="text-sm text-red-700">
                          <ErrorMessage
                            name={`exchangeRateTemp.${index}.name`}
                          />
                        </div>
                      </div>
                      <div className="grow">
                        <Field
                          type="number"
                          name={`exchangeRateTemp.${index}.value`}
                          placeholder="Wartość"
                        />
                        <div className="text-sm text-red-700">
                          <ErrorMessage
                            name={`exchangeRateTemp.${index}.name`}
                          />
                        </div>
                      </div>
                      <div className="grow">
                        <Field
                          component="select"
                          name={`exchangeRateTemp.${index}.currency`}
                        >
                          <option value="USD">USD</option>
                          <option value="PLN">PLN</option>
                        </Field>
                      </div>
                    </div>
                  </div>
                ))
              }
            />
            <Button color="bg-red-500" type="submit">
              GENERUJ RAPORT
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
