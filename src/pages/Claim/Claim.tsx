import React from "react";
import * as Yup from "yup";
import { AxiosMethods } from "../../constants/AxiosMethods";
import { InputField } from "../../constants/InputFields";
import { request } from "../../lib/axios";

import { CustomForm } from "../../components";
import "./Claim.scss";

export interface ClaimFormFields {
  policyNumber: string;
  holder: string;
  insuredName: string;
  amount: string | number;
  description: string;
  incidentDate: Date;
  processingFee: string | number;
}
export type ClaimValidationSchema = typeof validationSchema;

const validationSchema = Yup.object({
  policyNumber: Yup.string().required(),
  holder: Yup.string().required(),
  insuredName: Yup.string().required(),
  amount: Yup.string().required(),
  description: Yup.string().required(),
  incidentDate: Yup.date().default(() => new Date()),
  processingFee: Yup.string().required(),
});
export default function Claim() {
  const inputFields: InputField[] = [
    {
      name: "policyNumber",
      label: "Policy Number",
      placholder: "Policy Number",
    },
    {
      name: "holder",
      label: "Holder Name",
      placholder: "Holder Name",
    },
    {
      name: "insuredName",
      label: "Insured Item",
      placholder: "Insured Item",
    },
    {
      name: "amount",
      label: "Claim amount",
      placholder: "Claim amount 2 decimal point. e.g: 15.50",
    },
    {
      name: "description",
      label: "Description",
      placholder: "Description",
    },
    {
      name: "incidentDate",
      label: "Incident Date",
      placholder: "Incident Date",
      type: "Date",
    },
    {
      name: "processingFee",
      label: "Processing Fee",
      placholder: "Processing Fee 2 decimal point. e.g: 15.50",
    },
  ];

  const initialValues: ClaimFormFields = {
    policyNumber: "",
    holder: "",
    insuredName: "",
    amount: "",
    description: "",
    incidentDate: new Date(),
    processingFee: "",
  };

  const roundToTwoDigitDecimal = (num: number) =>
    Math.round((num + Number.EPSILON) * 100) / 100;

  const handleFormSubmission = (values: ClaimFormFields) => {
    const processingFee = roundToTwoDigitDecimal(Number(values.processingFee));
    const amount = roundToTwoDigitDecimal(Number(values.amount));

    const valuesToPost: ClaimFormFields = { ...values, processingFee, amount };

    postNewClaim(valuesToPost);
  };

  const postNewClaim = async (claim: ClaimFormFields) => {
    try {
      request({
        endpoint: "/claims",
        method: AxiosMethods.POST,
        data: claim,
      });
    } catch (err) {
      console.error(err);
    }
  };
  // form handling logic
  // validate within form itself
  // get submit event to claim page
  // ensure that processing fee and claim amount have two decimals
  // post to backend

  return (
    <div className="claim flex flex-column justify-content-center align-items-center">
      <CustomForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        inputFields={inputFields}
        onSubmit={handleFormSubmission}
      />
    </div>
  );
}
