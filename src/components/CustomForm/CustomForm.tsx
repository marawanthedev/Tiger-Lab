import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment";

import { InputField } from "constants/InputFields";
import { CustomButton } from "../../interface";

import "react-datepicker/dist/react-datepicker.css";
import "./CustomForm.scss";

interface FormProps {
  validationSchema: any;
  initialValues: any;
  inputFields: InputField[];
  onSubmit: any;
}

function subtract6Months(date: Date) {
  date.setMonth(date.getMonth() - 6);
  return date;
}

export default function CustomForm({
  initialValues,
  validationSchema,
  inputFields,
  onSubmit,
}: FormProps) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const minDate = subtract6Months(moment().toDate());

  const renderError = (message: any) => {
    return <p className="input-field_error">{message}</p>;
  };

  const handleInputTypeRendering = (input: InputField) => {
    if (input.type !== "Date")
      return (
        <>
          <label className="input-field_label" htmlFor={input.name}>
            {input.label}
          </label>
          <Field
            name={input.name}
            type={input.type || "text"}
            placeholder={input.placholder}
            className="input-field"
            {...input.rest}
          />
          <ErrorMessage name={input.name} render={renderError} />
        </>
      );
    if (input.type === "Date") {
      return (
        <DatePicker
          selected={selectedDate}
          minDate={minDate}
          maxDate={moment().toDate()}
          className="input-field"
          onChange={(date: any) => setSelectedDate(date)}
        />
      );
    }
  };

  const renderInputFields = () => {
    return inputFields.map((input: InputField) => {
      return (
        <div className="control flex flex-column" key={input.name}>
          {handleInputTypeRendering(input)}
        </div>
      );
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        onSubmit({ ...values, incidentDate: selectedDate });
      }}
    >
      <Form>
        <div className="form">
          {renderInputFields()}
          <CustomButton
            innerText="Submit"
            type="submit"
            width="100%"
            color="white"
            onClick={() => console.log("x")}
          />
        </div>
      </Form>
    </Formik>
  );
}
