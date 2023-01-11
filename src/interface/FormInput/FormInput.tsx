import React from "react";

import "./FormInput.scss";

interface FormInputProps {
  placeholder?: string;
  onChangeCallBack: any;
  label?: string;
}
export default function FormInput({
  placeholder,
  onChangeCallBack,
  label,
}: FormInputProps) {
  const mimicId = new Date();
  return (
    <div className="input-group flex flex-column justify-content-center ">
      <label htmlFor={String(mimicId)}>{label && label}</label>
      <input
        id={String(mimicId)}
        type="text"
        className="form-input"
        placeholder={placeholder}
        onChange={(e) => onChangeCallBack(e.target.value)}
      />
    </div>
  );
}
