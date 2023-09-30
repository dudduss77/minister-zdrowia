import React from 'react'
import Input from './Input'
import { useFormik } from 'formik'
import * as Yup from 'yup';

const TestSchema = Yup.object().shape({
    testName: Yup.string().required("Pole wymagane")
})

const FormikTest = () => {
    const formik = useFormik({
        initialValues: {
          testName: ''
        },
        validationSchema: TestSchema,
        onSubmit: values => {
          console.log(values)
        },
      })
  return (
    <div>
        <Input
        inputPlaceholder="Test input"
        inputOnChange={formik.handleChange}
        inputName='testName'
        inputValue={formik.values.testName}
        inputErrorMessage={formik.errors.testName && formik.touched.testName ? formik.errors.testName : ""}
        inputLabel='TestName'
      />
      <button onClick={() => formik.handleSubmit()}>Test</button>
    </div>
  )
}

export default FormikTest