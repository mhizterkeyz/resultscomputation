import React from "react";

const SelectFormGroup = ({
  cols = "",
  feedback,
  value,
  onChange,
  placeholder,
  name,
  type = "text",
  valid,
  options = [],
  required = false,
}) => (
  <div className={cols + " form-group"}>
    <label htmlFor={placeholder}>{placeholder} :</label>
    <select
      className={
        valid
          ? "form-control is-valid"
          : valid === null
          ? "form-control"
          : "form-control is-invalid"
      }
      onChange={onChange}
      value={value}
      name={name}
      id={placeholder}
      required={required}
    >
      {options.map((opt) => {
        return (
          <option key={`${placeholder}_${opt}`} value={opt}>
            {opt}
          </option>
        );
      })}
    </select>
    <div
      className={
        valid ? "valid-feedback" : valid == null ? "d-none" : "invalid-feedback"
      }
    >
      {feedback}
    </div>
  </div>
);

export default SelectFormGroup;
